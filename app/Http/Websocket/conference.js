'use strict'

const kurento = use('kurento-client');

const UserRegistry = require('../../Services/user-registry.js');
const UserSession = require('../../Services/user-session.js');

const ws_uri = "ws://localhost:8888/kurento";

// store global variables
const userRegistry = new UserRegistry();

let rooms = {};

let kurentoClient = null;


module.exports = function (io) {

    io.on('connection', function (socket) {
        let userList = '';
        for (let userId in userRegistry.usersById) {
            userList += ' ' + userId + ',';
        }

        console.log("SERVER:" + 'receive new client : ' + socket.id + '. Currently have : ' + userList);

        socket.emit('id', socket.id);

        socket.on('error', function (data) {
            console.log("SERVER:" + 'Connection: ' + socket.id + ' error : ' + data);

            leaveRoom(socket.id, function () {

            });
        });

        socket.on('disconnect', function (data) {
            console.log("SERVER:" + 'Connection: ' + socket.id + ' disconnect : ' + data);

            leaveRoom(socket.id, function () {

            });
        });

        socket.on('message', function (message) {
            console.log("SERVER:" + 'Connection: ' + socket.id + ' receive message: ' + message.id);

            switch (message.id) {
                case 'joinRoom':
                    joinRoom(socket, message.room, function () {
                        console.log("SERVER:" + "ERROR HAPPENED");
                    });
                    break;
                case 'receiveVideoFrom':
                    console.log("SERVER:" + socket.id + ' receiveVideoFrom : ' + message.sender);

                    receiveVideoFrom(socket, message.sender, message.sdpOffer, function () {

                    });
                    break;
                case 'leaveRoom':
                    console.log("SERVER:" + socket.id + ' leaveRoom');

                    leaveRoom(socket);
                    break;
                case 'onIceCandidate':
                    addIceCandidate(socket, message);
                    break;
                default:
                    socket.emit({
                        id: 'error',
                        message: 'Invalid message ' + message
                    });
            }
        });
    });

}


function joinRoom(socket, roomName, callback) {
    getRoom(roomName, function (error, room) {
        if (error) {
            callback(error);
        }

        join(socket, room, function (error, user) {
            console.log("SERVER:" + 'Join success for user with id: ' + user.id);
        });
    });
}

function getRoom(roomName, callback) {
    var room = rooms[roomName];

    if (room == null) {
        console.log("SERVER:" + 'create new room : ' + roomName);

        getKurentoClient(function (error, kurentoClient) {
            if (error) {
                return callback(error);
            }

            // create pipeline
            kurentoClient.create('MediaPipeline', function (error, pipeline) {
                if (error) {
                    return callback(error);
                }

                console.log("SERVER:" + "Creating new MediaPipeline for newly created room");

                room = {
                    name: roomName,
                    pipeline: pipeline,
                    participants: {}
                };

                rooms[roomName] = room;

                callback(null, room);
            });
        });
    } else {
        console.log("SERVER:" + 'Get existing room : ' + roomName);

        callback(null, room);
    }
}

function join(socket, room, callback) {
    console.log("SERVER:" + "New user is joining the room");

    // create user session
    var userSession = new UserSession(socket.id, socket, room.name);

    room.pipeline.create('WebRtcEndpoint', function (error, outgoingMedia) {
        if (error) {
            console.error('no participant in room');

            // no participants in room yet release pipeline
            if (Object.keys(room.participants).length == 0) {
                room.pipeline.release();
            }

            return callback(error);
        }

        userSession.outgoingMedia = outgoingMedia;
        console.log("SERVER:" + "outgoing media:", outgoingMedia);

        // add ice candidate the get sent before endpoint is established
        var iceCandidateQueue = userSession.iceCandidateQueue[socket.id];
        console.log("SERVER:" + "iceCandidateQueue: ", iceCandidateQueue);

        if (iceCandidateQueue) {
            while (iceCandidateQueue.length) {
                var message = iceCandidateQueue.shift();

                console.error('User : ' + userSession.id + ' collect candidate for outgoing media');

                userSession.outgoingMedia.addIceCandidate(message.candidate);
            }
        }

        userSession.outgoingMedia.on('OnIceCandidate', function (event) {
            console.log("SERVER:" + "Generate outgoing candidate : " + userSession.id);

            var candidate = kurento.register.complexTypes.IceCandidate(event.candidate);

            userSession.sendMessage({
                id: 'iceCandidate',
                sessionId: userSession.id,
                candidate: candidate
            });
        });

        // notify other users that new user is joining
        var usersInRoom = room.participants;
        var data = {
            id: 'newParticipantArrived',
            new_user_id: userSession.id
        };

        // Notify the Participants in the room that a new Participant arrived and get it's media
        for (var i in usersInRoom) {
            usersInRoom[i].sendMessage(data);
        }

        var existingUserIds = [];
        for (var i in room.participants) {
            existingUserIds.push(usersInRoom[i].id);
        }

        // Send list of current room Participants to current Participant and get their media
        userSession.sendMessage({
            id: 'existingParticipants',
            data: existingUserIds,
            roomName: room.name
        });

        // Register current Participant to room
        room.participants[userSession.id] = userSession;

        // Register Participant (user) in system
        userRegistry.register(userSession);

        callback(null, userSession);
    });
}

