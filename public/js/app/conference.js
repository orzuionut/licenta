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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
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

var _conversation = __webpack_require__(4);

var _conversations_list = __webpack_require__(5);

var _dom = __webpack_require__(6);

var _header = __webpack_require__(7);

var _body = __webpack_require__(1);

var _footer = __webpack_require__(2);

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
/* 2 */
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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Conversation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = __webpack_require__(3);

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
exports.ConversationDOM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversation_without_header = __webpack_require__(12);

var _headerFiles = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConversationDOM = function (_ConversationWithoutH) {
    _inherits(ConversationDOM, _ConversationWithoutH);

    function ConversationDOM() {
        _classCallCheck(this, ConversationDOM);

        var _this = _possibleConstructorReturn(this, (ConversationDOM.__proto__ || Object.getPrototypeOf(ConversationDOM)).call(this));

        _this.header = new _headerFiles.HeaderFiles();
        _this.$container = $('.conversation-wrapper');
        return _this;
    }

    _createClass(ConversationDOM, [{
        key: 'show',
        value: function show() {
            this.$container.css({ display: "flex" });
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$container.css({ display: "none" });
        }
    }]);

    return ConversationDOM;
}(_conversation_without_header.ConversationWithoutHeader);

exports.ConversationDOM = ConversationDOM;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationFilesDOM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversation_files = __webpack_require__(10);

var _index = __webpack_require__(18);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationFilesDOM = function () {
    function ConversationFilesDOM() {
        _classCallCheck(this, ConversationFilesDOM);

        this.conversationDOM = new _conversation_files.ConversationDOM();
        this.filesDOM = new _index.FilesDOM();
    }

    _createClass(ConversationFilesDOM, [{
        key: 'bindListeners',
        value: function bindListeners() {
            this.bindConversationDOMListeners();
            this.bindFilesDOMListeners();
        }
    }, {
        key: 'bindConversationDOMListeners',
        value: function bindConversationDOMListeners() {
            this.conversationDOM.header.$showFilesButton.on('click', this.handleShowFilesButtonClicked.bind(this));
        }
    }, {
        key: 'bindFilesDOMListeners',
        value: function bindFilesDOMListeners() {
            this.filesDOM.header.$hideFilesButton.on('click', this.handleHideFilesButtonClicked.bind(this));
        }
    }, {
        key: 'handleShowFilesButtonClicked',
        value: function handleShowFilesButtonClicked() {
            this.conversationDOM.hide();
            this.filesDOM.show();
        }
    }, {
        key: 'handleHideFilesButtonClicked',
        value: function handleHideFilesButtonClicked() {
            this.conversationDOM.show();
            this.filesDOM.hide();
        }
    }]);

    return ConversationFilesDOM;
}();

exports.ConversationFilesDOM = ConversationFilesDOM;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationWithoutHeader = undefined;

var _body = __webpack_require__(1);

var _footer = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationWithoutHeader = function ConversationWithoutHeader() {
    _classCallCheck(this, ConversationWithoutHeader);

    this.body = new _body.Body($('.conversation-body'));
    this.footer = new _footer.Footer($('#enter-message'), $('#submit-message'));
};

exports.ConversationWithoutHeader = ConversationWithoutHeader;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeaderFiles = function HeaderFiles() {
    _classCallCheck(this, HeaderFiles);

    this.$showFilesButton = $('#show-files-btn');
    this.$hideFilesButton = $('#hide-files-btn');
};

exports.HeaderFiles = HeaderFiles;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileTransfer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = __webpack_require__(19);

