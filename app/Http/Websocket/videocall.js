'use strict'

module.exports = function (io) {

    var numClients = -1;

    // const namespace = '/videocall';
    // io = io.of(namespace);

    // Let's start managing connections...
    io.on('connection', function (socket) {

        // Handle 'message' messages
        socket.on('message', function (message) {
            log('S --> got message: ', message);

            // channel-only broadcast...
            socket.broadcast.to(message.channel).emit('message', message);
        });

        // Handle 'create or join' messages
        socket.on('create or join', function (room) {

            // var numClients = findClientsSocket(io, room);
            numClients++;

            log('S --> Room ' + room + ' has ' + numClients + ' client(s)');
            log('S --> Request to create or join room', room);

            // First client joining...
            if (numClients == 0){
                socket.join(room);
                socket.emit('created', room);
            } else if (numClients == 1) {
                // Second client joining...
                io.in(room).emit('join', room);
                socket.join(room);
                socket.emit('joined', room);
            } else { // max two clients
                socket.emit('full', room);
            }
        });

        function log(){
            var array = [">>> "];
            for (var i = 0; i < arguments.length; i++) {
                array.push(arguments[i]);
            }
            socket.emit('log', array);
        }
    });

}

function findClientsSocket(io, roomId) {
    var res = [];

    if (io) {
        for (var id in io.connected) {
            if(roomId) {
                // console.log(io.connected[id]);

                var index = Object.keys(io.connected[id].rooms).indexOf(roomId);
                if(index !== -1) {
                    res.push(io.connected[id]);
                }
            } else {
                res.push(io.connected[id]);
            }
        }
    }

    return res.length;
}