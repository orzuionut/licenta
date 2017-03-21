class ConversationsList {

    constructor()
    {
        this.item = $(".conversation-item");
    }

    getItemID(item)
    {
        const element = $(item).find("div[id^='conversation-id-']")[0];
        const id = $(element).attr('id');

        return id.substring(id.lastIndexOf("-") + 1);
    }
}

export { ConversationsList }