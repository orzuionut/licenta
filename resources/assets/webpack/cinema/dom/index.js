import {FilmDOM} from "./film";
import {ConversationDOM} from "./conversation";

class CinemaDOM
{
    constructor()
    {
        this.filmDOM = new FilmDOM();
        this.conversationDOM = new ConversationDOM();

    }
}

export { CinemaDOM }