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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.ConversationBuilder = undefined;

var _conversation = __webpack_require__(2);

var _conversations_list = __webpack_require__(3);

var _dom = __webpack_require__(5);

var _header = __webpack_require__(7);

var _body = __webpack_require__(4);

var _footer = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationBuilder = function ConversationBuilder() {
        _classCallCheck(this, ConversationBuilder);

        // Side-menu list of conversations
        var conversations_list = new _conversations_list.ConversationsList($(".conversation-item"));

        // Main chat-box
        var header = new _header.Header($('#conversation-voice'), $('#conversation-video'), $('#conversation-profile'));
        var body = new _body.Body($('.conversation-body'));
        var footer = new _footer.Footer($('#enter-message'), $('#submit-message'));

        var DOM = new _dom.ConversationDOM(header, body, footer);

        var conversation = new _conversation.Conversation(DOM, conversation_id, user_id);

        conversation.init();
};

exports.ConversationBuilder = ConversationBuilder;

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Conversation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conversation = function () {
    function Conversation(DOM, id, user_id) {
        _classCallCheck(this, Conversation);

        this.DOM = DOM;

        this.id = id;
        this.user_id = user_id;
    }

    _createClass(Conversation, [{
        key: 'init',
        value: function init() {
            var self = this;

            self.ENTER_KEY = 13;

            var data = {};

            self.socketIO = new _socket.SocketIO(io, 'http://localhost:8181/chat');

            if (self.socketIO.socket === undefined) {
                //show modal alert ERROR and EXIT
            }

            self.socketIO.setRoom(self.id);

            self.socketIO.sendMessage('init', data);

            self.bindSocketListeners();
            self.bindDOMListeners();

            // // Match all anchor tags with id like :conversation-id-{number}:
            // conversations_list.item.click(function () {
            //     let old_conversation_id = conversation.id;
            //     let new_conversation_id = conversations_list.getItemID(this);
            //
            //     // Conversation changed. Update stuff
            //     if (old_conversation_id !== new_conversation_id)
            //     {
            //         conversation.DOM.body.clear();
            //
            //         conversation.setID(new_conversation_id);
            //
            //         socketIO.setRoom(new_conversation_id);
            //
            //         data.leaveRoom = old_conversation_id;
            //         socketIO.sendMessage('roomChanged', data);
            //
            //         socketIO.sendMessage('init', data);
            //     }
            // });

            // conversation.DOM.header.$video_button.click(function () {
            //     data = {};
            //     socketIO.sendMessage('call', data);
            //
            //     window.location.href = "/conversation/call/" + conversation.id;
            // });
            //
            // conversation.DOM.header.$answer_call.click(function () {
            //     window.location.href = "/conversation/call/" + conversation.id;
            // });
            //
            // conversation.DOM.header.$reject_call.click(function () {
            //     conversation.DOM.header.hideIncomingCallAlert();
            // });
        }
    }, {
        key: 'bindSocketListeners',
        value: function bindSocketListeners() {
            var self = this;

            self.socketIO.socket.on('init', function (data) {
                self.DOM.body.appendMessagesArray(data, self.user_id);
            });

            // Received message from server. Only non-sender type of clients receive this.
            self.socketIO.socket.on('output', function (data) {
                self.DOM.body.appendMessagesArray(data, self.user_id);
            });

            self.socketIO.socket.on('call', function (data) {
                self.DOM.header.showIncomingCallAlert();
            });
        }
    }, {
        key: 'bindDOMListeners',
        value: function bindDOMListeners() {
            var self = this;
            var data = {};

            self.DOM.footer.$submit_button.on('click', function () {

                var message = self.DOM.footer.getMessage();
                self.messageSubmitted(message);

                data = {
                    user_id: self.user_id,
                    message: message,
                    user_name: user_name,
                    conversation_id: self.id
                };
                self.socketIO.sendMessage('input', data);
            });

            self.DOM.footer.$message_input.keypress(function (e) {
                if (e.which == self.ENTER_KEY) {
                    self.DOM.footer.clickSubmitButton();
                }
            });
        }
    }, {
        key: 'setID',
        value: function setID(id) {
            this.id = id;
        }
    }, {
        key: 'messageSubmitted',
        value: function messageSubmitted(message) {
            var data = {
                user_id: this.user_id,
                message: message
            };

            this.DOM.body.appendMessage(data, this.user_id);

            this.DOM.footer.clearInput();
        }
    }]);

    return Conversation;
}();

