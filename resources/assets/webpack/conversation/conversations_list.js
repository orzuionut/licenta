class ConversationsList {

    constructor($element)
    {
        this.item = $element;
    }

    getItemID(item)
    {
        const element = $(item).find("div[id^='conversation-id-']")[0];
        const id = $(element).attr('id');

        return id.substring(id.lastIndexOf("-") + 1);
    }
}

export { ConversationsList }