class ConversationMessagesDOM
{
    constructor()
    {
        this.$container = $('#conversation-messages-container');

        this.body = new ConversationMessagesDOM()
    }

    show()
    {
        this.$container.css({display: "flex"});
    }

    hide()
    {
        this.$container.css({display: "none"});
    }
}

export {ConversationMessagesDOM}