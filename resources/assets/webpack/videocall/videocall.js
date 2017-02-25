import {DB} from '../modules/indexedDB';
import {VideocallDOM} from './dom';
import {PeerConnection} from './peer_connection';

class Videocall {
    constructor()
    {
        this.DOM = new VideocallDOM();

        this.nav = navigator;

        this.nav.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

        window.onbeforeunload = function (e) {
            this.hangup();
        }.bind(this);

        this.sendChannel = null;
        this.receiveChannel = null;

        this.DOM.$sendButton.on('click', this.sendFileToPeer.bind(this));

        this.isChannelReady = false;
        this.isInitiator = false;
        this.isStarted = false;

        //WebRTC data structures
        //Streams
        this.localStream = null;
        this.remoteStream = null;

        this.room = getIDfromURL();

        this.socket = io.connect('http://localhost:8181/videocall');

        //////////////////////////////////////////
        this.db = new DB();

        this.arrayToStoreChunks = [];
        this.receivedDataSize = 0;
        this.temporaryDataSize = 0;
        this.lastPositionSavedInArray = 0;
        this.chunkSizeLimit = 992000; // save chunks of ~ 1 MB to DB (62 slices of 16KB received)
        this.uuid = this.guid();
    }

    build()
    {
        if (this.room !== '')
        {
            this.socket.emit('create or join', this.room);
        }

        var constraints = {
            video: true,
            audio: true
        };

        this.nav.getUserMedia(constraints, this.handleUserMedia.bind(this), this.handleUserMediaError);
    }

    bindEvents()
    {
        let self = this;

        this.socket.on('created', function (room)
        {
            self.isInitiator = true;
        });

        this.socket.on('full', function (room) {
            console.log('Room ' + room + ' is full');
        });

        this.socket.on('join', function (room) {
            self.isChannelReady = true;
        });

        this.socket.on('joined', function (room) {
            self.isChannelReady = true;
        });

        this.socket.on('message', function (message) {

            if (message.message == 'got user media')
            {
                self.checkAndStart();
            }
            else if (message.message === 'bye' && self.isStarted)
            {
                self.handleRemoteHangup(message);
            }
            else if (message.sd && message.sd.type === 'offer')
            {
                if (!self.isInitiator && !self.isStarted)
                {
                    self.checkAndStart();
                }

                self.peerConnection.setRemoteDescription(message.sd);

                self.peerConnection.doAnswer();
            }
            else if (message.sd.type === 'answer' && self.isStarted)
            {
                self.peerConnection.setRemoteDescription(message.sd);
            }
            else if (message.type === 'candidate' && self.isStarted)
            {
                self.peerConnection.addIceCandidate(message.label, message.candidate);
            }
        });
    }

    bindListeners()
    {
        const REMOTE_STREAM_ADDED = 'remote stream added';

        const HANDLE_DATA_CHANNEL_MESSAGE = 'handle data channel message';
        const HANDLE_DATA_CHANNEL_OPEN = 'handle data channel open';
        const HANDLE_DATA_CHANNEL_CLOSE = 'handle data channel close';

        PubSub.subscribe(REMOTE_STREAM_ADDED, this.handleRemoteStreamAdded.bind(this));

        PubSub.subscribe(HANDLE_DATA_CHANNEL_MESSAGE, this.handleDataChannelMessage.bind(this));
        PubSub.subscribe(HANDLE_DATA_CHANNEL_OPEN, this.handleDataChannelOpen.bind(this));
        PubSub.subscribe(HANDLE_DATA_CHANNEL_CLOSE, this.handleDataChannelClose.bind(this));
    }

    handleRemoteStreamAdded(message, event) {
        attachMediaStream(this.DOM.remoteVideo, event.stream);

        this.remoteStream = event.stream;
    }

    handleDataChannelOpen(message, readyState)
    {
        if (readyState == 'open')
        {
            // enable DOM buttons
        }
        else
        {
            // disable DOM buttons
        }
    }

    handleDataChannelMessage(message, event)
    {
        let data = event.data;

        if (typeof data !== 'string')
        {
            this.arrayToStoreChunks.push(data);

            this.temporaryDataSize += data.byteLength;

            if(this.temporaryDataSize == this.chunkSizeLimit)
            {
                let temporaryDataArray = this.arrayToStoreChunks.slice(this.lastPositionSavedInArray);

                this.storeTemporaryData({data: temporaryDataArray, hash: this.uuid});

                this.receivedDataSize += this.temporaryDataSize;
                this.temporaryDataSize = 0;
                this.lastPositionSavedInArray = this.arrayToStoreChunks.length;
            }
        }
        else
        {
            data = JSON.parse(data);

            this.saveToDisk(this.arrayToStoreChunks, data.fileName);

            this.deleteTemporaryData(this.uuid);

            this.arrayToStoreChunks = [];
            this.receivedDataSize = 0;
        }
    }

