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

    }

    class SocketIO {

        constructor(io)
        {
            this.socket = io.connect('http://localhost:8181/chat');
        }

        sendMessage(event, data)
        {
            this.socket.emit(event, data);
        }

    }

    function init()
    {
        let conversationData = new ConversationData();
        let conversationDOM = new ConversationDOM($('.conversation-body'), $('#enter-message'), $('#submit-message'));
        let socketIO = new SocketIO(io);

        conversationData.setUserId(user_id);
        conversationData.setId(conversation_id);

        conversationDOM.setConversationData(conversationData);

        if(socketIO.socket === undefined)
        {
            //show modal alert ERROR and EXIT
        }

        // send init message with conversation_id
        let data = {
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


            data = {
                    user_id: user_id,
                    user_name: user_name,
                    conversation_id: conversation_id,
                    message: message
            };
            socketIO.sendMessage('input', data);

        });


    }

    
    init();


    //     // Received message from server. Only non-sender type of clients receive this.
    //     socket.on('output', function(data){
    //         appendReceivedMessages(data);
    //     });


    //     // Output the message and then send it to the server to broadcast it to other and save it to DB.
    //     // TODO: refactor into functions
    //     $submit_button.on('click', function(){

    //         var message = $message_input.val();

    //         clearInput($message_input);

    //         appendMessage(message, $conversation_box);

    //         updateScrollUI($conversation_box);

    //         var data = {
    //                 user_id: userID,
    //                 user_name: user_name,
    //                 conversation_id: conversationID,
    //                 message: message
    //         };

    //         emitMessage(socket, 'input', data);

    //     });

    // }

    // function appendReceivedMessages(data)
    // {
    //     if(data.length){

    //         for(var i = 0; i < data.length; i++){
    //             appendMessage(data[i].message, $conversation_box, data[i].user_name);
    //         }

    //         updateScrollUI($conversation_box);
    //     }
    // }

    // function appendMessage(message, conversation, emitter)
    // {
    //     var $message_box;

    //     if(emitter === undefined) {
    //         $message_box = $("<div class='message-box message-user'>" + message + "</div>");
    //     } else {
    //         $emmiter = $("<div class='message-emitter'>" + emitter + "</div>");

    //         conversation.append($emmiter);

    //         $message_box = $("<div class='message-box message-other'>" + message + "</div>");       
    //     }

    //     conversation.append($message_box);
    // }




    // function createMessageBox(message, $conversations_box, user_id)
    // {
    //     let $message_box;

    //     if(message.user_id == user_id)
    //     {
    //         $message_box = $("<div class='message-box message-user'>" + message.message + "</div>");

    //     } else
    //     {
    //         $message_box = $("<div class='message-box message-other'>" + message.user_name + " : " + message.message + "</div>");
    //     }
        

    //     $conversations_box.append($message_box);
    // }

    // function appendMessageUserToConversation

    // function createMessageBoxUser(message)
    // {
    //     return $("<div class='message-box message-user'>" + message + "</div>");
    // }

    // function createMessageBoxOther(message, user_name)
    // {
    //      $emmiter = $("<div class='message-emitter'>" + emitter + "</div>");

    //         conversation.append($emmiter);

    //         $message_box = $("<div class='message-box message-other'>" + message + "</div>");
    // }



});


