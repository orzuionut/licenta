class VideocallDOM {

    constructor()
    {
        this.localVideo = document.querySelector('#localVideo');
        this.remoteVideo = document.querySelector("#remoteVideo");

        this.$dataChannelSend = $('#dataChannelSend');
        this.$sendButton = $('#send-button');
        this.$filesContainer = $('#files-container');
    }

}

export {VideocallDOM}