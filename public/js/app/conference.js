/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketIO = function () {
    function SocketIO(io, url) {
        _classCallCheck(this, SocketIO);

        this.socket = io.connect(url);
    }

    _createClass(SocketIO, [{
        key: "sendMessage",
        value: function sendMessage(event, data) {
            // Add the room to the message
            data.room = this.room;

            this.socket.emit(event, data);
        }
    }, {
        key: "setRoom",
        value: function setRoom(room) {
            this.room = room;
        }
    }]);

    return SocketIO;
}();

exports.SocketIO = SocketIO;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function () {
    function Config() {
        _classCallCheck(this, Config);
    }

    _createClass(Config, null, [{
        key: "getIceServers",
        value: function getIceServers() {
            return {
                iceServers: [{
                    urls: "stun:stun.l.google.com:19302"
                }, {
                    urls: "stun:stun1.l.google.com:19302"
                }, {
                    urls: "stun:stun.voxgratia.org"
                }, {
                    urls: "turn:numb.viagenie.ca",
                    username: "darkstyle6196@gmail.com",
                    credential: "nonney06011996"
                }]
            };
        }
    }, {
        key: "getPeerConnectionConstraints",
        value: function getPeerConnectionConstraints() {
            return {
                optional: [{
                    DtlsSrtpKeyAgreement: true
                }]
            };
        }
    }]);

    return Config;
}();

exports.Config = Config;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Conference = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(10);

var _config = __webpack_require__(1);

var _participants = __webpack_require__(11);

var _socket = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conference = function () {
    function Conference() {
        _classCallCheck(this, Conference);

        this.id = getIDfromURL();

        this.socketIO = new _socket.SocketIO(io, 'http://localhost:8181');

        this.socketIO.setRoom(this.id);
    }

    _createClass(Conference, [{
        key: 'init',
        value: function init() {
            var data = {
                id: "joinRoom"
            };
            this.sendMessage(data);
        }
    }, {
        key: 'listen',
        value: function listen() {
            this.sessionId = null;
            this.participants = {};

            this.iceServers = _config.Config.getIceServers();

            window.onbeforeunload = function () {
                this.socketIO.socket.disconnect();
            }.bind(this);

            this.socketIO.socket.on("id", function (id) {
                this.sessionId = id;
            }.bind(this));

            this.socketIO.socket.on("message", function (message) {

                switch (message.id) {
                    case "existingParticipants":
                        this.onExistingParticipants(message);
                        break;
                    case "newParticipantArrived":
                        this.onNewParticipant(message);
                        break;
                    case "participantLeft":
                        this.onParticipantLeft(message);
                        break;
                    case "receiveVideoAnswer":
                        this.onReceiveVideoAnswer(message);
                        break;
                    case "iceCandidate":
                        var participant = this.participants[message.sessionId];

                        if (participant != null) {
                            participant.rtcPeer.addIceCandidate(message.candidate, function (error) {
                                if (error) {
                                    if (message.sessionId === this.sessionId) {
                                        console.error("Error adding candidate to self : " + error);
                                    } else {
                                        console.error("Error adding candidate : " + error);
                                    }
                                }
                            });
                        } else {
                            console.error('still does not establish rtc peer for : ' + message.sessionId);
                        }
                        break;

                    default:
                        console.error("Unrecognized message: ", message);
                }
            }.bind(this));
        }
    }, {
        key: 'onExistingParticipants',
        value: function onExistingParticipants(message) {
            var constraints = {
                audio: true,
                video: true
            };

            // create video for current user to send to server
            var localParticipant = new _participants.Participant(this.sessionId, this.socketIO.socket);

            this.participants[this.sessionId] = localParticipant;

            var video = _dom.ConferenceDOM.createVideo(localParticipant);

            // bind function so that calling 'this' in that function will receive the current instance
            var options = {
                localVideo: video,
                mediaConstraints: constraints,
                onicecandidate: localParticipant.onIceCandidate.bind(localParticipant),
                configuration: this.iceServers
            };

            localParticipant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
                if (error) {
                    return console.error(error);
                }

                // Generate the SDP offer
                this.generateOffer(localParticipant.offerToReceiveVideo.bind(localParticipant));
            });

            // @message.data => existing Participants in the room
            for (var i in message.data) {
                this.receiveVideoFrom(message.data[i]);
            }
        }
    }, {
        key: 'receiveVideoFrom',
        value: function receiveVideoFrom(sender) {
            var participant = new _participants.Participant(sender, this.socketIO.socket);
            this.participants[sender] = participant;

            var video = _dom.ConferenceDOM.createVideo(participant);

            var options = {
                remoteVideo: video,
                onicecandidate: participant.onIceCandidate.bind(participant),
                configuration: this.iceServers
            };

            participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
                if (error) {
                    return console.error(error);
                }

                this.generateOffer(participant.offerToReceiveVideo.bind(participant));
            });
        }

        /**
         * Receive video from new participant
         * @param message
         */

    }, {
        key: 'onNewParticipant',
        value: function onNewParticipant(message) {
            this.receiveVideoFrom(message.new_user_id);
        }

        /**
         * Destroy videostream/DOM element on participant leaving room
         * @param message
         */

    }, {
        key: 'onParticipantLeft',
        value: function onParticipantLeft(message) {
            var participant = this.participants[message.sessionId];

            participant.dispose();
            delete this.participants[message.sessionId];

            // remove video tag
            $("#video-" + participant.id).remove();
        }
    }, {
        key: 'onReceiveVideoAnswer',
        value: function onReceiveVideoAnswer(message) {
            var participant = this.participants[message.sessionId];

            // Process the SDP
            participant.rtcPeer.processAnswer(message.sdpAnswer, function (error) {
                if (error) {
                    console.error(error);
                } else {
                    participant.isAnswer = true;

                    while (participant.iceCandidateQueue.length) {
                        console.error("Collected : " + participant.id + " ice candidate");

                        var candidate = participant.iceCandidateQueue.shift();
                        participant.rtcPeer.addIceCandidate(candidate);
                    }
                }
            });
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage(data) {
            this.socketIO.sendMessage('message', data);
        }
    }]);

    return Conference;
}();

