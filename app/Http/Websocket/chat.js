'use strict';

const fs = use('fs');
const Storage = use('Storage');

const User = use('App/Model/User');
const Conversation = use('App/Model/Conversation');
const Message = use('App/Model/Message');
const CompleteFile = use('App/Model/CompleteFile');

const co = use('co');
const webTorrent = use('webtorrent-hybrid');
const webTorrentClient = new webTorrent();

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

        socket.on('call', function (data)
        {
            sendMessageToParticipants(socket, data.room, 'call', data);
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


        // socket.on('file_chunk', function (data)
        // {
        //     console.log("GOT CHYUNK");
        //
        //     sendMessageToParticipants(socket, data.room, 'file_chunk', data);
        // });
        //
        // socket.on('get_conversation_complete_files', function (data)
        // {
        //     let conversation_id = data.room;
        //     co(getConversationCompleteFiles(conversation_id)).then( function(files)
        //     {
        //         sendMessageToUser(socket, 'conversation_complete_files_retrived', files);
        //     });
        // });
        //
        // socket.on('get_conversation_partial_files', function (data)
        // {
        //     let conversation_id = data.room;
        //     co(getConversationPartialFiles(conversation_id)).then( function(files)
        //     {
        //         sendMessageToUser(socket, 'conversation_partial_files_retrived', files);
        //     });
        // });
        //
        // socket.on('download_file', function (data)
        // {
        //     co(getFile(data.room, data.file_id)).then(function (fileBuffer)
        //     {
        //         try
        //         {
        //             webTorrentClient.seed(fileBuffer, function (torrent)
        //             {
        //                 data.torrentId = torrent.magnetURI;
        //                 sendMessageToUser(socket, 'download_file', data);
        //             });
        //         }
        //         catch(e)
        //         {
        //             console.log(e);
        //         }
        //     });
        // });

    });
};

function* getFile(conversation_id, file_id)
{
    const file = yield CompleteFile.find(file_id);

    return `/vagrant/storage/${conversation_id}/${file.name}${file.hash}`;
}


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

function* getConversationCompleteFiles (conversation_id)
{
    let files = yield getCompleteFiles(conversation_id);

    return files;
}

function* getCompleteFiles(conversation_id)
{
    const conversation = yield Conversation
        .query()
        .with('completeFiles.user')
        .where('id', conversation_id)
        .first();

    return conversation.toJSON().completeFiles;
}

function* getConversationPartialFiles (conversation_id)
{
    let files = yield getPartialFiles(conversation_id);

    return files;
}

function* getPartialFiles(conversation_id)
{
    const conversation = yield Conversation
        .query()
        .with('partialFiles.user')
        .where('id', conversation_id)
        .first();

    return conversation.toJSON().partialFiles;
}

function sendMessageToUser(socket, message, data)
{
    socket.emit(message, data);
}

function sendMessageToParticipants(socket, room, event, data)
{
    socket.broadcast.to(room).emit(event, [data]);
}