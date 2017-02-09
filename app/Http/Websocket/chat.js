'use strict'

const Message = use('App/Model/Message')


module.exports = function (io) {

    io.on('connection', function (socket) {

        var sendStatus = function (statusMsg) {
                socket.emit('status', statusMsg);
            };

        // const messages =     

        //Display all the messages from MongoDB
        col.find().limit(100).sort({_id: 1}).toArray(function (err, res) {
            if (err) throw err;
            socket.emit('output', res);
        });

        socket.on('input', function (data) {
            var name = data.name,
                message = data.message,
                whitespacePattern = /^\s*$/;

            if (whitespacePattern.test(name) || whitespacePattern.test(message)) {
                console.log("Not inserted");
                sendStatus('Name and message is required');
            } else {
                col.insert({name: name, message: message}, function () {
                    //Emit latest messages to all clients
                    io.emit('output', [data]);

                    sendStatus({
                        message: "Message sent",
                        clear: true
                    });
                });
            }
        });

    });
}
