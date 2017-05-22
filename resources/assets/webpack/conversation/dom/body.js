import {Config} from "../../_config";
import {Helper} from "../helper";

class Body
{
    constructor()
    {
        this.$container = $('#conversation-messages-container');
        this.$box = $('#conversation-messages-body');

        this.bindListeners();
    }

    bindListeners()
    {
        // PubSub.subscribe(Config.getConversationFilesButtonClickedMessage(), this.hide.bind(this));
        PubSub.subscribe(Config.getConversationFilesButtonClickedMessage(), this.hide.bind(this));
    }

    appendMessagesArray(data, current_user_id)
    {
        Helper.appendConversationItems(this.$box, data, current_user_id);
    }

    appendMessage(data, current_user_id)
    {
        Helper.appendItem(this.$box, data, current_user_id);
    }

    clear()
    {
        this.$box.empty();
    }

    show()
    {
        this.$container.css({display: "flex"});
    }

    hide()
    {
        this.$container.css({display: "none"});
    }

}

export { Body }