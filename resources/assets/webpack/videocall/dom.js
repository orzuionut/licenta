class VideocallDOM {

    constructor()
    {
        this.localVideo = document.querySelector('#localVideo');
        this.remoteVideo = document.querySelector("#remoteVideo");

        this.$dataChannelSend = $('#dataChannelSend');
        this.$sendButton = $('#send-button');
        this.$filesContainer = $('#files-container');

        this.$files = $('.single-file');
    }

}

export {VideocallDOM}