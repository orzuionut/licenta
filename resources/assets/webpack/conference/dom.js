class ConferenceDOM
{
    // handleFileInputChanged(event)
    // {
    //     let fileName = null;
    //
    //     if( event.target.value )
    //         fileName = event.target.value.split( '\\' ).pop();
    //
    //     if( fileName )
    //         this.conversationDOM.filesDOM.footer.$inputFileLabel.find('span').html(fileName);
    // }
    //
    
    
    static createVideo(participant)
    {
        var videoId = "video-" + participant.id;
        var videoHtml = '<video id="' + videoId + '" class="conference-video" autoplay muted></video>';

        $("#videos-container").append(videoHtml);

        return $("#" + videoId)[0];
    }
    
    
}

export { ConferenceDOM }