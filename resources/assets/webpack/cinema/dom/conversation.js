

class ConversationDOM
{
    constructor()
    {
        this.$conversationToggle = $('#conversation-toggle');
        this.$videosToggle = $('#videos-toggle');

        this.$conversationDOM = $('#conversation-container');
        this.$videosDOM = $('#videos-container');

        this.bindListeners();
    }

    bindListeners()
    {
        this.$conversationToggle.on('click', this.conversationToggleClicked.bind(this));
        this.$videosToggle.on('click', this.videosToggleClicked.bind(this));
    }

    conversationToggleClicked()
    {
        this.hideVideos();
        this.showConversation();

        this.hideConversationToggle();
        this.showVideosToggle();
    }

    videosToggleClicked()
    {
        this.showVideos();
        this.hideConversation();

        this.showConversationToggle();
        this.hideVideosToggle();
    }

    showVideos()
    {
        this.$videosDOM.show();
    }

    showConversation()
    {
        this.$conversationDOM.show();
    }

    hideVideos()
    {
        this.$videosDOM.hide();
    }

    hideConversation()
    {
        this.$conversationDOM.hide();
    }

    showVideosToggle()
    {
        this.$videosToggle.show();
    }

    showConversationToggle()
    {
        this.$conversationToggle.show();
    }

    hideVideosToggle()
    {
        this.$videosToggle.hide();
    }

    hideConversationToggle()
    {
        this.$conversationToggle.hide();
    }
}

export {ConversationDOM}