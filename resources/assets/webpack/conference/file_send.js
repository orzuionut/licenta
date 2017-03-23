import {Helper} from "../helpers/helper";


class SendFile {
    constructor(DOM, dataChannel)
    {
        this.DOM = DOM;
        this.dataChannel = dataChannel;

        this.channelOpen = true;

        this.chunkSizeLimit = 992000; // save chunks of ~ 1 MB to DB (62 slices of 16KB received)
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

        this.chunkSize = 16000;

        this.reader = new window.FileSlicer();
        this.reader.onload = this.onReadAsArrayBuffer.bind(this);

        this.sliceFile(0);
    }

    sliceFile(offset)
    {
        this.offset = offset;

        if (this.channelOpen)
        {
            let slice = this.file.slice(offset, offset + this.chunkSize);
            this.reader.readAsArrayBuffer(slice);
        }
        else
        {
            console.log("Exception.. channel closed..");
        }
    }

    onReadAsArrayBuffer(event)
    {
        let dataAsArrayBuffer = event.target.result;
        
        let data = Helper.ArrayBufferToString(dataAsArrayBuffer);

        this.sendThroughDataChannel(data);

        if (this.file.size > this.offset + dataAsArrayBuffer.byteLength)
        {
            window.setTimeout(this.sliceFile.bind(this), 100, this.offset + this.chunkSize);
        }
        else
        {
            let data = {fileName: this.file.name};
            this.sendThroughDataChannel(JSON.stringify(data));

            delete this.reader;
        }
    }

    sendThroughDataChannel(data)
    {
        if (this.channelOpen)
        {
            try
            {
                this.dataChannel.send(data);
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
}

export {SendFile}
