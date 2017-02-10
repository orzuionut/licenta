'use strict'

// 
const co = use('co');

const User = use('App/Model/User');
const Conversation = use('App/Model/Conversation');
const Message = use('App/Model/Message');


module.exports = function (io) {

    io.on('connection', function (socket) {

        socket.on('init', function(data){

            getConversationMessages(data.conversation_id).then(function(messages){
        
                sendMessageToUser(socket, messages);
            });

        });


        socket.on('input', function (data){

            // Wrapping around co, to transform into generator
            // TODO: further documentation read
            saveMessage(data);

            sendMessageToParticipants(socket, data);
        });

    });
}


//TODO: fix this mess
function getConversationMessages(conversation_id)
{
     return new Promise(function(resolve, reject) {

         co(function* (){ 
            let messages = yield getMessages(conversation_id); 
            return messages;
         }).then(function(messages){
            resolve(messages);
         }, function(error){
             reject(error);   
         });

     });
   
}

function* getMessages(conversation_id)
{
    const conversation = yield Conversation.find(conversation_id);

    const messages = yield conversation.messages().fetch();

    // Workaround to send array to view. TODO: fix this
    const json = JSON.stringify(messages)
    let build_messages = JSON.parse(json)

    for(var i = 0; i < build_messages.length; i = i + 1)
    {
        let message_user_id = build_messages[i].user_id;

        let message_user = yield User.find(message_user_id);

        build_messages[i].user_name = message_user.getFullName();
    }

    return build_messages;
}

function saveMessage(data)
{
    co(function* (){ 
        yield insertMessageIntoDB(data); 
    });
}

function* insertMessageIntoDB(data)
{
    let message = new Message();

    message.user_id = data.user_id;
    message.conversation_id = data.conversation_id;
    message.message = data.message;

    yield message.save();
}

function sendMessageToUser(socket, data)
{
    socket.emit('init', data);
}

function sendMessageToParticipants(socket, data)
{
    socket.broadcast.emit('output', [data]);
}
