import { ConversationWithoutHeader } from './dom/conversation_without_header';

class ConversationDOM extends ConversationWithoutHeader
{
    constructor()
    {
        super();
        this.$container = $('.conversation-wrapper');
    }

    show()
    {
        this.$container.css({ display: "flex" });
    }

    hide()
    {
        this.$container.css({ display: "none" });
    }
}

export { ConversationDOM }


