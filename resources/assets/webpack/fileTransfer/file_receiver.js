class FileReceiver
{
    constructor(conversation_id)
    {
        this.worker = new Worker("/js/app/file_receiver.js");
        this.conversation_id = conversation_id;
        
        this.worker.postMessage(this.conversation_id);
    }

    setConversationId(conversation_id)
    {
        this.conversation_id = conversation_id;
    }
}

export {FileReceiver}