var _indexedDB = __webpack_require__(20);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileTransfer = function () {
    function FileTransfer(socket, DOM, peerConnection) {
        _classCallCheck(this, FileTransfer);

        this.socket = socket;
        this.DOM = DOM;
        this.peerConnection = peerConnection;

        ////////////////////////
        this.db = new _indexedDB.DB();

        this.channelOpen = true;

        this.arrayToStoreChunks = [];
        this.receivedDataSize = 0;
        this.temporaryDataSize = 0;
        this.lastPositionSavedInArray = 0;
        this.chunkSizeLimit = 992000; // save chunks of ~ 1 MB to DB (62 slices of 16KB received)
        this.uuid = _helper.Helper.guid();
    }

    _createClass(FileTransfer, [{
        key: "bindEvents",
        value: function bindEvents() {
            this.socket.on('download file', this.handleFileDownload.bind(this));
            this.socket.on('download finished', this.handleFileDownloadFinished.bind(this));
        }
    }, {
        key: "bindDOMListeners",
        value: function bindDOMListeners() {
            var self = this;

            this.DOM.conversationDOM.filesDOM.body.$files.on('click', this.target, self.handleFileDownloadResume.bind(self));
            this.DOM.conversationDOM.filesDOM.footer.$inputFile.on('change', this, self.DOM.handleFileInputChanged.bind(self.DOM));
            this.DOM.conversationDOM.filesDOM.footer.$sendButton.on('click', self.sendFileToPeer.bind(self));
        }
    }, {
        key: "handleDataChannelMessage",
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

                _helper.Helper.flash("You have received a new file");
            }
        }
    }, {
        key: "sendFileToPeer",
        value: function sendFileToPeer() {
            _helper.Helper.flash("Sending file to your friend..");

            console.log(this.peerConnection);

            this.file = this.getFileFromInput();

            this.chunkSize = 16000;

            this.reader = new window.FileReader();
            this.reader.onload = this.onReadAsArrayBuffer.bind(this);

            this.sliceFile(0);
        }
    }, {
        key: "sliceFile",
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
        key: "onReadAsArrayBuffer",
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
        key: "saveToDisk",
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
        key: "storeTemporaryData",
        value: function storeTemporaryData(data) {
            return this.db.insert(data);
        }
    }, {
        key: "deleteTemporaryData",
        value: function deleteTemporaryData(hash) {
            this.db.deleteByHash(hash);
        }
    }, {
        key: "getChunksByHash",
        value: function getChunksByHash(hash) {
            return this.db.getByHash(hash);
        }
    }, {
        key: "sendThroughDataChannel",
        value: function sendThroughDataChannel(data) {
            if (this.channelOpen) {
                try {
                    if (this.peerConnection.isInitiator) {
                        this.peerConnection.sendChannel.send(data);
                    } else {
                        this.peerConnection.receiveChannel.send(data);
                    }
                } catch (exception) {
                    console.log("CLOSING CHANNEL");
                    this.channelOpen = false;
                }
            }
        }
    }, {
        key: "getFileFromInput",
        value: function getFileFromInput() {
            return this.DOM.conversationDOM.filesDOM.footer.$inputFile[0].files[0];
        }
    }, {
        key: "hangup",
        value: function hangup() {
            var data = {};

            if (this.receivedDataSize != 0) {
                data.receivedDataSize = this.receivedDataSize;
                data.hash = this.uuid;
            }

            data.message = 'bye';
            data.channel = this.room;

            this.sendMessage(data);
        }
    }, {
        key: "handleRemoteHangup",
        value: function handleRemoteHangup(message) {
            if (message.receivedDataSize) {
                _helper.Helper.flash("Please wait while the rest of the file is uploaded to the server..");

                console.log("I have sent " + message.receivedDataSize + " to other peer");
                console.log("Also the saved chunks of files are saved with hash: " + message.hash);

                var remainingSlicesFromFile = this.file.slice(message.receivedDataSize);

                var fileToStore = this.blobToFile(remainingSlicesFromFile, this.file.name);

                this.storeFile(fileToStore, message.hash);
            }

            this.DOM.updateVideoElementsCallStopped();
            this.DOM.showFlashMessageCallStopped();
        }
    }, {
        key: "storeFile",
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
        key: "blobToFile",
        value: function blobToFile(blob, fileName) {
            blob.lastModifiedDate = new Date();
            blob.name = fileName;
            return blob;
        }
    }, {
        key: "sendMessage",
        value: function sendMessage(message) {
            this.socket.emit('message', message);
        }

        // TODO: refactor

    }, {
        key: "sendMessageWithType",
        value: function sendMessageWithType(type, message) {
            this.socket.emit(type, message);
        }
    }, {
        key: "handleFileDownloadResume",
        value: function handleFileDownloadResume(file) {
            _helper.Helper.flash("Attempting to retrieve temporary data");

            // this is bind to DOM element
            this.file_id = $(file.target).attr('data-id');
            this.file_name = $.trim($(file.target).text());

            this.getChunksByHash(this.file_id).then(this.handleChunksFetchSuccess.bind(this)).catch(this.handleChunksFetchError);
        }
    }, {
        key: "handleChunksFetchSuccess",
        value: function handleChunksFetchSuccess(chunksStored) {
            _helper.Helper.flash("Temporary file data retrieve successfully");
            _helper.Helper.flash("Resuming download of the rest of the file from the server");

            this.arrayChunks = this.getArrayChunksFromObject(chunksStored);

            /////////////////////////////////////////////////////////////////
            var data = {
                user_id: user_id,
                file_id: this.file_id
            };

            this.sendMessageWithType('download file', data);
        }
    }, {
        key: "handleFileDownload",
        value: function handleFileDownload(data) {
            console.log("GOT DATA");
            this.arrayChunks.push(data.chunk);
        }
    }, {
        key: "handleFileDownloadFinished",
        value: function handleFileDownloadFinished(data) {
            _helper.Helper.flash("Temporary file data retrieve successfully");

            this.saveToDisk(this.arrayChunks, this.file_name);
        }

        // chunksObjects contains multiple objects that each contain data equal to an Array[62]

    }, {
        key: "getArrayChunksFromObject",
        value: function getArrayChunksFromObject(chunksObjects) {
            var chunksArray = [];

            for (var i = 0; i < chunksObjects.length; i++) {
                chunksArray.push.apply(chunksArray, _toConsumableArray(chunksObjects[i].data));
            }

            return chunksArray;
        }
    }]);

    return FileTransfer;
}();

