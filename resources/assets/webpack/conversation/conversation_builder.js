import { Conversation } from './conversation';

import { ConversationDOM } from './dom/dom';
import { Body } from './dom/body';
import { Footer } from './dom/footer';

class ConversationBuilder
{
    constructor(id, user_id, user_name)
    {
        // Main chat-box
        let body = new Body();
        let footer = new Footer();

        let DOM = new ConversationDOM(body, footer);

        this.conversation = new Conversation(DOM, id, user_id, user_name);

        this.conversation.init();
    }
}

export { ConversationBuilder }


