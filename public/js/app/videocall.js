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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
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
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Videocall = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _indexedDB = __webpack_require__(15);

var _dom = __webpack_require__(16);

var _peer_connection = __webpack_require__(17);

var _helper = __webpack_require__(14);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Videocall = function () {
    function Videocall() {
        _classCallCheck(this, Videocall);

        this.DOM = new _dom.VideocallDOM();

        this.nav = navigator;

        this.nav.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

        window.onbeforeunload = function (e) {
            this.hangup();
        }.bind(this);

        this.sendChannel = null;
        this.receiveChannel = null;

        this.DOM.$sendButton.on('click', this.sendFileToPeer.bind(this));

        this.isChannelReady = false;
        this.isInitiator = false;
        this.isStarted = false;

        //WebRTC data structures
        //Streams
        this.localStream = null;
        this.remoteStream = null;

        this.room = getIDfromURL();

        this.socket = io.connect('http://localhost:8181/videocall');

        //////////////////////////////////////////
        this.db = new _indexedDB.DB();

        this.arrayToStoreChunks = [];
        this.receivedDataSize = 0;
        this.temporaryDataSize = 0;
        this.lastPositionSavedInArray = 0;
        this.chunkSizeLimit = 992000; // save chunks of ~ 1 MB to DB (62 slices of 16KB received)
        this.uuid = _helper.Helper.guid();

        /////////////////////////////////////////////////
        this.bindDOMListeners();
    }

    _createClass(Videocall, [{
        key: 'build',
        value: function build() {
            if (this.room !== '') {
                var data = {
                    room: this.room,
                    user_id: user_id
                };
                this.socket.emit('create or join', data);
            }

            var constraints = {
                video: true,
                audio: true
            };

            this.nav.getUserMedia(constraints, this.handleUserMedia.bind(this), this.handleUserMediaError);
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var self = this;

            this.socket.on('created', function (room) {
                self.isInitiator = true;
            });

            this.socket.on('full', function (room) {
                console.log('Room ' + room + ' is full');
            });

            // Other peer joined
            this.socket.on('join', function (room) {
                self.isChannelReady = true;

                self.DOM.updateVideoElementsCallRunning();
            });

            // This peer joined
            this.socket.on('joined', function (room) {
                self.isChannelReady = true;

                self.DOM.updateVideoElementsCallRunning();
            });

            this.socket.on('message', function (message) {

                if (message.message == 'got user media') {
                    self.checkAndStart();
                } else if (message.message === 'bye' && self.isStarted) {
                    self.handleRemoteHangup(message);
                } else if (message.sd && message.sd.type === 'offer') {
                    if (!self.isInitiator && !self.isStarted) {
                        self.checkAndStart();
                    }

                    self.peerConnection.setRemoteDescription(message.sd);

                    self.peerConnection.doAnswer();
                } else if (message.sd.type === 'answer' && self.isStarted) {
                    self.peerConnection.setRemoteDescription(message.sd);
                } else if (message.type === 'candidate' && self.isStarted) {
                    self.peerConnection.addIceCandidate(message.label, message.candidate);
                }
            });

            this.socket.on('download file', this.handleFileDownload.bind(this));
            this.socket.on('download finished', this.handleFileDownloadFinished.bind(this));
        }
    }, {
        key: 'bindListeners',
        value: function bindListeners() {
            var REMOTE_STREAM_ADDED = 'remote stream added';

            var HANDLE_DATA_CHANNEL_MESSAGE = 'handle data channel message';
            var HANDLE_DATA_CHANNEL_OPEN = 'handle data channel open';
            var HANDLE_DATA_CHANNEL_CLOSE = 'handle data channel close';

            PubSub.subscribe(REMOTE_STREAM_ADDED, this.handleRemoteStreamAdded.bind(this));

            PubSub.subscribe(HANDLE_DATA_CHANNEL_MESSAGE, this.handleDataChannelMessage.bind(this));
            PubSub.subscribe(HANDLE_DATA_CHANNEL_OPEN, this.handleDataChannelOpen.bind(this));
            PubSub.subscribe(HANDLE_DATA_CHANNEL_CLOSE, this.handleDataChannelClose.bind(this));
        }
    }, {
        key: 'bindDOMListeners',
        value: function bindDOMListeners() {
            var self = this;
            this.DOM.$files.on('click', this.target, self.handleFileDownloadResume.bind(self));

            this.DOM.$showFilesButton.on('click', self.DOM.handleShowFilesButtonClicked.bind(self.DOM));
            this.DOM.$hideFilesButton.on('click', self.DOM.handleHideFilesButtonClicked.bind(self.DOM));

            this.DOM.$inputFile.on('change', this, self.DOM.handleFileInputChanged.bind(self.DOM));
        }
    }, {
        key: 'handleRemoteStreamAdded',
        value: function handleRemoteStreamAdded(message, event) {
            attachMediaStream(this.DOM.remoteVideo, event.stream);

            this.remoteStream = event.stream;
        }
    }, {
        key: 'handleDataChannelOpen',
        value: function handleDataChannelOpen(message, readyState) {
            if (readyState == 'open') {
                // enable DOM buttons
            } else {
                    // disable DOM buttons
                }
        }
    }, {
        key: 'handleDataChannelMessage',
        value: function handleDataChannelMessage(message, event) {
            var data = event.data;

            if (typeof data !== 'string') {
                this.arrayToStoreChunks.push(data);

                this.temporaryDataSize += data.byteLength;

                if (this.temporaryDataSize == this.chunkSizeLimit) {
                    var temporaryDataArray = this.arrayToStoreChunks.slice(this.lastPositionSavedInArray);

                    this.storeTemporaryData({ data: temporaryDataArray, hash: this.uuid });

                    this.receivedDataSize += this.temporaryDataSize;
                    this.temporaryDataSize = 0;
                    this.lastPositionSavedInArray = this.arrayToStoreChunks.length;
                }
            } else {
                data = JSON.parse(data);

                this.saveToDisk(this.arrayToStoreChunks, data.fileName);

                this.deleteTemporaryData(this.uuid);

                this.arrayToStoreChunks = [];
                this.receivedDataSize = 0;
            }
        }
    }, {
        key: 'saveToDisk',
        value: function saveToDisk(array, fileName) {
            var received = new window.Blob(array);

            var $fileLink = $('<a/>', {
                text: fileName,
                href: URL.createObjectURL(received),
                target: '_blank',
                download: fileName,
                class: 'single-file file-bubble file-bubble-download',
                id: 'auto-download'
            });

            var $el = $('#files-container');

            $el.append($fileLink);
        }
    }, {
        key: 'handleDataChannelClose',
        value: function handleDataChannelClose(message) {
            // disable buttons
        }
    }, {
        key: 'handleUserMedia',
        value: function handleUserMedia(stream) {
            this.localStream = stream;
            attachMediaStream(this.DOM.localVideo, stream);

            this.sendMessage({
                message: 'got user media',
                channel: this.room
            });

            if (this.isInitiator) {
                this.checkAndStart();
            }
        }
    }, {
        key: 'handleUserMediaError',
        value: function handleUserMediaError(error) {
            console.log('navigator.getUserMedia error: ', error);
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage(message) {
            this.socket.emit('message', message);
        }

        // TODO: refactor

    }, {
        key: 'sendMessageWithType',
        value: function sendMessageWithType(type, message) {
            this.socket.emit(type, message);
        }

        // Channel negotiation trigger function

    }, {
        key: 'checkAndStart',
        value: function checkAndStart() {
            if (!this.isStarted && typeof this.localStream != 'undefined' && this.isChannelReady) {
                this.peerConnection = new _peer_connection.PeerConnection(this.isInitiator, this.localStream, this.socket);

                this.isStarted = true;

                if (this.isInitiator) {
                    this.peerConnection.doCall();
                }
            }
        }
    }, {
        key: 'storeTemporaryData',
        value: function storeTemporaryData(data) {
            return this.db.insert(data);
        }
    }, {
        key: 'deleteTemporaryData',
        value: function deleteTemporaryData(hash) {
            this.db.deleteByHash(hash);
        }
    }, {
        key: 'getChunksByHash',
        value: function getChunksByHash(hash) {
            return this.db.getByHash(hash);
        }
    }, {
        key: 'sendFileToPeer',
        value: function sendFileToPeer() {
            Materialize.toast('Sending file to the other peer..', 4000);

            this.file = this.getFileFromInput();

            this.chunkSize = 16000;
            this.channelOpen = true;

            this.reader = new window.FileReader();
            this.reader.onload = this.onReadAsArrayBuffer.bind(this);

            this.sliceFile(0);
        }
    }, {
        key: 'sliceFile',
        value: function sliceFile(offset) {
            this.offset = offset;

            if (this.channelOpen) {
                var slice = this.file.slice(offset, offset + this.chunkSize);
                this.reader.readAsArrayBuffer(slice);
            } else {
                console.log("Exception.. channel closed..");
            }
        }
    }, {
        key: 'onReadAsArrayBuffer',
        value: function onReadAsArrayBuffer(event) {
            var data = event.target.result;

            this.sendThroughDataChannel(data);

            if (this.file.size > this.offset + data.byteLength) {
                window.setTimeout(this.sliceFile.bind(this), 100, this.offset + this.chunkSize);
            } else {
                var _data = { fileName: this.file.name };
                this.sendThroughDataChannel(JSON.stringify(_data));

                delete this.reader;
            }
        }
    }, {
        key: 'sendThroughDataChannel',
        value: function sendThroughDataChannel(data) {
            if (this.channelOpen) {
                try {
                    if (this.isInitiator) {
                        this.peerConnection.sendChannel.send(data);
                    } else {
                        this.peerConnection.receiveChannel.send(data);
                    }
                } catch (exception) {
                    this.channelOpen = false;
                }
            }
        }
    }, {
        key: 'getFileFromInput',
        value: function getFileFromInput() {
            return this.DOM.$dataChannelSend[0].files[0];
        }
    }, {
        key: 'hangup',
        value: function hangup() {
            var data = {};

            if (this.receivedDataSize != 0) {
                data.receivedDataSize = this.receivedDataSize;
                data.hash = this.uuid;
            }

            data.message = 'bye';
            data.channel = this.room;

            this.sendMessage(data);

            this.stop();
        }
    }, {
        key: 'handleRemoteHangup',
        value: function handleRemoteHangup(message) {
            if (message.receivedDataSize) {
                Materialize.toast("Please wait while the rest of the file is uploaded to the server..", 4000);

                console.log("I have sent " + message.receivedDataSize + " to other peer");
                console.log("Also the saved chunks of files are saved with hash: " + message.hash);

                var remainingSlicesFromFile = this.file.slice(message.receivedDataSize);

                var fileToStore = this.blobToFile(remainingSlicesFromFile, this.file.name);

                this.storeFile(fileToStore, message.hash);
            }

            this.stop();

            this.isInitiator = false;

            this.DOM.updateVideoElementsCallStopped();
            this.DOM.showFlashMessageCallStopped();
        }
    }, {
        key: 'storeFile',
        value: function storeFile(file, hash) {
            var data = {
                user_id: user_id,
                file: file,
                fileName: this.file.name,
                hash: hash
            };

            this.sendMessageWithType('store file', data);
        }
    }, {
        key: 'blobToFile',
        value: function blobToFile(blob, fileName) {
            blob.lastModifiedDate = new Date();
            blob.name = fileName;
            return blob;
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.isStarted = false;
            if (this.sendChannel) {
                this.sendChannel.close();
            }
            if (this.receiveChannel) {
                this.receiveChannel.close();
            }
            if (this.pc) {
                this.pc.close();
            }
            this.pc = null;
            // this.DOM.sendButton.disabled = true;
        }
    }, {
        key: 'handleFileDownloadResume',
        value: function handleFileDownloadResume(file) {
            Materialize.toast('Attempting to retrieve temporary data', 3000);

            // this is bind to DOM element
            this.file_id = $(file.target).attr('data-id');
            this.file_name = $.trim($(file.target).text());

            this.getChunksByHash(this.file_id).then(this.handleChunksFetchSuccess.bind(this)).catch(this.handleChunksFetchError);
        }
    }, {
        key: 'handleChunksFetchSuccess',
        value: function handleChunksFetchSuccess(chunksStored) {
            Materialize.toast('Temporary file data retrieve successfully', 3000);
            Materialize.toast('Resuming download of the rest of the file from the server', 3000);

            this.arrayChunks = this.getArrayChunksFromObject(chunksStored);

            /////////////////////////////////////////////////////////////////
            var data = {
                user_id: user_id,
                file_id: this.file_id
            };

            this.sendMessageWithType('download file', data);
        }
    }, {
        key: 'handleFileDownload',
        value: function handleFileDownload(data) {
            console.log("GOT DATA");
            this.arrayChunks.push(data.chunk);
        }
    }, {
        key: 'handleFileDownloadFinished',
        value: function handleFileDownloadFinished(data) {
            Materialize.toast('Temporary file data retrieve successfully', 3000);

            this.saveToDisk(this.arrayChunks, this.file_name);
        }

        // chunksObjects contains multiple objects that each contain data equal to an Array[62]

    }, {
        key: 'getArrayChunksFromObject',
        value: function getArrayChunksFromObject(chunksObjects) {
            var chunksArray = [];

            for (var i = 0; i < chunksObjects.length; i++) {
                chunksArray.push.apply(chunksArray, _toConsumableArray(chunksObjects[i].data));
            }

            return chunksArray;
        }
    }]);

    return Videocall;
}();

exports.Videocall = Videocall;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [{
        key: 'guid',
        value: function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    }]);

    return Helper;
}();

