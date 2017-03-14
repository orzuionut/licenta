import {VideocallDOM} from './dom';
import {PeerConnection} from './peer_connection';

import {FileTransfer} from "../file_transfer";

class Videocall
{
    constructor()
    {
        this.REMOTE_STREAM_ADDED = 'remote stream added';

        this.HANDLE_DATA_CHANNEL_MESSAGE = 'handle data channel message';
        this.HANDLE_DATA_CHANNEL_OPEN = 'handle data channel open';
        this.HANDLE_DATA_CHANNEL_CLOSE = 'handle data channel close';

        this.DOM = new VideocallDOM();

        this.nav = navigator;

        this.nav.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

        window.onbeforeunload = function(e){ this.hangup(); }.bind(this);

        this.sendChannel = null;
        this.receiveChannel = null;

        this.isChannelReady = false;
        this.isInitiator = false;
        this.isStarted = false;

        //WebRTC data structures
        //Streams
        this.localStream = null;
        this.remoteStream = null;

        this.room = getIDfromURL();

        this.socket = io.connect('http://localhost:8181/videocall');
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
    }

    bindListeners()
    {
        PubSub.subscribe(this.REMOTE_STREAM_ADDED, this.handleRemoteStreamAdded.bind(this));

        PubSub.subscribe(this.HANDLE_DATA_CHANNEL_OPEN, this.handleDataChannelOpen.bind(this));
        PubSub.subscribe(this.HANDLE_DATA_CHANNEL_CLOSE, this.handleDataChannelClose.bind(this));

    }

    bindDataChannelMessageListener()
    {
        PubSub.subscribe(this.HANDLE_DATA_CHANNEL_MESSAGE, this.conversation.handleDataChannelMessage.bind(this.conversation));
    }
    
    handleRemoteStreamAdded(message, event)
    {
        attachMediaStream(this.DOM.remoteVideo, event.stream);

        this.remoteStream = event.stream;
    }

    handleDataChannelOpen(message, readyState)
    {
        console.log(this.peerConnection);

        if (readyState == 'open')
        {
            // DataChannel is open, the file transfer may start
            this.conversation = new FileTransfer(this.socket, this.DOM, this.peerConnection);
            this.conversation.bindEvents();
            this.conversation.bindDOMListeners();

            this.bindDataChannelMessageListener();

            // enable DOM buttons
        }
        else
        {
            // disable DOM buttons
        }
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
    
}

export {Videocall}