function receiveVideoFrom(socket, senderId, sdpOffer, callback) {
    var userSession = userRegistry.getById(socket.id);
    var sender = userRegistry.getById(senderId);

    getEndpointForUser(userSession, sender, function (error, endpoint) {
        if (error) {
            callback(error);
        }

        endpoint.processOffer(sdpOffer, function (error, sdpAnswer) {
            console.log("SERVER:" + "process offer from : " + senderId + " to " + userSession.id);

            if (error) {
                return callback(error);
            }

            var data = {
                id: 'receiveVideoAnswer',
                sessionId: sender.id,
                sdpAnswer: sdpAnswer
            };

            userSession.sendMessage(data);

            endpoint.gatherCandidates(function (error) {
                if (error) {
                    return callback(error);
                }
            });
            return callback(null, sdpAnswer);
        });
    });
}

function getEndpointForUser(userSession, sender, callback) {
    // request for self media
    if (userSession.id === sender.id) {
        callback(null, userSession.outgoingMedia);
        return;
    }

    var incoming = userSession.incomingMedia[sender.id];
    if (incoming == null) {
        console.log("SERVER:" + 'user : ' + userSession.id + ' create endpoint to receive video from : ' + sender.id);
        getRoom(userSession.roomName, function (error, room) {
            if (error) {
                return callback(error);
            }

            room.pipeline.create('WebRtcEndpoint', function (error, incomingMedia) {
                if (error) {
                    // no participants in room yet release pipeline
                    if (Object.keys(room.participants).length == 0) {
                        room.pipeline.release();
                    }
                    return callback(error);
                }
                console.log("SERVER:" + 'user : ' + userSession.id + ' successfully create pipeline');
                userSession.incomingMedia[sender.id] = incomingMedia;

                // add ice candidate the get sent before endpoint is established
                var iceCandidateQueue = userSession.iceCandidateQueue[sender.id];
                if (iceCandidateQueue) {
                    while (iceCandidateQueue.length) {
                        var message = iceCandidateQueue.shift();
                        console.log("SERVER:" + 'user : ' + userSession.id + ' collect candidate for : ' + message.data.sender);
                        incomingMedia.addIceCandidate(message.candidate);
                    }
                }

                incomingMedia.on('OnIceCandidate', function (event) {
                    console.log("SERVER:" + "generate incoming media candidate : " + userSession.id + " from " + sender.id);
                    var candidate = kurento.register.complexTypes.IceCandidate(event.candidate);
                    userSession.sendMessage({
                        id: 'iceCandidate',
                        sessionId: sender.id,
                        candidate: candidate
                    });
                });
                sender.outgoingMedia.connect(incomingMedia, function (error) {
                    if (error) {
                        callback(error);
                    }
                    callback(null, incomingMedia);
                });

            });
        });
    } else {
        console.log("SERVER:" + 'user : ' + userSession.id + ' get existing endpoint to receive video from : ' + sender.id);
        sender.outgoingMedia.connect(incoming, function (error) {
            if (error) {
                callback(error);
            }
            callback(null, incoming);
        });
    }
}

function leaveRoom(sessionId, callback) {
    var userSession = userRegistry.getById(sessionId);

    if (!userSession) {
        return;
    }

    var room = rooms[userSession.roomName];

    console.log("SERVER:" + 'notify all user that ' + userSession.id + ' is leaving the room ' + room.name);

    var usersInRoom = room.participants;
    delete usersInRoom[userSession.id];

    userSession.outgoingMedia.release();
    // release incoming media for the leaving user
    for (var i in userSession.incomingMedia) {
        userSession.incomingMedia[i].release();
        delete userSession.incomingMedia[i];
    }

    var data = {
        id: 'participantLeft',
        sessionId: userSession.id
    };
    for (var i in usersInRoom) {
        var user = usersInRoom[i];
        // release viewer from this
        user.incomingMedia[userSession.id].release();
        delete user.incomingMedia[userSession.id];

        // notify all user in the room
        user.sendMessage(data);
    }
    stop(userSession.id);
}

function stop(sessionId) {
    userRegistry.unregister(sessionId);
}

function addIceCandidate(socket, message) {

    var user = userRegistry.getById(socket.id);
    if (user != null) {
        // assign type to IceCandidate
        var candidate = kurento.register.complexTypes.IceCandidate(message.candidate);
        user.addIceCandidate(message, candidate);
    } else {
        console.error('ice candidate with no user receive : ' + socket.id);
    }
}

function getKurentoClient(callback) {
    if (kurentoClient !== null) {
        return callback(null, kurentoClient);
    }

    kurento(ws_uri, function (error, _kurentoClient) {
        if (error) {
            var message = 'Could not find media server at address ' + ws_uri;
            return callback(message + ". Exiting with error " + error);
        }

        console.log("SERVER:" + "Initialized kurentoClient");

        kurentoClient = _kurentoClient;
        callback(null, kurentoClient);
    });
}