exports.Helper = Helper;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DB = function () {
    function DB() {
        _classCallCheck(this, DB);

        this.db = new Dexie("instant2");
        this.db.version(1).stores({
            files: '++id,data,*hash'
        });

        this.db.open();
    }

    _createClass(DB, [{
        key: 'insert',
        value: function insert(data) {
            return this.db.files.add(data);
        }
    }, {
        key: 'get',
        value: function get(id) {
            return this.db.files.where('id').equals(id).toArray();
        }
    }, {
        key: 'getByHash',
        value: function getByHash(hash) {
            return this.db.files.where('hash').equals(hash).toArray();
        }
    }, {
        key: 'getCollectionByHash',
        value: function getCollectionByHash(hash) {
            return this.db.files.where('hash').equals(hash);
        }
    }, {
        key: 'deleteByHash',
        value: function deleteByHash(hash) {
            var collection = this.getCollectionByHash(hash);
            var self = this;

            this.db.transaction('rw', this.db.files, function () {

                collection.eachPrimaryKey(function (chunk) {
                    self.db.files.delete(chunk);
                });
            }).then(function () {
                console.log("Transaction committed");
            });
        }
    }, {
        key: 'deleteAll',
        value: function deleteAll() {
            return this.db.delete();
        }
    }]);

    return DB;
}();

