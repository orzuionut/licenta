import {Config} from "../_config";
class FileTransfer
{
    constructor(worker, conversation_id)
    {
        this.worker = worker;
        this.conversation_id = conversation_id;

        this.bindListeners();
    }

    bindListeners()
    {
        PubSub.subscribe(Config.getConversationSwitchMessage(), this.setConversationId.bind(this));
    }
    
    setConversationId(message, conversation_id)
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