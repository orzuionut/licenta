class Notification
{
    constructor()
    {
        this.$incoming_call_alert = $('#conversation-header-alert');
        this.$answer_call = $("#call-answer");
        this.$reject_call = $("#call-reject");

        this.bindListeners();
    }

    bindListeners()
    {
        PubSub.subscribe('voice_in_progress', this.handleIncomingCall.bind(this));
        PubSub.subscribe('call_in_progress', this.handleIncomingCall.bind(this));
        PubSub.subscribe('cinema_in_progress', this.handleIncomingCall.bind(this));
    }

    handleIncomingCall(message, data)
    {
        let self = this;

        this.showIncomingCallAlert();

        this.$answer_call.click(function ()
        {
            switch(message)
            {
                case 'voice_in_progress':
                    window.location.href = "/conversation/voice/" + data.conversation_id;
                    break;

                case 'call_in_progress':
                    window.location.href = "/conversation/call/" + data.conversation_id;
                    break;

                case 'cinema_in_progress':
                    window.location.href = "/conversation/cinema/" + data.conversation_id;
                    break;

                default:
                    window.location.href = "/conversation/call/" + data.conversation_id;
            }
        });

        this.$reject_call.click(function ()
        {
            self.hideIncomingCallAlert();
        });
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

export {Notification}