exports.DB = DB;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideocallDOM = function () {
    function VideocallDOM() {
        _classCallCheck(this, VideocallDOM);

        this.localVideo = document.querySelector('#localVideo');
        this.remoteVideo = document.querySelector("#remoteVideo");

        this.$dataChannelSend = $('#dataChannelSend');
        this.$sendButton = $('#send-button');
        this.$filesContainer = $('#files-container');

        this.$filesDownload = document.querySelector('#files-download');

        this.$files = $('.single-file');

        ///////////////////////////////////////////
        this.$conversationWrapper = $('.conversation-wrapper');
        this.$conversationFilesWrapper = $('.conversation-files-wrapper');
        this.$showFilesButton = $('#show-files-btn');
        this.$hideFilesButton = $('#hide-files-btn');
        this.$inputFile = $('#dataChannelSend');
        this.$inputFileLabel = $('#fileInputLabel');
    }

    _createClass(VideocallDOM, [{
        key: 'updateVideoElementsCallRunning',
        value: function updateVideoElementsCallRunning() {
            this.localVideo.classList.remove("video-fullscreen");
            this.localVideo.classList.add("video-small");

            this.remoteVideo.classList.remove("video-hidden");
            this.remoteVideo.classList.add("video-fullscreen");
        }
    }, {
        key: 'updateVideoElementsCallStopped',
        value: function updateVideoElementsCallStopped() {
            this.localVideo.classList.remove("video-small");
            this.localVideo.classList.add("video-fullscreen");

            this.remoteVideo.classList.remove("video-fullscreen");
            this.remoteVideo.classList.add("video-hidden");
        }
    }, {
        key: 'showFlashMessageCallStopped',
        value: function showFlashMessageCallStopped() {
            swal({
                title: "Video call ended!",
                imageUrl: "/img/call_ended_icon.png"
            });
        }
    }, {
        key: 'handleShowFilesButtonClicked',
        value: function handleShowFilesButtonClicked() {
            this.$conversationWrapper.css({ display: "none" });
            this.$conversationFilesWrapper.css({ display: "flex" });
        }
    }, {
        key: 'handleHideFilesButtonClicked',
        value: function handleHideFilesButtonClicked() {
            this.$conversationWrapper.css({ display: "flex" });
            this.$conversationFilesWrapper.css({ display: "none" });
        }
    }, {
        key: 'handleFileInputChanged',
        value: function handleFileInputChanged(event) {
            var fileName = null;

            if (event.target.value) fileName = event.target.value.split('\\').pop();

            if (fileName) this.$inputFileLabel.find('span').html(fileName);
        }
    }]);

    return VideocallDOM;
}();

