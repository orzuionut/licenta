import {Helper} from '../helper';
import {Config} from "../../_config";

class ConversationCompleteFilesDOM
{
    constructor()
    {
        this.$container = $("#conversation-complete-files-body");
        this.$fileMessages = this.$container.find(".message-box");

        this.bindDOMListeners();
    }

    bindDOMListeners()
    {
        let self = this;

        this.$container.on('click', self.$fileMessages, self.handleFileMessageBoxClicked.bind(self));
    }

    handleFileMessageBoxClicked(clickEvent)
    {
        let $messageBox = $(clickEvent.target);
        let fileId = $messageBox.data('id');

        let data = {
           file_id: fileId
        };

        PubSub.publish(Config.getFileMessageBoxClickedMessage(), data);
    }

    appendFiles(files, current_user_id)
    {
        Helper.appendConversationItems(this.$container, files, current_user_id);
    }

    show()
    {
        this.$container.show();
    }

    hide()
    {
        this.$container.hide();
    }
}

export {ConversationCompleteFilesDOM}