import { Conversation } from './conversation';
import { ConversationsList } from './conversations_list';

import { ConversationDOM } from './dom/dom';
import { Header } from './dom/header';
import { Body } from './dom/body';
import { Footer } from './dom/footer';

class ConversationBuilder
{
    constructor()
    {
        // Side-menu list of conversations
        let conversations_list = new ConversationsList($(".conversation-item"));

        // Main chat-box
        let header = new Header($('#conversation-voice'), $('#conversation-video'), $('#conversation-profile'));
        let body = new Body($('.conversation-body'));
        let footer = new Footer($('#enter-message'), $('#submit-message'));

        let DOM = new ConversationDOM(header, body, footer);

        let conversation = new Conversation(DOM, conversation_id, user_id);

        conversation.init();
    }
}

export { ConversationBuilder }


