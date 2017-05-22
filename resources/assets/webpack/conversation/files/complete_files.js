import {Config} from "../../_config";
import {ConversationCompleteFilesDOM} from "./complete_files_dom";

class ConversationCompleteFiles
{
    constructor(current_user_id)
    {
        this.current_user_id = current_user_id;

        this.DOM = new ConversationCompleteFilesDOM();

        this.bindListeners();
    }

    bindListeners()
    {
        PubSub.subscribe(
            Config.getConversationCompleteFilesTabClickedMessage(),
            this.handleCompleteFilesTabClick.bind(this)
        );

        PubSub.subscribe(
            Config.getConversationIncompleteFilesTabClickedMessage(),
            this.handleIncompleteFilesTabClick.bind(this)
        );
    }

    handleFilesRetrieved(data)
    {
        this.DOM.appendFiles(data, this.current_user_id);
    }

    handleCompleteFilesTabClick()
    {
        this.DOM.show();
    }

    handleIncompleteFilesTabClick()
    {
        this.DOM.hide();
    }
}

export {ConversationCompleteFiles}