import {ConversationFilesDOM} from "../conversation/conversation_with_files";

class VideocallDOM 
{
    constructor()
    {
        this.localVideo = document.querySelector('#localVideo');
        this.remoteVideo = document.querySelector("#remoteVideo");

        this.conversationDOM = new ConversationFilesDOM();
        this.conversationDOM.bindListeners();
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
    
    handleFileInputChanged(event)
    {
        let fileName = null;

        if( event.target.value )
            fileName = event.target.value.split( '\\' ).pop();

        if( fileName )
            this.conversationDOM.filesDOM.footer.$inputFileLabel.find('span').html(fileName);
    }


}

export {VideocallDOM}