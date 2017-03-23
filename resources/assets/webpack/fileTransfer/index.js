class FileTransfer
{
    constructor(conversation_id)
    {
        this.worker = new Worker("/js/app/file_reader.js");
        this.conversation_id = conversation_id;
    }
    
    setConversationId(conversation_id)
    {
        this.conversation_id = conversation_id;
    }

    startSending(file)
    {
        let data = {
            file: file,
            conversation_id: this.conversation_id
        };

        // Send the file to the Web Worker to process it
        this.worker.postMessage(data);
    }
}

export {FileTransfer}