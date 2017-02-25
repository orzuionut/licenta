'use strict';

const Event = use('Event');

const participantsIDsArray = [];

module.exports = function (io) {

    io.on('connection', function (socket) {

        socket.on('create or join', function (data) {

            var numClients = findClientsSocket(io, data.room);
            let room = data.room;

            if (numClients == 0)
            {
                socket.join(room);
                socket.emit('created', room);

                participantsIDsArray.push(data.user_id);
            }
            else if (numClients == 1)
            {
                io.in(room).emit('join', room);
                socket.join(room);
                socket.emit('joined', room);

                participantsIDsArray.push(data.user_id);
            }
            else
            {
                socket.emit('full', room);
            }
        });

        socket.on('message', function (message) {
            socket.broadcast.to(message.channel).emit('message', message);
        });

        socket.on('store file', storeFile);
    });

};

function storeFile(data)
{
    let path = data.user_id + "/" + data.fileName;
    
    let user_receiver_id = data.user_id == participantsIDsArray[0] ? participantsIDsArray[1] : participantsIDsArray[0];
    
    let info = {
        id: data.hash,
        name: data.fileName,
        user_sender_id: data.user_id,
        user_receiver_id: user_receiver_id
    };

    Event.fire('file.upload', {file: data.file, path: path});
    Event.fire('file.uploaded', info);
}

function findClientsSocket(io, roomId)
{
    var res = [];

    for (var id in io.connected)
    {
        if (roomId)
        {
            var index = Object.keys(io.connected[id].rooms).indexOf(roomId);
            if (index !== -1)
            {
                res.push(io.connected[id]);
            }

        }
        else
        {
            res.push(io.connected[id]);
        }
    }

    return res.length;
}