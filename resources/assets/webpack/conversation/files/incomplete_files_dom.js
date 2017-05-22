

class ConversationIncompleteFilesDOM
{
    constructor()
    {
        this.$container = $("#conversation-incomplete-files-body");
    }

    show()
    {
        this.$container.show();
    }

    hide()
    {
        this.$container.hide();
    }
}

export {ConversationIncompleteFilesDOM}