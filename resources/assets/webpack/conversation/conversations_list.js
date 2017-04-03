import {ConversationCreate} from "./side/create";
import {ConversationsFilter} from "./side/filter";

class ConversationsList
{
    constructor()
    {
        this.item = $(".conversation-item");

        // Set first conversation as current active
        this.currentActiveItem = $(".conversations-list .conversation-item").first();
        this.switchActive(this.currentActiveItem);

        this.conversationCreate = new ConversationCreate();
        this.conversationsFilter = new ConversationsFilter();

        this.bindDOMListeners();
    }

    bindDOMListeners()
    {
        let self = this;
    }
    
    getItemID(item)
    {
        const element = $(item).find("div[id^='conversation-id-']")[0];
        const id = $(element).attr('id');

        return id.substring(id.lastIndexOf("-") + 1);
    }

    switchActive(item)
    {
        $(this.currentActiveItem).removeClass('active');
        $(item).addClass('active');

        this.currentActiveItem = item;
    }
}

export { ConversationsList }