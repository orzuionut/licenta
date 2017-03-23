import {ConversationsList} from './conversations_list';
import {ConversationBuilder} from "./conversation_builder";
import {Header} from "./dom/header";
import {Helper} from "../helpers/helper";
import {FileTransfer} from "../fileTransfer/index";
import {FileReceiver} from "../fileTransfer/file_receiver";

class ConversationFull extends ConversationBuilder
{
    constructor(conversation_id, user_id, user_name)
    {
        super(conversation_id, user_id, user_name);

        // Side-menu list of conversations
        this.conversations_list = new ConversationsList();

        this.conversation.DOM.header = new Header();

        this.fileTransfer = new FileTransfer(conversation_id);

        this.fileReceiver = new FileReceiver(conversation_id);
    }

    bindDOMListeners()
    {
        let self = this;
        
        this.conversations_list.item.on('click', this, self.switchConversation.bind(self));
        
        this.conversation.DOM.header.$file_input.on('change', self.uploadFile.bind(self));
        
        this.conversation.DOM.header.$video_button.click(function ()
        {
            let data = {};
            self.conversation.socketIO.sendMessage('call', data);

            window.location.href = "/conversation/call/" + self.conversation.id;
        });

        this.conversation.DOM.header.$answer_call.click(function ()
        {
            window.location.href = "/conversation/call/" + self.conversation.id;
        });

        this.conversation.DOM.header.$reject_call.click(function ()
        {
            self.conversation.DOM.header.hideIncomingCallAlert();
        });
    }

    switchConversation(clickEvent)
    {
        let conversationItem = clickEvent.currentTarget;

        let old_conversation_id = this.conversation.id;
        let new_conversation_id = this.conversations_list.getItemID(conversationItem);

        // Conversation changed. Update stuff
        if (old_conversation_id !== new_conversation_id)
        {
            this.conversation.DOM.body.clear();

            this.conversation.setID(new_conversation_id);

            this.conversation.socketIO.setRoom(new_conversation_id);

            let data = {};

            data.leaveRoom = old_conversation_id;
            this.conversation.socketIO.sendMessage('roomChanged', data);

            this.conversation.socketIO.sendMessage('init', data);
            
            /////////////////////
            this.fileTransfer.setConversationId(new_conversation_id);
        }
    }
    
    uploadFile()
    {
        Helper.flash("Uploading file in progres..");

        let file = this.getFileFromInput();
        
        this.fileTransfer.startSending(file);
    }

    getFileFromInput()
    {
        return this.conversation.DOM.header.$file_input[0].files[0];
    }
}

export {ConversationFull}


