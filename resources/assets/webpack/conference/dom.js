class ConferenceDOM
{
    static createVideo(participant)
    {
        var videoId = "video-" + participant.id;
        var videoHtml = '<video id="' + videoId + '" class="conference-video" autoplay muted></video>';

        $("#videos-container").append(videoHtml);

        return $("#" + videoId)[0];
    }
}

export { ConferenceDOM }