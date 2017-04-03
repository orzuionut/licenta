import {ConversationDelete} from "./classes/delete";

class ConversationSettings
{
    constructor(conversation_id)
    {
        this.conversation_id = conversation_id;
        
        // PubSub Messages
        this.DELETE_CONVERSATION_GET_ID_MESSAGE = "delete conversation";
        this.DELETE_CONVERSATION_POST_ID_MESSAGE = "delete conversation with id";
        
        this.delete = new ConversationDelete();

        this.bindListeners();
    }
    
    setConversationID(conversation_id)
    {
        this.conversation_id = conversation_id;
    }
    
    bindListeners()
    {
        PubSub.subscribe(this.DELETE_CONVERSATION_GET_ID_MESSAGE, this.sendConversationIdToDelete.bind(this));
    }
    
    sendConversationIdToDelete()
    {
        PubSub.publish(this.DELETE_CONVERSATION_POST_ID_MESSAGE, this.conversation_id);
    }
}

export {ConversationSettings}