exports.Conference = Conference;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConferenceDOM = function () {
    function ConferenceDOM() {
        _classCallCheck(this, ConferenceDOM);
    }

    _createClass(ConferenceDOM, null, [{
        key: 'createVideo',
        value: function createVideo(participant) {
            var videoId = "video-" + participant.id;
            var videoHtml = '<video id="' + videoId + '" autoplay height="240px"></video>';

            $("#videoList").append(videoHtml);

            return $("#" + videoId)[0];
        }
    }]);

    return ConferenceDOM;
}();

exports.ConferenceDOM = ConferenceDOM;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Participant = function () {
    function Participant(id, socket) {
        _classCallCheck(this, Participant);

        this.id = id;
        this.rtcPeer = null;
        this.iceCandidateQueue = [];
        this.socket = socket;
    }

    _createClass(Participant, [{
        key: "offerToReceiveVideo",
        value: function offerToReceiveVideo(error, offerSdp) {
            if (error) {
                return console.error("sdp offer error");
            }

            var msg = {
                id: "receiveVideoFrom",
                sender: this.id,
                sdpOffer: offerSdp
            };
            this.sendMessage(msg);

            console.log('Invoking SDP offer callback function ' + msg.sender);
        }
    }, {
        key: "onIceCandidate",
        value: function onIceCandidate(candidate) {
            var message = {
                id: 'onIceCandidate',
                candidate: candidate,
                sender: this.id
            };
            this.sendMessage(message);
        }
    }, {
        key: "dispose",
        value: function dispose() {
            this.rtcPeer.dispose();
            this.rtcPeer = null;
        }
    }, {
        key: "sendMessage",
        value: function sendMessage(message) {
            this.socket.emit('message', message);
        }
    }]);

    return Participant;
}();

exports.Participant = Participant;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _conference = __webpack_require__(2);

$(document).ready(function () {
    var conference = new _conference.Conference();

    conference.init();

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    conference.listen();
});

/***/ })
/******/ ]);