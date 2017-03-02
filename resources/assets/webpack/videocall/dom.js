class VideocallDOM {

    constructor()
    {
        this.localVideo = document.querySelector('#localVideo');
        this.remoteVideo = document.querySelector("#remoteVideo");

        this.$dataChannelSend = $('#dataChannelSend');
        this.$sendButton = $('#send-button');
        this.$filesContainer = $('#files-container');

        this.$filesDownload = document.querySelector('#files-download');

        this.$files = $('.single-file');

        ///////////////////////////////////////////
        this.$conversationWrapper = $('.conversation-wrapper');
        this.$conversationFilesWrapper = $('.conversation-files-wrapper');
        this.$showFilesButton = $('#show-files-btn');
        this.$hideFilesButton = $('#hide-files-btn');
        this.$inputFile = $('#dataChannelSend');
        this.$inputFileLabel = $('#fileInputLabel');
    }

    updateVideoElementsCallRunning()
    {
        this.localVideo.classList.remove("video-fullscreen");
        this.localVideo.classList.add("video-small");

        this.remoteVideo.classList.remove("video-hidden");
        this.remoteVideo.classList.add("video-fullscreen");
    }

    updateVideoElementsCallStopped()
    {
        this.localVideo.classList.remove("video-small");
        this.localVideo.classList.add("video-fullscreen");

        this.remoteVideo.classList.remove("video-fullscreen");
        this.remoteVideo.classList.add("video-hidden");
    }

    showFlashMessageCallStopped()
    {
        swal({
            title: "Video call ended!",
            imageUrl: "/img/call_ended_icon.png"
        });
    }

    handleShowFilesButtonClicked()
    {
        this.$conversationWrapper.css({ display: "none" });
        this.$conversationFilesWrapper.css({ display: "flex" });
    }

    handleHideFilesButtonClicked()
    {
        this.$conversationWrapper.css({ display: "flex" });
        this.$conversationFilesWrapper.css({ display: "none" });
    }

    handleFileInputChanged(event)
    {
        let fileName = null;

        if( event.target.value )
            fileName = event.target.value.split( '\\' ).pop();

        if( fileName )
            this.$inputFileLabel.find('span').html(fileName);
    }


}

export {VideocallDOM}