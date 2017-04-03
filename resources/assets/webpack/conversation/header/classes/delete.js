class ConversationDelete
{
    constructor()
    {
        // PubSub Messages
        this.DELETE_CONVERSATION_GET_ID_MESSAGE = "delete conversation";
        this.DELETE_CONVERSATION_POST_ID_MESSAGE = "delete conversation with id";
        
        this.modal = $("#conversation-delete-modal");
        this.modal.modal();
        
        this.$confirmDeleteBtn = $("#conversation-delete-confirm");
        
        this.bindDOMListeners();
        this.bindListeners();
    }
    
    bindDOMListeners()
    {
        let self = this;
        
        this.$confirmDeleteBtn.on('click', self.getConversationIdToDelete.bind(self));
    }

    bindListeners()
    {
        PubSub.subscribe(this.DELETE_CONVERSATION_POST_ID_MESSAGE, this.deleteConversation);
    }

    getConversationIdToDelete()
    {
        PubSub.publish(this.DELETE_CONVERSATION_GET_ID_MESSAGE, null);
    }

    deleteConversation(message, id)
    {
        $.ajax({
            type: "DELETE",
            url: "conversation/" + id,
            data: {},
            success: function (data)
            {
                window.location.href = "/conversation";
            }
        });
    }
}

export {ConversationDelete}