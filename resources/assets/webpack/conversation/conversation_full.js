import {ConversationsList} from './conversations_list';
import {ConversationBuilder} from "./conversation_builder";
import {Header} from "./dom/header";
import {Config} from "../_config";
import {ConversationActions} from "./header/index";

class ConversationFull extends ConversationBuilder
{
    constructor(conversation_id, user_id, user_name)
    {
        super(conversation_id, user_id, user_name);

        // Side-menu list of conversations
        this.conversations_list = new ConversationsList();

        this.conversation.DOM.header = new Header();

        this.actionButtons = new ConversationActions(conversation_id);

        this.bindDOMListeners();
    }

    bindDOMListeners()
    {
        let self = this;
        
        this.conversations_list.item.on('click', this, self.switchConversation.bind(self));
        
        // this.conversation.DOM.header.$file_input.on('change', self.uploadFile.bind(self));
        
        this.conversation.DOM.header.$video_button.click(function ()
        {
            self.conversation.socketIO.sendMessage('call', {});

            window.location.href = "/conversation/call/" + self.conversation.id;
        });

        this.conversation.DOM.header.$cinema_button.click(function ()
        {
            self.conversation.socketIO.sendMessage('cinema', {});

            window.location.href = "/conversation/cinema/" + self.conversation.id;
        });

        this.conversation.DOM.header.$conversation_settings.dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
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
            // Set clicked conversation as active
            this.conversations_list.switchActive(conversationItem);

            this.conversation.DOM.body.clear();

            this.conversation.setID(new_conversation_id);

            this.conversation.socketIO.setRoom(new_conversation_id);

            let data = {};

            data.leaveRoom = old_conversation_id;
            this.conversation.socketIO.sendMessage('roomChanged', data);

            this.conversation.socketIO.sendMessage('init', data);

            PubSub.publish(Config.getConversationSwitchMessage(), new_conversation_id);
        }
    }

    // uploadFile()
    // {
    //     Helper.flash("Uploading file in progress..");
    //
    //     let file = this.getFileFromInput();
    //     let hash = Helper.guid();
    //
    //     this.fileTransfer.startSending(file, hash);
    // }
    //
    // getFileFromInput()
    // {
    //     return this.conversation.DOM.header.$file_input[0].files[0];
    // }
}

export {ConversationFull}


