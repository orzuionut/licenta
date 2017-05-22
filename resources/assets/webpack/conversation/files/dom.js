import {Config} from "../../_config";
class ConversationFilesDOM
{
    constructor()
    {
        this.$container = $("#conversation-files-container");
        this.$box = $("#conversation-files-body");

        this.$completeFilesTab = $("#conversation-files-header__complete");
        this.$incompleteFilesTab = $("#conversation-files-header__incomplete");

        this.bindDOMListeners();
    }

    bindDOMListeners()
    {
        let self = this;

        this.$completeFilesTab.on('click', self.handleCompleteFilesTabClick.bind(self));
        this.$incompleteFilesTab.on('click', self.handleIncompleteFilesTabClick.bind(self));
    }

    handleCompleteFilesTabClick()
    {
        PubSub.publish(Config.getConversationCompleteFilesTabClickedMessage(), null);

        this.setCompleteFilesTabAsActive();
        this.setIncompleteFilesTabAsInactive();
    }

    handleIncompleteFilesTabClick()
    {
        PubSub.publish(Config.getConversationIncompleteFilesTabClickedMessage(), null);

        this.setCompleteFilesTabAsInactive();
        this.setIncompleteFilesTabAsActive();
    }

    show()
    {
        this.$container.css({display: "flex"});
    }

    hide()
    {
        this.$container.css({display: "none"});
    }

    setCompleteFilesTabAsActive()
    {
        this.$completeFilesTab.addClass('active');
    }

    setIncompleteFilesTabAsInactive()
    {
        this.$incompleteFilesTab.removeClass('active');
    }

    setCompleteFilesTabAsInactive()
    {
        this.$completeFilesTab.removeClass('active');
    }

    setIncompleteFilesTabAsActive()
    {
        this.$incompleteFilesTab.addClass('active');
    }
}

export {ConversationFilesDOM}