exports.VideocallDOM = VideocallDOM;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PeerConnection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(9);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PeerConnection = function () {
    function PeerConnection(isInitiator, localStream, socket) {
        _classCallCheck(this, PeerConnection);

        this.constraints = this.getConstraints();
        this.iceServers = this.getIceServers();
        this.sdpConstraints = webrtcDetectedBrowser === 'firefox' ? { 'offerToReceiveAudio': true, 'offerToReceiveVideo': true } : { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } };

        this.socket = socket;
        this.room = getIDfromURL();

        this.create(isInitiator, localStream);
    }

    _createClass(PeerConnection, [{
        key: 'getConstraints',
        value: function getConstraints() {
            return _config.Config.getPeerConnectionConstraints();
        }
    }, {
        key: 'getIceServers',
        value: function getIceServers() {
            return _config.Config.getIceServers();
        }
    }, {
        key: 'create',
        value: function create(isInitiator, localStream) {
            try {
                this.rtcConnection = new RTCPeerConnection(this.iceServers, this.constraints);
                this.rtcConnection.addStream(localStream);
                this.rtcConnection.onicecandidate = this.handleIceCandidate.bind(this);
            } catch (e) {
                alert('Cannot create RTCPeerConnection object.');
                return;
            }

            this.rtcConnection.onaddstream = this.handleRemoteStreamAdded;
            this.rtcConnection.onremovestream = this.handleRemoteStreamRemoved;

            if (isInitiator) {
                this.createSendChannel();
            } else {
                this.rtcConnection.ondatachannel = this.gotReceiveChannel.bind(this);
            }
        }
    }, {
        key: 'createSendChannel',
        value: function createSendChannel() {
            try {
                this.sendChannel = this.rtcConnection.createDataChannel("sendDataChannel", { reliable: false });
            } catch (e) {
                alert('Failed to create data channel. ');
            }

            this.sendChannel.binaryType = 'arraybuffer';

            this.setDataChannelHandlers(this.sendChannel);
        }
    }, {
        key: 'gotReceiveChannel',
        value: function gotReceiveChannel(event) {
            this.receiveChannel = event.channel;
            this.receiveChannel.binaryType = 'arraybuffer';

            this.setDataChannelHandlers(this.receiveChannel);
        }
    }, {
        key: 'setDataChannelHandlers',
        value: function setDataChannelHandlers(dataChannel) {
            dataChannel.onopen = this.handleSendChannelOpen.bind(this, dataChannel);
            dataChannel.onmessage = this.handleMessage.bind(this);
            dataChannel.onclose = this.handleSendChannelClose;
        }
    }, {
        key: 'handleSendChannelOpen',
        value: function handleSendChannelOpen(dataChannel) {
            var HANDLE_DATA_CHANNEL_OPEN = 'handle data channel open';
            PubSub.publish(HANDLE_DATA_CHANNEL_OPEN, dataChannel.readyState);
        }
    }, {
        key: 'handleMessage',
        value: function handleMessage(event) {
            var HANDLE_DATA_CHANNEL_MESSAGE = 'handle data channel message';
            PubSub.publish(HANDLE_DATA_CHANNEL_MESSAGE, event);
        }
    }, {
        key: 'handleSendChannelClose',
        value: function handleSendChannelClose() {
            var HANDLE_DATA_CHANNEL_CLOSE = 'handle data channel close';
            PubSub.publish(HANDLE_DATA_CHANNEL_CLOSE, null);
        }
    }, {
        key: 'handleRemoteStreamAdded',
        value: function handleRemoteStreamAdded(event) {
            var REMOTE_STREAM_ADDED = 'remote stream added';
            PubSub.publish(REMOTE_STREAM_ADDED, event);
        }
    }, {
        key: 'handleRemoteStreamRemoved',
        value: function handleRemoteStreamRemoved(event) {
            var REMOTE_STREAM_REMOVED = 'remote stream removed';
            PubSub.publish(REMOTE_STREAM_REMOVED, event);
        }
    }, {
        key: 'setRemoteDescription',
        value: function setRemoteDescription(sessionDescription) {
            this.rtcConnection.setRemoteDescription(new RTCSessionDescription(sessionDescription));
        }
    }, {
        key: 'addIceCandidate',
        value: function addIceCandidate(label, candidate) {
            var iceCandidate = new RTCIceCandidate({
                sdpMLineIndex: label,
                candidate: candidate
            });

            this.rtcConnection.addIceCandidate(iceCandidate);
        }
    }, {
        key: 'doCall',
        value: function doCall() {
            this.rtcConnection.createOffer(this.setLocalAndSendMessage.bind(this), this.onSignalingError, this.sdpConstraints);
        }
    }, {
        key: 'doAnswer',
        value: function doAnswer() {
            this.rtcConnection.createAnswer(this.setLocalAndSendMessage.bind(this), this.onSignalingError, this.sdpConstraints);
        }
    }, {
        key: 'setLocalAndSendMessage',
        value: function setLocalAndSendMessage(sessionDescription) {
            this.rtcConnection.setLocalDescription(sessionDescription);

            this.sendMessage({
                sd: sessionDescription,
                channel: this.room
            });
        }
    }, {
        key: 'onSignalingError',
        value: function onSignalingError(error) {
            console.log('Failed to create signaling message: ' + error.name);
        }
    }, {
        key: 'handleIceCandidate',
        value: function handleIceCandidate(event) {
            if (event.candidate) {
                var data = {
                    type: 'candidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                    channel: this.room,
                    sd: ''
                };

                this.sendMessage(data);
            } else {
                console.log('End of candidates');
            }
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage(message) {
            this.socket.emit('message', message);
        }
    }]);

    return PeerConnection;
}();

exports.PeerConnection = PeerConnection;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _videocall = __webpack_require__(11);

var _conversation_builder = __webpack_require__(0);

$(document).ready(function () {
    var videocall = new _videocall.Videocall();

    videocall.build();

    videocall.bindEvents();

    videocall.bindListeners();

    var build = new _conversation_builder.ConversationBuilder();
});

/***/ })
/******/ ]);