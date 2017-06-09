class ConferenceDOM
{
    static createVideo(id, isLocal)
    {
        let videoId = "video-" + id;
        let videoHtml;

        if ( isLocal )
            // Mute local video to remove echo/noise
            videoHtml = '<video id="' + videoId + '" class="conference-video" autoplay muted poster="/img/profile.jpg"></video>';
        else
            videoHtml = '<video id="' + videoId + '" class="conference-video" autoplay poster="/img/profile.jpg"></video>';

        $("#videos-container").append(videoHtml);

        ConferenceDOM.resizeVideos();

        return $("#" + videoId)[0];
    }

    static resizeVideos()
    {
        let nrOfChilds = $("#videos-container").children().length;

        if ( nrOfChilds > 4)
        {
            $("#videos-container#conference-video").css({
                "flex-basis": " 30%",
                "margin": "1px"
            });
        }
        else if ( nrOfChilds > 7 )
        {
            $("#videos-container#conference-video").css({
                "flex-basis": " 23%",
                "margin": "1px"
            });
        }
    }
}

export { ConferenceDOM }