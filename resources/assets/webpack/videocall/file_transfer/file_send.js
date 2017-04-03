import {Helper} from "../../helpers/helper";

class FileSend
{
    constructor(socket, DOM, peerConnection, user_id)
    {
        this.socket = socket;
        this.DOM = DOM;
        this.peerConnection = peerConnection;
        this.user_id = user_id;

        this.channelOpen = true;
    }

    bindDOMListeners()
    {
        let self = this;

        this.DOM.conversationDOM.filesDOM.footer.$inputFile.on('change', this, self.DOM.handleFileInputChanged.bind(self.DOM));
        this.DOM.conversationDOM.filesDOM.footer.$sendButton.on('click', self.sendFileToPeer.bind(self));
    }

    sendFileToPeer()
    {
        Helper.flash("Sending file to your friend..");

        this.file = this.getFileFromInput();
        let self = this;
        let worker = new Worker("/js/app/file_transfer.js");

        worker.postMessage(this.file);

        worker.onmessage = function (event)
        {
            if (event.data.finish)
            {
                let data = {fileName: self.file.name};

                self.sendThroughDataChannel(JSON.stringify(data));
            }
            else
            {
                self.sendThroughDataChannel(event.data);
            }
        };
    }
    
    sendThroughDataChannel(data)
    {
        if (this.channelOpen)
        {
            try
            {
                console.log("SEND PACKAGE");
        
                if (this.peerConnection.isInitiator)
                {
                    this.peerConnection.sendChannel.send(data);
                }
                else
                {
                    this.peerConnection.receiveChannel.send(data);
                }
            }
            catch (exception)
            {
                this.channelOpen = false;
            }
        }
    }

    getFileFromInput()
    {
        return this.DOM.conversationDOM.filesDOM.footer.$inputFile[0].files[0];
    }

    uploadRemainingFileToServer(message)
    {
        let self = this;

        Helper.flash("Please wait while the rest of the file is uploaded to the server..");

        let data = {
            hash: message.hash,
            file: this.file.slice(message.receivedDataSize),
            fileName: self.file.name,
            user_id: this.user_id
        };

        let worker = new Worker("/js/app/workers.js");

        worker.postMessage(data);

        worker.onmessage = function (event)
        {
            Helper.flash(event.data);
        };
    }
}

export {FileSend}
