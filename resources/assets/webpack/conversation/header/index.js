import {ConversationDelete} from "./classes/delete";
import {Config} from "../../_config";

class ConversationActions
{
    constructor(conversation_id)
    {
        this.conversation_id = conversation_id;

        this.$filesButton = $('#conversation-files');
        this.$settingsButton = $('#conversation-settings');

        // PubSub Messages
        this.DELETE_CONVERSATION_GET_ID_MESSAGE = "delete conversation";
        this.DELETE_CONVERSATION_POST_ID_MESSAGE = "delete conversation with id";

        this.delete = new ConversationDelete();

        this.bindListeners();
        this.bindDOMListeners();
    }

    bindListeners()
    {
        PubSub.subscribe(Config.getConversationSwitchMessage(), this.setConversationId.bind(this));
        PubSub.subscribe(this.DELETE_CONVERSATION_GET_ID_MESSAGE, this.sendConversationIdToDelete.bind(this));
    }

    bindDOMListeners()
    {
        let self = this;

        this.$filesButton.on('click', self.handleFilesButtonClick.bind(self));
    }

    handleFilesButtonClick()
    {
        PubSub.publish(Config.getConversationFilesButtonClickedMessage(), null);
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