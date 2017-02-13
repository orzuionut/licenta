$(document).ready(function(){

    class ConversationData{

        setId(conversation_id)
        {
            this.id = conversation_id;
        }

        setUserId(user_id)
        {
            this.user_id = user_id;
        }

    };

    class ConversationDOM {

        constructor($conversation_box, $message_input, $submit_button)
        {
            this.$conversation_box = $conversation_box;
            this.$message_input = $message_input;
            this.$submit_button = $submit_button;
        }

        setConversationData(conversationData)
        {
            this.conversationData = conversationData;
        }

        clearInput()
        {
            this.$message_input.val("");
        }

        appendMessagesArray(data)
        {
            for(var i = 0; i < data.length; i++)
            {
                this.appendMessage(data[i]);
            }

        }

        appendMessage(data)
        {
           var $message_box;
           var $emitter_box;

            if(data.user_id == this.conversationData.user_id)
            {
                $message_box = this.createMessageBox('message-user', data.message);
            
            } else
            {
                $message_box = this.createMessageBox('message-other', data.message);

                $emitter_box = this.createEmitterBox(data.user_name);
                this.appendToConversationBox($emitter_box);
            }

            this.appendToConversationBox($message_box);
        }

        createMessageBox(message_type, message)
        {
            return $(`<div class='message-box ${message_type}'>` + message + "</div>");
        }

        createEmitterBox(emitter)
        {
            return $("<div class='message-emitter'>" + emitter + "</div>");        
        }

        appendToConversationBox($element)
        {
            this.$conversation_box.append($element);

            this.updateScrollUI();
        }

        updateScrollUI()
        {
            this.$conversation_box.scrollTop(this.$conversation_box[0].scrollHeight);
        }

        clear()
        {
            this.$conversation_box.empty();
        }

        getConversationID(conversationDiv)
        {
            const element = $(conversationDiv).find("div[id^='conversation-id-']")[0];

            const id = $(element).attr('id');

            return id.substring(id.lastIndexOf("-") + 1);
        }


    }

    class SocketIO {

        constructor(io)
        {
            this.socket = io.connect('http://localhost:8181/chat');
        }

        sendMessage(event, data)
        {
            // Add the room to the message
            data.room = this.room;

            this.socket.emit(event, data);
        }

        setRoom(room)
        {
            this.room = room;
        }

    }

    function buildConversation()
    {
        let conversationData = new ConversationData();
        let conversationDOM = new ConversationDOM($('.conversation-body'), $('#enter-message'), $('#submit-message'));
        let socketIO = new SocketIO(io);

        let data = {};

        conversationData.setUserId(user_id);
        conversationData.setId(conversation_id);

        conversationDOM.setConversationData(conversationData);

        if(socketIO.socket === undefined)
        {
            //show modal alert ERROR and EXIT
        }

        socketIO.setRoom(conversationData.id);

        socketIO.sendMessage('room', data);


        // send init message with conversation_id
        data = {
            conversation_id: conversationData.id
        }
        socketIO.sendMessage('init', data);


        // SocketIO listeners

        socketIO.socket.on('init', function(data){
            conversationDOM.appendMessagesArray(data);
        });   


        // Received message from server. Only non-sender type of clients receive this.
        socketIO.socket.on('output', function(data){
            conversationDOM.appendMessagesArray(data);
        });

        // Submit button listener
        // Output the message and then send it to the server to broadcast it to other and save it to DB.
        // TODO: refactor into functions
        conversationDOM.$submit_button.on('click', function(){

            var message = conversationDOM.$message_input.val();

            conversationDOM.clearInput();

            data = {
                user_id: conversationData.user_id,
                message: message
            };
            conversationDOM.appendMessage(data);

            data.user_name = user_name;
            data.conversation_id = conversationData.id;

            socketIO.sendMessage('input', data);

        });


        // Match all anchor tags with id like :conversation-id-{number}:

        $(".conversation-item").click(function(){

            var old_conversation_id = conversationData.id;
            var new_conversation_id = conversationDOM.getConversationID(this);

            // Conversation changed. Update stuff
            if(old_conversation_id !== new_conversation_id)
            {
                conversationDOM.clear();

                conversationData.setId(new_conversation_id);
                conversationDOM.setConversationData(conversationData);

                socketIO.setRoom(new_conversation_id);


                data.leaveRoom = old_conversation_id;
                socketIO.sendMessage('roomChanged', data);

                // send init message with conversation_id
                data = {
                    conversation_id: conversationData.id
                }
                socketIO.sendMessage('init', data);        
            }
        });
    }

    
    buildConversation();

});


