class Header {

    constructor($voice_button, $video_button, $profile_button)
    {
        this.$voice_button = $voice_button;
        this.$video_button = $video_button;
        this.$profile_button = $profile_button;

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