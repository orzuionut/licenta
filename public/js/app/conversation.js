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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Body = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = __webpack_require__(12);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conversation = function () {
    function Conversation(DOM, id, user_id) {
        _classCallCheck(this, Conversation);

        this.DOM = DOM;

        this.id = id;
        this.user_id = user_id;
    }

    _createClass(Conversation, [{
        key: "setID",
        value: function setID(id) {
            this.id = id;
        }
    }, {
        key: "messageSubmitted",
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
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
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _conversation = __webpack_require__(4);

var _conversations_list = __webpack_require__(5);

var _dom = __webpack_require__(6);

var _header = __webpack_require__(8);

var _body = __webpack_require__(3);

var _footer = __webpack_require__(7);

var _socket = __webpack_require__(0);

$(document).ready(function () {

        var ENTER_KEY = 13;

        function build() {
                // Side-menu list of conversations
                var conversations_list = new _conversations_list.ConversationsList($(".conversation-item"));

                // Main chat-box
                var header = new _header.Header($('#conversation-voice'), $('#conversation-video'), $('#conversation-profile'));
                var body = new _body.Body($('.conversation-body'));
                var footer = new _footer.Footer($('#enter-message'), $('#submit-message'));

                var DOM = new _dom.ConversationDOM(header, body, footer);

                var conversation = new _conversation.Conversation(DOM, conversation_id, user_id);

                var data = {};

                var socketIO = new _socket.SocketIO(io, 'http://localhost:8181/chat');

                if (socketIO.socket === undefined) {
                        //show modal alert ERROR and EXIT
                }

                socketIO.setRoom(conversation.id);

                socketIO.sendMessage('init', data);

                /**
                 *  SocketIO listeners
                 */
                socketIO.socket.on('init', function (data) {
                        conversation.DOM.body.appendMessagesArray(data, conversation.user_id);
                });

                // Received message from server. Only non-sender type of clients receive this.
                socketIO.socket.on('output', function (data) {
                        conversation.DOM.body.appendMessagesArray(data, conversation.user_id);
                });

                socketIO.socket.on('call', function (data) {
                        conversation.DOM.header.showIncomingCallAlert();
                });

                /**
                 *  DOM listeners
                 */
                conversation.DOM.footer.$submit_button.on('click', function () {

                        var message = conversation.DOM.footer.getMessage();
                        conversation.messageSubmitted(message);

                        data = {
                                user_id: conversation.user_id,
                                message: message,
                                user_name: user_name,
                                conversation_id: conversation.id
                        };
                        socketIO.sendMessage('input', data);
                });

                conversation.DOM.footer.$message_input.keypress(function (e) {
                        if (e.which == ENTER_KEY) {
                                conversation.DOM.footer.clickSubmitButton();
                        }
                });

                // Match all anchor tags with id like :conversation-id-{number}:
                conversations_list.item.click(function () {
                        var old_conversation_id = conversation.id;
                        var new_conversation_id = conversations_list.getItemID(this);

                        // Conversation changed. Update stuff
                        if (old_conversation_id !== new_conversation_id) {
                                conversation.DOM.body.clear();

                                conversation.setID(new_conversation_id);

                                socketIO.setRoom(new_conversation_id);

                                data.leaveRoom = old_conversation_id;
                                socketIO.sendMessage('roomChanged', data);

                                socketIO.sendMessage('init', data);
                        }
                });

                conversation.DOM.header.$video_button.click(function () {
                        data = {};
                        socketIO.sendMessage('call', data);

                        window.location.href = "/conversation/call/" + conversation.id;
                });

                conversation.DOM.header.$answer_call.click(function () {
                        window.location.href = "/conversation/call/" + conversation.id;
                });

                conversation.DOM.header.$reject_call.click(function () {
                        conversation.DOM.header.hideIncomingCallAlert();
                });
        }

        build();
});

/***/ })
/******/ ]);