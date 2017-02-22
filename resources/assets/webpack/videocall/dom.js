class VideocallDOM {

    constructor()
    {
        // this.sendButton = document.getElementById("sendButton");
        // this.dataChannelSend = document.getElementById("dataChannelSend");
        // this.dataChannelReceive = document.getElementById("dataChannelReceive");


        this.localVideo = document.querySelector('#localVideo');
        this.remoteVideo = document.querySelector("#remoteVideo");

        this.$dataChannelSend = $('#dataChannelSend');
        this.$sendButton = $('#send-button');
        this.$filesContainer = $('#files-container');
    }

}

export {VideocallDOM}