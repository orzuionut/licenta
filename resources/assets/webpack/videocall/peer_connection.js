import {Config} from './../_config';
import {Helper} from "../helpers/helper";

class PeerConnection 
{
    constructor(isInitiator, localStream, socket)
    {
        this.constraints = this.getConstraints();
        this.iceServers = this.getIceServers();
        this.sdpConstraints = webrtcDetectedBrowser === 'firefox' ?
        {'offerToReceiveAudio': true, 'offerToReceiveVideo': true} :
        {'mandatory': {'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true}};

        this.socket = socket;
        this.room = Helper.getIDfromURL();

        this.create(isInitiator, localStream);
    }

    getConstraints()
    {
        return Config.getPeerConnectionConstraints();
    }

    getIceServers()
    {
        return Config.getIceServers();
    }

    create(isInitiator, localStream)
    {
        try
        {
            this.rtcConnection = new RTCPeerConnection(this.iceServers, this.constraints);
            this.rtcConnection.addStream(localStream);
            this.rtcConnection.onicecandidate = this.handleIceCandidate.bind(this);
        }
        catch (e)
        {
            alert('Cannot create RTCPeerConnection object. ' + e.message);
            return;
        }

        this.rtcConnection.onaddstream = this.handleRemoteStreamAdded;
        this.rtcConnection.onremovestream = this.handleRemoteStreamRemoved;

        if (isInitiator)
        {
            this.createSendChannel();
        }
        else
        {
            this.rtcConnection.ondatachannel = this.gotReceiveChannel.bind(this);
        }
    }

    createSendChannel()
    {
        try
        {
            this.sendChannel = this.rtcConnection.createDataChannel("sendDataChannel", {reliable: false});
        }
        catch (e)
        {
            alert('Failed to create data channel. ');
        }

        this.sendChannel.binaryType = 'arraybuffer';
        
        this.setDataChannelHandlers(this.sendChannel);

        this.isInitiator = true;
    }

    gotReceiveChannel(event)
    {
        this.receiveChannel = event.channel;
        this.receiveChannel.binaryType = 'arraybuffer';

        this.setDataChannelHandlers(this.receiveChannel);

        this.isInitiator = false;
    }

    setDataChannelHandlers(dataChannel)
    {
        dataChannel.onopen = this.handleSendChannelOpen.bind(this, dataChannel);
        dataChannel.onmessage = this.handleMessage.bind(this);
        dataChannel.onclose = this.handleSendChannelClose;
    }

    handleSendChannelOpen(dataChannel)
    {
        const HANDLE_DATA_CHANNEL_OPEN = 'handle data channel open';
        PubSub.publish(HANDLE_DATA_CHANNEL_OPEN, dataChannel.readyState);
    }

    handleMessage(event)
    {
        const HANDLE_DATA_CHANNEL_MESSAGE = 'handle data channel message';
        PubSub.publish(HANDLE_DATA_CHANNEL_MESSAGE, event);
    }

    handleSendChannelClose()
    {
        const HANDLE_DATA_CHANNEL_CLOSE = 'handle data channel close';
        PubSub.publish(HANDLE_DATA_CHANNEL_CLOSE, null);
    }

    handleRemoteStreamAdded(event)
    {
        const REMOTE_STREAM_ADDED = 'remote stream added';
        PubSub.publish(REMOTE_STREAM_ADDED, event);
    }

    handleRemoteStreamRemoved(event)
    {
        const REMOTE_STREAM_REMOVED = 'remote stream removed';
        PubSub.publish(REMOTE_STREAM_REMOVED, event);
    }

    setRemoteDescription(sessionDescription)
    {
        this.rtcConnection.setRemoteDescription(new RTCSessionDescription(sessionDescription));
    }

    addIceCandidate(label, candidate)
    {
        let iceCandidate = new RTCIceCandidate({
            sdpMLineIndex: label,
            candidate: candidate
        });

        this.rtcConnection.addIceCandidate(iceCandidate);
    }

    doCall()
    {
        this.rtcConnection.createOffer(this.setLocalAndSendMessage.bind(this), this.onSignalingError, this.sdpConstraints);
    }

    doAnswer()
    {
        this.rtcConnection.createAnswer(this.setLocalAndSendMessage.bind(this), this.onSignalingError, this.sdpConstraints);
    }

    setLocalAndSendMessage(sessionDescription)
    {
        this.rtcConnection.setLocalDescription(sessionDescription);

        this.sendMessage({
            sd: sessionDescription,
            channel: this.room
        });
    }

    onSignalingError(error)
    {
        console.log('Failed to create signaling message: ' + error.name);
    }

    handleIceCandidate(event)
    {
        if (event.candidate)
        {
            let data = {
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate,
                channel: this.room,
                sd: ''
            };

            this.sendMessage(data);
        }
        else
        {
            console.log('End of candidates');
        }
    }


    sendMessage(message)
    {
        this.socket.emit('message', message);
    }
}

export { PeerConnection };