exports.FileTransfer = FileTransfer;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Body = function Body() {
    _classCallCheck(this, Body);

    this.$files = $('.single-file');
};

exports.Body = Body;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Footer = function Footer() {
    _classCallCheck(this, Footer);

    this.$inputFile = $('#dataChannelSend');
    this.$inputFileLabel = $('#fileInputLabel');

    this.$sendButton = $('#send-button');
};

exports.Footer = Footer;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function Header() {
    _classCallCheck(this, Header);

    this.$hideFilesButton = $('#hide-files-btn');
};

exports.Header = Header;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FilesDOM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _header = __webpack_require__(17);

var _body = __webpack_require__(15);

var _footer = __webpack_require__(16);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilesDOM = function () {
    function FilesDOM() {
        _classCallCheck(this, FilesDOM);

        this.header = new _header.Header();
        this.body = new _body.Body();
        this.footer = new _footer.Footer();

        this.$container = $('.conversation-files-wrapper');
    }

    _createClass(FilesDOM, [{
        key: 'show',
        value: function show() {
            this.$container.css({ display: "flex" });
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$container.css({ display: "none" });
        }
    }]);

    return FilesDOM;
}();

exports.FilesDOM = FilesDOM;

/***/ }),
/* 19 */
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
    }, {
        key: 'flash',
        value: function flash(message) {
            Materialize.toast(message, 4000, 'flash-message');
        }
    }]);

    return Helper;
}();

exports.Helper = Helper;

/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Conference = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(23);

var _config = __webpack_require__(9);

var _participants = __webpack_require__(24);

var _socket = __webpack_require__(3);

var _conversation_with_files = __webpack_require__(11);

var _file_transfer = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conference = function () {
    function Conference() {
        _classCallCheck(this, Conference);

        this.id = getIDfromURL();

        this.socketIO = new _socket.SocketIO(io, 'http://localhost:8181');

        this.socketIO.setRoom(this.id);

        // this.servers = null;
        // this.configuration = null;

        this.sessionId = null;
        this.participants = {};

        this.iceServers = _config.Config.getIceServers();

        window.onbeforeunload = function () {
            this.socketIO.socket.disconnect();
        }.bind(this);

        this.DOM = {};

        this.DOM.conversationDOM = new _conversation_with_files.ConversationFilesDOM();
        this.DOM.conversationDOM.bindListeners();

        this.fileTransfer = new _file_transfer.FileTransfer(this.socketIO.socket, this.DOM, this.peerConnection);
        this.fileTransfer.bindEvents();
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
            // this.peerConnection = new RTCPeerConnection(this.servers, this.configuration);
            //
            // this.channel = this.peerConnection.createDataChannel("hello", null);
            //
            // this.channel.onopen = function () {
            //     console.log("RAGE");
            // };
            // this.channel.onclose = onSendChannelStateChange;
            // this.channel.onmessage = onMessage;

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
                // peerConnection: this.peerConnection,
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
                // peerConnection: this.peerConnection,
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
/* 22 */,
/* 23 */
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
/* 24 */
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
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _conference = __webpack_require__(21);

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