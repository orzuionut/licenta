'use strict';

const User = use('App/Model/User');
const Conversation = use('App/Model/Conversation');
const Message = use('App/Model/Message');

const co = use('co');

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
                sendMessageToUser(socket, 'init', messages);
            });
        });

        socket.on('input', function (data)
        {
            saveMessage(data);

            sendMessageToParticipants(socket, data.room, 'output', data);
        });

        socket.on('voice', function (data)
        {
            sendMessageToParticipants(socket, data.room, 'voice', data);
        });

        socket.on('call', function (data)
        {
            sendMessageToParticipants(socket, data.room, 'call', data);
        });

        socket.on('cinema', function (data)
        {
            sendMessageToParticipants(socket, data.room, 'cinema', data);
        });

        socket.on('play_film', function (data)
        {
            sendMessageToParticipants(socket, data.room, 'play_film', data);
        });

        socket.on('play_button_pressed', function (data)
        {
            sendMessageToParticipants(socket, data.room, 'play_button_pressed', data);
        });

        socket.on('pause_button_pressed', function (data)
        {
            sendMessageToParticipants(socket, data.room, 'pause_button_pressed', data);
        });

        socket.on('new_file', function (data)
        {
            sendMessageToParticipants(socket, data.room, 'new_file', data);
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
    const conversation = yield Conversation
        .query()
        .with('messages.user')
        .where('id', conversation_id)
        .first();

    return conversation.toJSON().messages;
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

function sendMessageToUser(socket, message, data)
{
    socket.emit(message, data);
}

function sendMessageToParticipants(socket, room, event, data)
{
    socket.broadcast.to(room).emit(event, [data]);
}