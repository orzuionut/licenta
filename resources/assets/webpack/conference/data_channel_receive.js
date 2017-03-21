class DataChannelReceive 
{
    constructor(localPeer)
    {
        this.localPeer = localPeer;
    }

    setRemotePeer(remotePeer)
    {
        this.remotePeer = remotePeer;
    }

    handleMessage(data)
    {
        console.log("RECEIVE");
        
        const HANDLE_DATA_CHANNEL_MESSAGE = 'handle data channel message';
        PubSub.publish(HANDLE_DATA_CHANNEL_MESSAGE, data);
    }
}

export {DataChannelReceive}