    saveToDisk(array, fileName)
    {
        let received = new window.Blob(array);

        let $fileLink = $('<a/>', {
            text: fileName,
            href: URL.createObjectURL(received),
            target: '_blank',
            download: fileName
        });

        this.DOM.$filesContainer.append($fileLink);
    }

    handleDataChannelClose(message)
    {
        // disable buttons
    }

    handleUserMedia(stream)
    {
        this.localStream = stream;
        attachMediaStream(this.DOM.localVideo, stream);

        this.sendMessage({
            message: 'got user media',
            channel: this.room
        });

        if (this.isInitiator)
        {
            this.checkAndStart();
        }
    }

    handleUserMediaError(error)
    {
        console.log('navigator.getUserMedia error: ', error);
    }

    sendMessage(message)
    {
        this.socket.emit('message', message);
    }

    // Channel negotiation trigger function
    checkAndStart()
    {
        if (!this.isStarted && typeof this.localStream != 'undefined' && this.isChannelReady)
        {
            this.peerConnection = new PeerConnection(this.isInitiator, this.localStream, this.socket);

            this.isStarted = true;

            if (this.isInitiator)
            {
                this.peerConnection.doCall();
            }
        }
    }

    storeTemporaryData(data)
    {
        return this.db.insert(data);
    }

    deleteTemporaryData(hash)
    {
        this.db.deleteByHash(hash);
    }

    getChunksByHash(hash)
    {
        return this.db.getByHash(hash);
    }


    sendFileToPeer()
    {
        this.file = this.getFileFromInput();

        this.chunkSize = 16000;
        this.channelOpen = true;

        this.reader = new window.FileReader();
        this.reader.onload = this.onReadAsArrayBuffer.bind(this);

        this.sliceFile(0);
    }

    sliceFile(offset)
    {
        this.offset = offset;

        if (this.channelOpen)
        {
            let slice = this.file.slice(offset, offset + this.chunkSize);
            this.reader.readAsArrayBuffer(slice);
        }
        else
        {
            console.log("Exception.. channel closed..");
        }
    }

    onReadAsArrayBuffer(event)
    {
        let data = event.target.result;

        this.sendThroughDataChannel(data);

        if (this.file.size > this.offset + data.byteLength)
        {
            window.setTimeout(this.sliceFile.bind(this), 0, this.offset + this.chunkSize);
        }
        else
        {
            let data = { fileName: this.file.name };
            this.sendThroughDataChannel(JSON.stringify(data));

            delete this.reader;
        }
    }

    sendThroughDataChannel(data)
    {
        if(this.channelOpen)
        {
            try
            {
                if (this.isInitiator)
                {
                    this.peerConnection.sendChannel.send(data);
                }
                else
                {
                    this.peerConnection.receiveChannel.send(data);
                }
            }
            catch (exception)
            {
                this.channelOpen = false;
            }
        }
    }

    getFileFromInput()
    {
        return this.DOM.$dataChannelSend[0].files[0];
    }

    hangup()
    {
        let data = {};

        if (this.receivedDataSize != 0)
        {
            data.receivedDataSize = this.receivedDataSize;
            data.hash = this.uuid;
        }

        data.message = 'bye';
        data.channel = this.room;

        this.sendMessage(data);

        this.stop();
    }

    handleRemoteHangup(message)
    {
        if (message.receivedDataSize)
        {
            console.log("I have sent " + message.receivedDataSize + " to other peer");
            console.log("Also the saved chunks of files are saved with hash: " + message.hash);

            let remainingSlicesFromFile = this.file.slice(message.receivedDataSize);

            
        }

        this.stop();

        this.isInitiator = false;
    }

    stop()
    {
        this.isStarted = false;
        if (this.sendChannel)
        {
            this.sendChannel.close();
        }
        if (this.receiveChannel)
        {
            this.receiveChannel.close();
        }
        if (this.pc)
        {
            this.pc.close();
        }
        this.pc = null;
        // this.DOM.sendButton.disabled = true;
    }

    guid()
    {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

}

export {Videocall}