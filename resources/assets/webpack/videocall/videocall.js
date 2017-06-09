import {VideocallDOM} from './dom';
import {PeerConnection} from './peer_connection';
import {Helper} from "../helpers/helper";

class Videocall
{
    constructor(user_id)
    {
        this.user_id = user_id;
        
        this.REMOTE_STREAM_ADDED = 'remote stream added';

        this.HANDLE_DATA_CHANNEL_MESSAGE = 'handle data channel message';
        this.HANDLE_DATA_CHANNEL_OPEN = 'handle data channel open';
        this.HANDLE_DATA_CHANNEL_CLOSE = 'handle data channel close';

        this.constraints = {
            video: true,
            audio: true
        };

        this.DOM = new VideocallDOM();

        this.nav = navigator;

        this.nav.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

        this.sendChannel = null;
        this.receiveChannel = null;

        this.isChannelReady = false;
        this.isInitiator = false;
        this.isStarted = false;

        this.localStream = null;
        this.remoteStream = null;

        this.room = Helper.getIDfromURL();

        this.socket = io.connect('http://localhost:8181/videocall');
    }

    setConfig(constraints)
    {
        this.constraints = constraints;
    }

    build()
    {
        if (this.room !== '')
        {
            let data = {
                room: this.room,
                user_id: this.user_id
            };
            this.socket.emit('create or join', data);
        }

        this.nav.getUserMedia(this.constraints, this.handleUserMedia.bind(this), this.handleUserMediaError);
    }

    handleSocketMessages()
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

        window.onbeforeunload = function() { this.hangup(); }.bind(this);
    }

    handleRemoteStreamAdded(message, event)
    {
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
        this.stop();
    }

    handleRemoteHangup(message)
    {
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
