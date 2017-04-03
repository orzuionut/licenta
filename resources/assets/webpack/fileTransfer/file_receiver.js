class FileReceiver
{
    constructor(worker, conversation_id)
    {
        this.worker = worker;
        
        this.conversation_id = conversation_id;
        
        let data = {
            conversation_id: conversation_id
        };
        
        this.worker.postMessage(data);
    }

    setConversationId(conversation_id)
    {
        this.conversation_id = conversation_id;
    }
}

export {FileReceiver}