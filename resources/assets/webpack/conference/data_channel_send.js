class DataChannelSend
{
    constructor(localPeer)
    {
        this.localPeer = localPeer;
    }
    
    send(message)
    {
        console.log("SEND");

        this.localPeer.send(message);
    }
}

export {DataChannelSend}