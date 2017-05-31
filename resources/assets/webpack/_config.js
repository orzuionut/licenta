class Config 
{
    static getIceServers()
    {
        return {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302"
                },
                {
                    urls: "stun:stun1.l.google.com:19302"
                },
                {
                    urls: "stun:stun.voxgratia.org"
                },
                {
                    urls: "turn:numb.viagenie.ca",
                    username: "darkstyle6196@gmail.com",
                    credential: "nonney06011996"
                }
            ]
        };
    }
    
    static getPeerConnectionConstraints()
    {
        return {
            optional: [
                {
                    DtlsSrtpKeyAgreement: true
                }
            ]
        };
    }

    static getConversationSwitchMessage()
    {
        return "conversation has been changed";
    }

    static getConversationFilesButtonClickedMessage()
    {
        return "conversation files button clicked";
    }

    static getConversationCompleteFilesTabClickedMessage()
    {
        return "conversation complete files tab clicked";
    }

    static getConversationIncompleteFilesTabClickedMessage()
    {
        return "conversation incomplete files tab clicked";
    }

    static getConversationCompleteFilesRetrievedMessage()
    {
        return "conversation complete files retrieved";
    }

    static getConversationIncompleteFilesRetrievedMessage()
    {
        return "conversation incomplete files retrieved";
    }

    static getFileMessageBoxClickedMessage()
    {
        return "conversation complete files file message-box clicked";
    }

    static getFilmDroppedMessage()
    {
        return "cinema film dropped";
    }

    static getHideFilmUploadMessage()
    {
        return "film uploading hidden";
    }

    static getWebSocketVariable()
    {
        return "get websocket var";
    }

    static webSocketVariableRetrieved()
    {
        return "web socket variable retrieved";
    }

    static getAppendFilmToDOMMessage()
    {
        return "append film to dom";
    }

    static getFilmPlayButtonPressedMessage()
    {
        return "film play button pressed";
    }

    static getFilmPauseButtonPressedMessage()
    {
        return "film pause button pressed";
    }

    static getFilmPlayButtonPressedByOtherMessage()
    {
        return "other participant pressed play"
    }

    static getFilmPauseButtonPressedByOtherMessage()
    {
        return "other participant pressed pause";
    }

    static getFileDroppedMessage()
    {
        return "file dropped on dom";
    }

    static getShowFileNameOnDOMMessage()
    {
        return "getShowFileNameOnDOMMessage";
    }

    static getDownloadFileMessage()
    {
        return "download file";
    }
}

export { Config }