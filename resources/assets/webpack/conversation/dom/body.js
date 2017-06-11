import {Config} from "../../_config";
import {Helper} from "../helper";

class Body
{
    constructor()
    {
        this.user_id = $('#_user_id').val();

        this.$container = $('#conversation-messages-container');
        this.$box = $('#conversation-messages-body');

        this.bindListeners();
    }

    bindListeners()
    {
        let self = this;

        DragDrop(this.$box.selector, this.handleFileDropped.bind(this));

        PubSub.subscribe(Config.getShowFileNameOnDOMMessage(), this.handleShowFile.bind(this));

        this.$box.on('click', 'div.message-box.message-other.file', self.handleFileElementClicked.bind(self));
    }

    appendMessagesArray(data, current_user_id)
    {
        Helper.appendConversationItems(this.$box, data, current_user_id);
    }

    appendMessage(data, current_user_id)
    {
        Helper.appendItem(this.$box, data, current_user_id);
    }

    clear()
    {
        this.$box.empty();
    }

    show()
    {
        this.$container.css({display: "flex"});
    }

    hide()
    {
        this.$container.css({display: "none"});
    }

    handleFileDropped(files)
    {
        PubSub.publish(Config.getFileDroppedMessage(), files);
    }

    handleShowFile(message, data)
    {
        let fileData = {
            user_id: data.sender_id,
            user_name: data.user_name,
            message: data.fileName,
            isFile: true
        };

        Helper.appendItem(this.$box, fileData, this.user_id);
    }

    handleFileElementClicked(clickEvent)
    {
        const $file = $(clickEvent.currentTarget);

        PubSub.publish(Config.getDownloadFileMessage(), $file.text());
    }
}

export { Body }