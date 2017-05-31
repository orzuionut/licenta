'use strict';

const Event = use('Event');
const co = use('co');

const participantsIDsArray = [];

module.exports = function (io)
{
    io.on('connection', function (socket) 
    {
        socket.on('create or join', function (data) 
        {
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
    });

};

function findClientsSocket(io, roomId)
{
    var res = [];

    for (var id in io.connected)
    {
        if (roomId)
        {
            var index = Object.keys(io.connected[id].rooms).indexOf(roomId);

            if (index !== -1)
                res.push(io.connected[id]);
        }
        else
            res.push(io.connected[id]);
    }

    return res.length;
}