'use strict'

module.exports = function (io) {

    io.on('connection', function (socket) {

        socket.on('message', function (message) {
            socket.broadcast.to(message.channel).emit('message', message);
        });

        socket.on('create or join', function (room) {

            var numClients = findClientsSocket(io, room);

            if (numClients == 0)
            {
                socket.join(room);
                socket.emit('created', room);

            } else if (numClients == 1)
            {
                io.in(room).emit('join', room);
                socket.join(room);
                socket.emit('joined', room);

            } else 
            {
                socket.emit('full', room);
            }
        });
    });

}

function findClientsSocket(io, roomId) 
{
    var res = [];

    for (var id in io.connected) 
    {
        if(roomId) 
        {
            var index = Object.keys(io.connected[id].rooms).indexOf(roomId);
            if(index !== -1)
            {
                res.push(io.connected[id]);
            }

        } else 
        {
            res.push(io.connected[id]);
        }
    }

    return res.length;
}