import { ConversationDOM } from './conversation_files';
import { FilesDOM } from "../files/dom/index";

class ConversationFilesDOM
{
    constructor()
    {
        this.conversationDOM = new ConversationDOM();
        this.filesDOM = new FilesDOM();
    }

    bindListeners()
    {
        this.bindConversationDOMListeners();
        this.bindFilesDOMListeners();
    }

    bindConversationDOMListeners()
    {
        this.conversationDOM.header.$showFilesButton.on('click', this.handleShowFilesButtonClicked.bind(this));
    }

    bindFilesDOMListeners()
    {
        this.filesDOM.header.$hideFilesButton.on('click', this.handleHideFilesButtonClicked.bind(this));

    }

    handleShowFilesButtonClicked()
    {
        this.conversationDOM.hide();
        this.filesDOM.show();
    }

    handleHideFilesButtonClicked()
    {
        this.conversationDOM.show();
        this.filesDOM.hide();
    }
}

export { ConversationFilesDOM }


