class FileTransfer
{
    constructor(worker, conversation_id)
    {
        this.worker = worker;
        this.conversation_id = conversation_id;
    }
    
    setConversationId(conversation_id)
    {
        this.conversation_id = conversation_id;
    }

    startSending(file, hash)
    {
        let data = {
            isReader: true,
            file: file,
            hash: hash,
            conversation_id: this.conversation_id
        };

        // Send the file to the Web Worker to process it
        this.worker.postMessage(data);
    }
}

export {FileTransfer}