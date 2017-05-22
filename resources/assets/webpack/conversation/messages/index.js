import { Message } from './../message';
import {Config} from "../../_config";
import {ConversationMessagesDOM} from "./dom";

class ConversationMessages
{
    constructor()
    {
        this.DOM = new ConversationMessagesDOM();

        this.bindListeners();
    }

    bindListeners()
    {
        PubSub.subscribe(Config.getConversationSwitchMessage(), this.clear.bind(this));

        // PubSub.subscribe(Config.getConversationFilesButtonClickedMessage(), this.hide.bind(this));
        PubSub.subscribe(Config.getConversationFilesButtonClickedMessage(), this.hide.bind(this));
    }

    appendMessagesArray(data, current_user_id)
    {
        for(let i = 0; i < data.length; i++)
        {
            this.appendMessage(data[i], current_user_id);
        }
    }

    appendMessage(data, current_user_id)
    {
        let is_current_user = data.user_id == current_user_id;
        let type = is_current_user ? 'message-user' : 'message-other';

        // This message is from another user
        if( ! is_current_user )
        {
            let sender_name = typeof data.user_name == 'undefined'
                ? data.user.first_name + " " + data.user.last_name
                : data.user_name;

            let $emitter = Message.createEmitter(sender_name);

            this.append($emitter);
        }

        // This message is from current user
        this.append(new Message(data, type));
    }

    append($element)
    {
        this.$box.append($element);

        this.scrollToBottom();
    }

    scrollToBottom()
    {
        this.$box.scrollTop(this.$box[0].scrollHeight);
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

export { ConversationMessages }