$(document).ready(function(){

    const ENTER_KEY = 13;

    class Conversation {

        constructor(DOM, id, user_id)
        {
            this.DOM = DOM;

            this.id = id;
            this.user_id = user_id;
        }

        setID(id)
        {
            this.id = id;
        }

        messageSubmitted(message)
        {
            let data = {
                user_id: this.user_id,
                message: message
            };

            this.DOM.body.appendMessage(data, this.user_id);

            this.DOM.footer.clearInput();
        }
    }

    class ConversationDOM {

        constructor(header, body, footer)
        {
            this.header = header;
            this.body = body;
            this.footer = footer;
        }
    }

    class Message {

        constructor(data, type)
        {
            return this.create(data.message, type);
        }

        create(message, type)
        {
            return $(`<div class='message-box ${type}'>` + message + "</div>");
        }

        static createEmitter(emitter)
        {
            return $("<div class='message-emitter'>" + emitter + "</div>");        
        }
  
    }

    class Header {

        constructor($voice_button, $video_button, $profile_button)
        {
            this.$voice_button = $voice_button;
            this.$video_button = $video_button;
            this.$profile_button = $profile_button;

            this.$incoming_call_alert = $('#conversation-header-alert');
            this.$answer_call = $("#call-answer");
            this.$reject_call = $("#call-reject");
        }

        showIncomingCallAlert()
        {
            this.$incoming_call_alert.css('display', 'flex');
        }

        hideIncomingCallAlert()
        {
            this.$incoming_call_alert.css('display', 'none');
        }

    }

    class Body{

        constructor($box)
        {
            this.$box = $box;
        }

        appendMessagesArray(data, current_user_id)
        {
            for(let i = 0; i < data.length; i++)
            {
                this.appendMessage(data[i], current_user_id);
            }
        }

        appendMessage(data, current_user_id)
        {
            let is_current_user = data.user_id === current_user_id;
            let type = is_current_user ? 'message-user' : 'message-other';

            if(! is_current_user)
            {
                let $emitter = Message.createEmitter(data.user_name);

                this.append($emitter); 
            }

            this.append(new Message(data, type));
        }

        append($element)
        {
            this.$box.append($element);

            this.scrollToBottom();
        }

        scrollToBottom()
        {
            this.$box.scrollTop(this.$box[0].scrollHeight);
        }

        clear()
        {
            this.$box.empty();
        }

    }

    class Footer{

        constructor($message_input, $submit_button)
        {
            this.$message_input = $message_input;
            this.$submit_button = $submit_button;
        }

        clearInput()
        {
            this.$message_input.val("");
        }

        clickSubmitButton()
        {
            this.$submit_button.click();
        }

        getMessage()
        {
            return this.$message_input.val();
        }
    }

    class ConversationsList {

        constructor($element)
        {
            this.item = $element;
        }

        getItemID(item)
        {
            const element = $(item).find("div[id^='conversation-id-']")[0];
            const id = $(element).attr('id');

            return id.substring(id.lastIndexOf("-") + 1);
        }
    }


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


