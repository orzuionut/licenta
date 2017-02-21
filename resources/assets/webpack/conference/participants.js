class Participant
{
    constructor(id, socket)
    {
        this.id = id;
        this.rtcPeer = null;
        this.iceCandidateQueue = [];
        this.socket = socket;
    }

    offerToReceiveVideo(error, offerSdp)
    {
        if (error) {
            return console.error("sdp offer error");
        }

        var msg = {
            id: "receiveVideoFrom",
            sender: this.id,
            sdpOffer: offerSdp
        };
        this.sendMessage(msg);

        console.log('Invoking SDP offer callback function ' + msg.sender);
    }

    onIceCandidate(candidate) 
    {
        var message = {
            id: 'onIceCandidate',
            candidate: candidate,
            sender: this.id
        };
        this.sendMessage(message);
    }

    dispose()
    {
        this.rtcPeer.dispose();
        this.rtcPeer = null;
    }
    
    sendMessage(message)
    {
        this.socket.emit('message', message);
    }
    
}

export { Participant }