exports.Conversation = Conversation;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationsList = function () {
    function ConversationsList($element) {
        _classCallCheck(this, ConversationsList);

        this.item = $element;
    }

    _createClass(ConversationsList, [{
        key: "getItemID",
        value: function getItemID(item) {
            var element = $(item).find("div[id^='conversation-id-']")[0];
            var id = $(element).attr('id');

            return id.substring(id.lastIndexOf("-") + 1);
        }
    }]);

    return ConversationsList;
}();

exports.ConversationsList = ConversationsList;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Body = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Body = function () {
    function Body($box) {
        _classCallCheck(this, Body);

        this.$box = $box;
    }

    _createClass(Body, [{
        key: 'appendMessagesArray',
        value: function appendMessagesArray(data, current_user_id) {
            for (var i = 0; i < data.length; i++) {
                this.appendMessage(data[i], current_user_id);
            }
        }
    }, {
        key: 'appendMessage',
        value: function appendMessage(data, current_user_id) {
            var is_current_user = data.user_id === current_user_id;
            var type = is_current_user ? 'message-user' : 'message-other';

            if (!is_current_user) {
                var $emitter = _message.Message.createEmitter(data.user_name);

                this.append($emitter);
            }

            this.append(new _message.Message(data, type));
        }
    }, {
        key: 'append',
        value: function append($element) {
            this.$box.append($element);

            this.scrollToBottom();
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom() {
            this.$box.scrollTop(this.$box[0].scrollHeight);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.$box.empty();
        }
    }]);

    return Body;
}();

exports.Body = Body;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationDOM = function ConversationDOM(header, body, footer) {
    _classCallCheck(this, ConversationDOM);

    this.header = header;
    this.body = body;
    this.footer = footer;
};

exports.ConversationDOM = ConversationDOM;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Footer = function () {
    function Footer($message_input, $submit_button) {
        _classCallCheck(this, Footer);

        this.$message_input = $message_input;
        this.$submit_button = $submit_button;
    }

    _createClass(Footer, [{
        key: "clearInput",
        value: function clearInput() {
            this.$message_input.val("");
        }
    }, {
        key: "clickSubmitButton",
        value: function clickSubmitButton() {
            this.$submit_button.click();
        }
    }, {
        key: "getMessage",
        value: function getMessage() {
            return this.$message_input.val();
        }
    }]);

    return Footer;
}();

exports.Footer = Footer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
    function Header($voice_button, $video_button, $profile_button) {
        _classCallCheck(this, Header);

        this.$voice_button = $voice_button;
        this.$video_button = $video_button;
        this.$profile_button = $profile_button;

        this.$incoming_call_alert = $('#conversation-header-alert');
        this.$answer_call = $("#call-answer");
        this.$reject_call = $("#call-reject");
    }

    _createClass(Header, [{
        key: "showIncomingCallAlert",
        value: function showIncomingCallAlert() {
            this.$incoming_call_alert.css('display', 'flex');
        }
    }, {
        key: "hideIncomingCallAlert",
        value: function hideIncomingCallAlert() {
            this.$incoming_call_alert.css('display', 'none');
        }
    }]);

    return Header;
}();

exports.Header = Header;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
    function Message(data, type) {
        _classCallCheck(this, Message);

        return this.create(data.message, type);
    }

    _createClass(Message, [{
        key: "create",
        value: function create(message, type) {
            return $("<div class='message-box " + type + "'>" + message + "</div>");
        }
    }], [{
        key: "createEmitter",
        value: function createEmitter(emitter) {
            return $("<div class='message-emitter'>" + emitter + "</div>");
        }
    }]);

    return Message;
}();

exports.Message = Message;

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Conference = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(12);

var _config = __webpack_require__(9);

var _participants = __webpack_require__(13);

var _socket = __webpack_require__(1);

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

            // create video for current user to sendThroughDataChannel to server
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
/* 11 */,
/* 12 */
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
            var videoHtml = '<video id="' + videoId + '" class="conference-video" autoplay muted></video>';

            $("#videos-container").append(videoHtml);

            return $("#" + videoId)[0];
        }
    }]);

    return ConferenceDOM;
}();

exports.ConferenceDOM = ConferenceDOM;

/***/ }),
/* 13 */
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
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _conference = __webpack_require__(10);

var _conversation_builder = __webpack_require__(0);

$(document).ready(function () {
    var conference = new _conference.Conference();

    conference.init();

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    conference.listen();

    var build = new _conversation_builder.ConversationBuilder();
});

/***/ })
/******/ ]);