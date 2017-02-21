import { Conversation } from './conversation';
import { ConversationsList } from './conversations_list';

import { ConversationDOM } from './dom';
import { Header } from './header';
import { Body } from './body';
import { Footer } from './footer';

import { SocketIO } from '../modules/socket';


$(document).ready(function(){

    const ENTER_KEY = 13;

    
    function build()
    {
        // Side-menu list of conversations
        let conversations_list = new ConversationsList($(".conversation-item"));

        // Main chat-box
        let header = new Header($('#conversation-voice'), $('#conversation-video'), $('#conversation-profile'));
        let body = new Body($('.conversation-body'));
        let footer = new Footer($('#enter-message'), $('#submit-message'));

        let DOM = new ConversationDOM(header, body, footer);
  
        let conversation = new Conversation(DOM, conversation_id, user_id);

        let data = {};

        let socketIO = new SocketIO(io, 'http://localhost:8181/chat');

        if(socketIO.socket === undefined)
        {
            //show modal alert ERROR and EXIT
        }

        socketIO.setRoom(conversation.id);

        socketIO.sendMessage('init', data);

        /**
         *  SocketIO listeners
         */
        socketIO.socket.on('init', function(data){
            conversation.DOM.body.appendMessagesArray(data, conversation.user_id);
        });   

        // Received message from server. Only non-sender type of clients receive this.
        socketIO.socket.on('output', function(data){
            conversation.DOM.body.appendMessagesArray(data, conversation.user_id);
        });

        socketIO.socket.on('call', function(data){
            conversation.DOM.header.showIncomingCallAlert();
        });

        /**
         *  DOM listeners
         */
        conversation.DOM.footer.$submit_button.on('click', function(){

            let message = conversation.DOM.footer.getMessage();
            conversation.messageSubmitted(message);

            data = {
                user_id: conversation.user_id,
                message: message,
                user_name: user_name,
                conversation_id: conversation.id
            };
            socketIO.sendMessage('input', data);
        });

        conversation.DOM.footer.$message_input.keypress(function(e){
            if(e.which == ENTER_KEY){
                conversation.DOM.footer.clickSubmitButton();
            }
        });

        // Match all anchor tags with id like :conversation-id-{number}:
        conversations_list.item.click(function(){
            let old_conversation_id = conversation.id;
            let new_conversation_id = conversations_list.getItemID(this);

            // Conversation changed. Update stuff
            if(old_conversation_id !== new_conversation_id)
            {
                conversation.DOM.body.clear();

                conversation.setID(new_conversation_id);

                socketIO.setRoom(new_conversation_id);

                data.leaveRoom = old_conversation_id;
                socketIO.sendMessage('roomChanged', data);

                socketIO.sendMessage('init', data);        
            }
        });

        conversation.DOM.header.$video_button.click(function(){
            data = {};
            socketIO.sendMessage('call', data);

            window.location.href = "/conversation/call/" + conversation.id;
        });

        conversation.DOM.header.$answer_call.click(function(){
            window.location.href = "/conversation/call/" + conversation.id;
        });

        conversation.DOM.header.$reject_call.click(function(){
            conversation.DOM.header.hideIncomingCallAlert();
        });
    }

    
    build();

});


