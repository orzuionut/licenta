import {Config} from "../../_config";
import {ConversationIncompleteFilesDOM} from "./incomplete_files_dom";

class ConversationIncompleteFiles
{
    constructor()
    {
        this.DOM = new ConversationIncompleteFilesDOM();

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
        // this.DOM.appendFiles(data, this.current_user_id);
    }

    handleCompleteFilesTabClick()
    {
        this.DOM.hide();
    }

    handleIncompleteFilesTabClick()
    {
        this.DOM.show();
    }
}

export {ConversationIncompleteFiles}