import { Message } from './../message';

class Body{

    constructor()
    {
        this.$box = $('.conversation-body');
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
        let is_current_user = data.user_id === current_user_id;
        let type = is_current_user ? 'message-user' : 'message-other';

        if(! is_current_user)
        {
            let $emitter = Message.createEmitter(data.user_name);

            this.append($emitter);
        }

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

}

export { Body }