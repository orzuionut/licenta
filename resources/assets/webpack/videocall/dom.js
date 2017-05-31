class VideocallDOM
{
    constructor()
    {
        this.localVideo = document.querySelector('#localVideo');
        this.remoteVideo = document.querySelector("#remoteVideo");
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
}

export {VideocallDOM}