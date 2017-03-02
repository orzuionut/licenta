import {DB} from '../modules/indexedDB';
import {VideocallDOM} from './dom';
import {PeerConnection} from './peer_connection';

import {Helper} from '../helpers/helper';

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
        this.uuid = Helper.guid();

        /////////////////////////////////////////////////
        this.bindDOMListeners();
    }

    build()
    {
        if (this.room !== '')
        {
            let data = {
                room: this.room,
                user_id: user_id
            };
            this.socket.emit('create or join', data);
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

        this.socket.on('created', function (room) { self.isInitiator = true; });

        this.socket.on('full', function (room) { console.log('Room ' + room + ' is full'); });

        // Other peer joined
        this.socket.on('join', function (room) 
        {
            self.isChannelReady = true;
            
            self.DOM.updateVideoElementsCallRunning();
        });

        // This peer joined
        this.socket.on('joined', function (room) 
        {
            self.isChannelReady = true;

            self.DOM.updateVideoElementsCallRunning();
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

        this.socket.on('download file', this.handleFileDownload.bind(this));
        this.socket.on('download finished', this.handleFileDownloadFinished.bind(this));
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

    bindDOMListeners()
    {
        let self = this;
        this.DOM.$files.on('click', this.target, self.handleFileDownloadResume.bind(self));
        
        this.DOM.$showFilesButton.on('click', self.DOM.handleShowFilesButtonClicked.bind(self.DOM));
        this.DOM.$hideFilesButton.on('click', self.DOM.handleHideFilesButtonClicked.bind(self.DOM));

        this.DOM.$inputFile.on('change', this, self.DOM.handleFileInputChanged.bind(self.DOM));
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

            if (this.temporaryDataSize == this.chunkSizeLimit)
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
            download: fileName,
            class: 'single-file file-bubble file-bubble-download'
        });

        var $el = $('#files-container');

        $el.append($fileLink);
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

    // TODO: refactor
    sendMessageWithType(type, message)
    {
        this.socket.emit(type, message);
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
        Materialize.toast('Sending file to the other peer..', 4000);

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
            window.setTimeout(this.sliceFile.bind(this), 100, this.offset + this.chunkSize);
        }
        else
        {
            let data = {fileName: this.file.name};
            this.sendThroughDataChannel(JSON.stringify(data));

            delete this.reader;
        }
    }

    sendThroughDataChannel(data)
    {
        if (this.channelOpen)
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
            Materialize.toast("Please wait while the rest of the file is uploaded to the server..", 4000);
            
            console.log("I have sent " + message.receivedDataSize + " to other peer");
            console.log("Also the saved chunks of files are saved with hash: " + message.hash);

            let remainingSlicesFromFile = this.file.slice(message.receivedDataSize);

            let fileToStore = this.blobToFile(remainingSlicesFromFile, this.file.name);

            this.storeFile(fileToStore, message.hash);
        }

        this.stop();

        this.isInitiator = false;

        this.DOM.updateVideoElementsCallStopped();
        this.DOM.showFlashMessageCallStopped();
    }

    storeFile(file, hash)
    {
        let data = {
            user_id: user_id,
            file: file,
            fileName: this.file.name,
            hash: hash
        };

        this.sendMessageWithType('store file', data);
    }

    blobToFile(blob, fileName)
    {
        blob.lastModifiedDate = new Date();
        blob.name = fileName;
        return blob;
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

    handleFileDownloadResume(file)
    {
        // this is bind to DOM element
        this.file_id = $(file.target).attr('data-id');
        this.file_name = $(file.target).text();

        this.getChunksByHash(this.file_id)
            .then(this.handleChunksFetchSuccess.bind(this))
            .catch(this.handleChunksFetchError);
    }

    handleChunksFetchSuccess(chunksStored)
    {

        this.arrayChunks = this.getArrayChunksFromObject(chunksStored);

        /////////////////////////////////////////////////////////////////
        let data = {
            user_id: user_id,
            file_id: this.file_id
        };

        this.sendMessageWithType('download file', data);
    }

    handleFileDownload(data)
    {
        console.log("GOT DATA");
        this.arrayChunks.push(data.chunk);
    }

    handleFileDownloadFinished(data)
    {
        this.saveToDisk(this.arrayChunks, this.file_name);
    }

    // chunksObjects contains multiple objects that each contain data equal to an Array[62]
    getArrayChunksFromObject(chunksObjects)
    {
        var chunksArray = [];

        for (let i = 0; i < chunksObjects.length; i++)
        {
            chunksArray.push(...chunksObjects[i].data);
        }

        return chunksArray;
    }

}

export {Videocall}
