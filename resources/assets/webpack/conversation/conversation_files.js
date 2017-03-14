import { ConversationWithoutHeader } from './dom/conversation_without_header';
import { HeaderFiles } from './dom/header-files';

class ConversationDOM extends ConversationWithoutHeader
{
    constructor()
    {
        super();
        this.header = new HeaderFiles();
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


