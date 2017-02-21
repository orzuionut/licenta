class ConferenceDOM
{
    static createVideo(participant)
    {
        var videoId = "video-" + participant.id;
        var videoHtml = '<video id="' + videoId + '" autoplay height="240px"></video>';

        $("#videoList").append(videoHtml);

        return $("#" + videoId)[0];
    }
}

export { ConferenceDOM }