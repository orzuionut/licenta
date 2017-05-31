import {ConversationDelete} from "./classes/delete";
import {Config} from "../../_config";

class ConversationActions
{
    constructor(conversation_id)
    {
        this.conversation_id = conversation_id;

        this.$settingsButton = $('#conversation-settings');

        // PubSub Messages
        this.DELETE_CONVERSATION_GET_ID_MESSAGE = "delete conversation";
        this.DELETE_CONVERSATION_POST_ID_MESSAGE = "delete conversation with id";

        this.delete = new ConversationDelete();

        this.bindListeners();
    }

    bindListeners()
    {
        PubSub.subscribe(Config.getConversationSwitchMessage(), this.setConversationId.bind(this));
        PubSub.subscribe(this.DELETE_CONVERSATION_GET_ID_MESSAGE, this.sendConversationIdToDelete.bind(this));
    }

    setConversationId(message, conversation_id)
    {
        this.conversation_id = conversation_id;
    }

    sendConversationIdToDelete()
    {
        PubSub.publish(this.DELETE_CONVERSATION_POST_ID_MESSAGE, this.conversation_id);
    }
}

export {ConversationActions}