import {Config} from "../_config";
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
}

export {FileReceiver}