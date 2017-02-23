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

        this.DOM.$sendButton.on('click', this.sendData.bind(this));

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
        this.arrayToStoreChunks = [];
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

        this.socket.on('full', function (room)
        {
            console.log('Room ' + room + ' is full');
        });

        this.socket.on('join', function (room) {
            self.isChannelReady = true;
        });

        this.socket.on('joined', function (room)
        {
            self.isChannelReady = true;
        });

        this.socket.on('message', function (message)
        {
            if (message.message == 'got user media')
            {
                self.checkAndStart();
            }
            else if (message.message === 'bye' && self.isStarted)
            {
                self.handleRemoteHangup();
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
            this.DOM.$dataChannelSend.disabled = false;
            this.DOM.$dataChannelSend.focus();
            this.DOM.$dataChannelSend.placeholder = "";
            this.DOM.$sendButton.disabled = false;
        }
        else
        {
            this.DOM.$dataChannelSend.disabled = true;
            this.DOM.$sendButton.disabled = true;
        }
    }

    handleDataChannelMessage(message, event)
    {
        let data = event.data;

        if (typeof data !== 'string' )
        {
            this.arrayToStoreChunks.push(data);
        }
        else
        {
            data = JSON.parse(data);

            this.saveToDisk(this.arrayToStoreChunks, data.fileName);

            this.arrayToStoreChunks = [];
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
        this.DOM.$dataChannelSend.disabled = true;
        this.DOM.$sendButton.disabled = true;
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

    sendData()
    {
        this.file = this.getFileFromInput();

        this.chunkSize = 16384;
        this.sliceFile(0);


        // if(isInitiator){
        //     sendChannel.send(data);
        // } else {
        //     receiveChannel.send(data);
        // }
    }

    sliceFile(offset)
    {
        this.offset = offset;

        let reader = new window.FileReader();

        let slice = this.file.slice(offset, offset + this.chunkSize);
        reader.readAsArrayBuffer(slice);

        reader.onload = this.onReadAsArrayBuffer.bind(this);
    }

    onReadAsArrayBuffer(event)
    {
        let data = event.target.result;

        this.send(data);

        if (this.file.size > this.offset + data.byteLength)
        {
            window.setTimeout(this.sliceFile.bind(this), 0, this.offset + this.chunkSize);
        }
        else
        {
            let data = {};
            data.fileName = this.file.name;

            this.send(JSON.stringify(data));
        }
    }

    send(data)
    {
        this.peerConnection.sendChannel.send(data);
    }

    getFileFromInput()
    {
        return this.DOM.$dataChannelSend[0].files[0];
    }

    hangup()
    {
        this.stop();

        this.sendMessage({
            message: 'bye',
            channel: this.room
        });
    }

    handleRemoteHangup()
    {
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
        this.DOM.sendButton.disabled = true;
    }

}

export {Videocall}