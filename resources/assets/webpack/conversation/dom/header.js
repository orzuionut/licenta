class Header
{
    constructor()
    {
        this.$file_input = $('#dataChannelSend');
        
        this.$voice_button = $('#conversation-voice');
        this.$video_button = $('#conversation-video');
        this.$cinema_button = $('#conversation-cinema');

        this.$conversation_settings = $('#conversation-settings');
    }
}

export { Header }