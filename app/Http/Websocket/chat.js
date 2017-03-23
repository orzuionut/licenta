'use strict';

const co = use('co');

const User = use('App/Model/User');
const Conversation = use('App/Model/Conversation');
const Message = use('App/Model/Message');


module.exports = function (io) {

    io.on('connection', function (socket)
    {
        socket.on('join', function (data)
        {
            socket.join(data.room);
        });

        socket.on('roomChanged', function(data)
        {
            socket.leave(data.leaveRoom);
        });

        socket.on('init', function(data)
        {
            socket.join(data.room);

            let conversation_id = data.room;
            co(getConversationMessages(conversation_id)).then( function(messages)
            {
                sendMessageToUser(socket, data.room, messages);
            });
        });

        socket.on('input', function (data)
        {
            saveMessage(data);

            sendMessageToParticipants(socket, data.room, 'output', data);
        });

        socket.on('call', function (data)
        {
            sendMessageToParticipants(socket, data.room, 'call', data);
        });

        socket.on('file_chunk', function (data)
        {
            sendMessageToParticipants(socket, data.room, 'file_chunk', data.fileChunk);
        });

    });
};


function* getConversationMessages(conversation_id)
{
    let messages = yield getMessages(conversation_id); 

    return messages;
}

function* getMessages(conversation_id)
{
    const conversation = yield Conversation.find(conversation_id);

    const messages = yield conversation.messages().fetch();

    // Workaround to sendThroughDataChannel array to view. TODO: fix this
    const json = JSON.stringify(messages);
    let build_messages = JSON.parse(json);

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
    co(function* ()
    {
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

function sendMessageToUser(socket, room, data)
{
    socket.emit('init', data);
}

function sendMessageToParticipants(socket, room, event, data)
{
    socket.broadcast.to(room).emit(event, [data]);
}