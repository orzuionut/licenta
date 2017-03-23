class Header {

    constructor()
    {
        this.$file_input = $('#dataChannelSend');
        
        this.$voice_button = $('#conversation-voice');
        this.$video_button = $('#conversation-video');
        this.$profile_button = $('#conversation-profile');

        this.$incoming_call_alert = $('#conversation-header-alert');
        this.$answer_call = $("#call-answer");
        this.$reject_call = $("#call-reject");
    }

    showIncomingCallAlert()
    {
        this.$incoming_call_alert.css('display', 'flex');
    }

    hideIncomingCallAlert()
    {
        this.$incoming_call_alert.css('display', 'none');
    }

}

export { Header }