import { Body } from './body';
import { Footer } from './footer';

class ConversationWithoutHeader
{
    constructor()
    {
        this.body = new Body($('.conversation-body'));
        this.footer = new Footer($('#enter-message'), $('#submit-message'));
    }
}

export { ConversationWithoutHeader }


