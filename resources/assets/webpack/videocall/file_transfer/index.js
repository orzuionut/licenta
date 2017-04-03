import {FileTransfer} from "../../fileTransfer/index";
import {FileReceiver} from "../../fileTransfer/file_receiver";
import {Helper} from "../../helpers/helper";

class FileDrop
{
    constructor(conversation_id)
    {
        let worker = new Worker("/js/app/file_transfer.js");

        worker.onmessage = function (data) {
            // Blob = data.data.Blob

            let $fileLink = $('<a/>', {
                text: data.data.fileName,
                href: URL.createObjectURL(data.data.blob),
                target: '_blank',
                download: data.data.fileName,
                class: 'single-file file-bubble file-bubble-download',
                id: 'auto-download'
            });

            var $el = $('.conversation-body');

            $el.append($fileLink);
        };

        this.fileTransfer = new FileTransfer(worker, conversation_id);

        this.fileReceiver = new FileReceiver(worker, conversation_id);
    }

    bindDOMListeners()
    {
        let self = this;

        this.DOM.conversationDOM.filesDOM.footer.$inputFile.on('change', this, self.DOM.handleFileInputChanged.bind(self.DOM));
        this.DOM.conversationDOM.filesDOM.footer.$sendButton.on('click', self.uploadFile.bind(self));
    }

    uploadFile()
    {
        Helper.flash("Uploading file in progress..");

        let file = this.getFileFromInput();
        let hash = Helper.guid();

        this.fileTransfer.startSending(file, hash);
    }

    getFileFromInput()
    {
        return this.conversation.DOM.header.$file_input[0].files[0];
    }
}

export {FileDrop}