/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
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
    }, {
        key: "getConversationSwitchMessage",
        value: function getConversationSwitchMessage() {
            return "conversation has been changed";
        }
    }, {
        key: "getConversationFilesButtonClickedMessage",
        value: function getConversationFilesButtonClickedMessage() {
            return "conversation files button clicked";
        }
    }, {
        key: "getConversationCompleteFilesTabClickedMessage",
        value: function getConversationCompleteFilesTabClickedMessage() {
            return "conversation complete files tab clicked";
        }
    }, {
        key: "getConversationIncompleteFilesTabClickedMessage",
        value: function getConversationIncompleteFilesTabClickedMessage() {
            return "conversation incomplete files tab clicked";
        }
    }, {
        key: "getConversationCompleteFilesRetrievedMessage",
        value: function getConversationCompleteFilesRetrievedMessage() {
            return "conversation complete files retrieved";
        }
    }, {
        key: "getConversationIncompleteFilesRetrievedMessage",
        value: function getConversationIncompleteFilesRetrievedMessage() {
            return "conversation incomplete files retrieved";
        }
    }, {
        key: "getFileMessageBoxClickedMessage",
        value: function getFileMessageBoxClickedMessage() {
            return "conversation complete files file message-box clicked";
        }
    }, {
        key: "getFilmDroppedMessage",
        value: function getFilmDroppedMessage() {
            return "cinema film dropped";
        }
    }, {
        key: "getHideFilmUploadMessage",
        value: function getHideFilmUploadMessage() {
            return "film uploading hidden";
        }
    }, {
        key: "getWebSocketVariable",
        value: function getWebSocketVariable() {
            return "get websocket var";
        }
    }, {
        key: "webSocketVariableRetrieved",
        value: function webSocketVariableRetrieved() {
            return "web socket variable retrieved";
        }
    }, {
        key: "getAppendFilmToDOMMessage",
        value: function getAppendFilmToDOMMessage() {
            return "append film to dom";
        }
    }, {
        key: "getFilmPlayButtonPressedMessage",
        value: function getFilmPlayButtonPressedMessage() {
            return "film play button pressed";
        }
    }, {
        key: "getFilmPauseButtonPressedMessage",
        value: function getFilmPauseButtonPressedMessage() {
            return "film pause button pressed";
        }
    }, {
        key: "getFilmPlayButtonPressedByOtherMessage",
        value: function getFilmPlayButtonPressedByOtherMessage() {
            return "other participant pressed play";
        }
    }, {
        key: "getFilmPauseButtonPressedByOtherMessage",
        value: function getFilmPauseButtonPressedByOtherMessage() {
            return "other participant pressed pause";
        }
    }, {
        key: "getFileDroppedMessage",
        value: function getFileDroppedMessage() {
            return "file dropped on dom";
        }
    }, {
        key: "getShowFileNameOnDOMMessage",
        value: function getShowFileNameOnDOMMessage() {
            return "getShowFileNameOnDOMMessage";
        }
    }, {
        key: "getDownloadFileMessage",
        value: function getDownloadFileMessage() {
            return "download file";
        }
    }]);

    return Config;
}();

exports.Config = Config;

/***/ }),
/* 1 */,
/* 2 */
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
        key: 'sendMessage',
        value: function sendMessage(event, data) {
            // Add the room to the message
            data.room = this.room;

            this.socket.emit(event, data);
        }
    }, {
        key: 'setRoom',
        value: function setRoom(room) {
            this.room = room;

            this.socket.emit('join', { room: room });
        }
    }]);

    return SocketIO;
}();

exports.SocketIO = SocketIO;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.ConversationBuilder = undefined;

var _conversation = __webpack_require__(4);

var _dom = __webpack_require__(6);

var _body = __webpack_require__(5);

var _footer = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationBuilder = function ConversationBuilder(id, user_id, user_name) {
        _classCallCheck(this, ConversationBuilder);

        // Main chat-box
        var body = new _body.Body();
        var footer = new _footer.Footer();

        var DOM = new _dom.ConversationDOM(body, footer);

        this.conversation = new _conversation.Conversation(DOM, id, user_id, user_name);

        this.conversation.init();
};

exports.ConversationBuilder = ConversationBuilder;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Conversation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conversation = function () {
    function Conversation(DOM, id, user_id, user_name) {
        _classCallCheck(this, Conversation);

        this.DOM = DOM;

        this.id = id;
        this.user_id = user_id;
        this.user_name = user_name;
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

            self.socketIO.socket.on('voice', function () {
                PubSub.publish('voice_in_progress', { conversation_id: self.id });
            });

            self.socketIO.socket.on('call', function () {
                PubSub.publish('call_in_progress', { conversation_id: self.id });
            });

            self.socketIO.socket.on('cinema', function () {
                PubSub.publish('cinema_in_progress', { conversation_id: self.id });
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
                    user_name: self.user_name,
                    conversation_id: self.id
                };
                self.socketIO.sendMessage('input', data);
            });

            self.DOM.footer.$message_input.keypress(function (e) {
                if (e.which == self.ENTER_KEY && self.DOM.footer.getMessage().trim()) {
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
exports.Body = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _helper = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Body = function () {
    function Body() {
        _classCallCheck(this, Body);

        this.user_id = $('#_user_id').val();

        this.$container = $('#conversation-messages-container');
        this.$box = $('#conversation-messages-body');

        this.bindListeners();
    }

    _createClass(Body, [{
        key: "bindListeners",
        value: function bindListeners() {
            var self = this;

            DragDrop(this.$box.selector, this.handleFileDropped.bind(this));

            PubSub.subscribe(_config.Config.getShowFileNameOnDOMMessage(), this.handleShowFile.bind(this));

            this.$box.on('click', 'div.message-box.message-other.file', self.handleFileElementClicked.bind(self));
        }
    }, {
        key: "appendMessagesArray",
        value: function appendMessagesArray(data, current_user_id) {
            _helper.Helper.appendConversationItems(this.$box, data, current_user_id);
        }
    }, {
        key: "appendMessage",
        value: function appendMessage(data, current_user_id) {
            _helper.Helper.appendItem(this.$box, data, current_user_id);
        }
    }, {
        key: "clear",
        value: function clear() {
            this.$box.empty();
        }
    }, {
        key: "show",
        value: function show() {
            this.$container.css({ display: "flex" });
        }
    }, {
        key: "hide",
        value: function hide() {
            this.$container.css({ display: "none" });
        }
    }, {
        key: "handleFileDropped",
        value: function handleFileDropped(files) {
            PubSub.publish(_config.Config.getFileDroppedMessage(), files);
        }
    }, {
        key: "handleShowFile",
        value: function handleShowFile(message, data) {
            var fileData = {
                user_id: data.sender_id,
                user_name: data.user_name,
                message: data.fileName,
                isFile: true
            };

            _helper.Helper.appendItem(this.$box, fileData, this.user_id);
        }
    }, {
        key: "handleFileElementClicked",
        value: function handleFileElementClicked(clickEvent) {
            var $file = $(clickEvent.currentTarget);

            PubSub.publish(_config.Config.getDownloadFileMessage(), $file.text());
        }
    }]);

    return Body;
}();

exports.Body = Body;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationDOM = function ConversationDOM(body, footer) {
    _classCallCheck(this, ConversationDOM);

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
    function Footer() {
        _classCallCheck(this, Footer);

        this.$message_input = $('#enter-message');
        this.$submit_button = $('#submit-message');

        this.style();
    }

    _createClass(Footer, [{
        key: 'clearInput',
        value: function clearInput() {
            this.$message_input.val("");
        }
    }, {
        key: 'clickSubmitButton',
        value: function clickSubmitButton() {
            this.$submit_button.click();
        }
    }, {
        key: 'getMessage',
        value: function getMessage() {
            return this.$message_input.val();
        }
    }, {
        key: 'style',
        value: function style() {
            var height = this.$submit_button.css("height");
            this.$submit_button.css({ "width": height + "px" });
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

var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [{
        key: 'appendConversationItems',
        value: function appendConversationItems($container, items, current_user_id) {
            for (var i = 0; i < items.length; i++) {
                Helper.appendItem($container, items[i], current_user_id);
            }
        }
    }, {
        key: 'appendItem',
        value: function appendItem($container, item, current_user_id) {
            var is_current_user = item.user_id == current_user_id;
            var type = is_current_user ? 'message-user' : 'message-other';

            var isFile = item.isFile ? 'file' : '';

            // This message is from another user
            if (!is_current_user) {
                var sender_name = typeof item.user_name == 'undefined' ? item.user.first_name + " " + item.user.last_name : item.user_name;

                var $emitter = $("<div class='message-emitter'>" + sender_name + "</div>");

                Helper.append($container, $emitter);
            }

            // Either file name or message
            var text = typeof item.message != 'undefined' ? item.message : item.name;

            // This message is from current user
            Helper.append($container, $('<div class=\'message-box ' + type + ' ' + isFile + '\' data-id="' + item.id + '">' + text + "</div>"));
        }
    }, {
        key: 'append',
        value: function append($container, $element) {
            $container.append($element);

            Helper.scrollToBottom($container);
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom($container) {
            $container.scrollTop($container[0].scrollHeight);
        }
    }]);

    return Helper;
}();

exports.Helper = Helper;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationFull = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversations_list = __webpack_require__(26);

var _conversation_builder = __webpack_require__(3);

var _header = __webpack_require__(27);

var _config = __webpack_require__(0);

var _index = __webpack_require__(29);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConversationFull = function (_ConversationBuilder) {
    _inherits(ConversationFull, _ConversationBuilder);

    function ConversationFull(conversation_id, user_id, user_name) {
        _classCallCheck(this, ConversationFull);

        // Side-menu list of conversations
        var _this = _possibleConstructorReturn(this, (ConversationFull.__proto__ || Object.getPrototypeOf(ConversationFull)).call(this, conversation_id, user_id, user_name));

        _this.conversations_list = new _conversations_list.ConversationsList();

        _this.conversation.DOM.header = new _header.Header();

        _this.actionButtons = new _index.ConversationActions(conversation_id);

        _this.bindDOMListeners();
        return _this;
    }

    _createClass(ConversationFull, [{
        key: "bindDOMListeners",
        value: function bindDOMListeners() {
            var self = this;

            this.conversations_list.item.on('click', this, self.switchConversation.bind(self));

            this.conversation.DOM.header.$voice_button.click(function () {
                self.conversation.socketIO.sendMessage('voice', {});

                window.location.href = "/conversation/voice/" + self.conversation.id;
            });

            this.conversation.DOM.header.$video_button.click(function () {
                self.conversation.socketIO.sendMessage('call', {});

                window.location.href = "/conversation/call/" + self.conversation.id;
            });

            this.conversation.DOM.header.$cinema_button.click(function () {
                self.conversation.socketIO.sendMessage('cinema', {});

                window.location.href = "/conversation/cinema/" + self.conversation.id;
            });

            this.conversation.DOM.header.$conversation_settings.dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: false, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: true, // Displays dropdown below the button
                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            });
        }
    }, {
        key: "switchConversation",
        value: function switchConversation(clickEvent) {
            var conversationItem = clickEvent.currentTarget;

            var old_conversation_id = this.conversation.id;
            var new_conversation_id = this.conversations_list.getItemID(conversationItem);

            // Conversation changed. Update stuff
            if (old_conversation_id !== new_conversation_id) {
                // Set clicked conversation as active
                this.conversations_list.switchActive(conversationItem);

                this.conversation.DOM.body.clear();

                this.conversation.setID(new_conversation_id);

                this.conversation.socketIO.setRoom(new_conversation_id);

                var data = {};

                data.leaveRoom = old_conversation_id;
                this.conversation.socketIO.sendMessage('roomChanged', data);

                this.conversation.socketIO.sendMessage('init', data);

                PubSub.publish(_config.Config.getConversationSwitchMessage(), new_conversation_id);
            }
        }
    }]);

    return ConversationFull;
}(_conversation_builder.ConversationBuilder);

exports.ConversationFull = ConversationFull;

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationsList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _create = __webpack_require__(31);

var _filter = __webpack_require__(32);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationsList = function () {
    function ConversationsList() {
        _classCallCheck(this, ConversationsList);

        this.item = $(".conversation-item");

        // Set first conversation as current active
        this.currentActiveItem = $(".conversations-list .conversation-item").first();
        this.switchActive(this.currentActiveItem);

        this.conversationCreate = new _create.ConversationCreate();
        this.conversationsFilter = new _filter.ConversationsFilter();

        this.bindDOMListeners();
    }

    _createClass(ConversationsList, [{
        key: "bindDOMListeners",
        value: function bindDOMListeners() {
            var self = this;
        }
    }, {
        key: "getItemID",
        value: function getItemID(item) {
            var element = $(item).find("div[id^='conversation-id-']")[0];
            var id = $(element).attr('id');

            return id.substring(id.lastIndexOf("-") + 1);
        }
    }, {
        key: "switchActive",
        value: function switchActive(item) {
            $(this.currentActiveItem).removeClass('active');
            $(item).addClass('active');

            this.currentActiveItem = item;
        }
    }]);

    return ConversationsList;
}();

exports.ConversationsList = ConversationsList;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function Header() {
    _classCallCheck(this, Header);

    this.$voice_button = $('#conversation-voice');
    this.$video_button = $('#conversation-video');
    this.$cinema_button = $('#conversation-cinema');

    this.$conversation_settings = $('#conversation-settings');
};

exports.Header = Header;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationDelete = function () {
    function ConversationDelete() {
        _classCallCheck(this, ConversationDelete);

        // PubSub Messages
        this.DELETE_CONVERSATION_GET_ID_MESSAGE = "delete conversation";
        this.DELETE_CONVERSATION_POST_ID_MESSAGE = "delete conversation with id";

        this.modal = $("#conversation-delete-modal");
        this.modal.modal();

        this.$confirmDeleteBtn = $("#conversation-delete-confirm");

        this.bindDOMListeners();
        this.bindListeners();
    }

    _createClass(ConversationDelete, [{
        key: "bindDOMListeners",
        value: function bindDOMListeners() {
            var self = this;

            this.$confirmDeleteBtn.on('click', self.getConversationIdToDelete.bind(self));
        }
    }, {
        key: "bindListeners",
        value: function bindListeners() {
            PubSub.subscribe(this.DELETE_CONVERSATION_POST_ID_MESSAGE, this.deleteConversation);
        }
    }, {
        key: "getConversationIdToDelete",
        value: function getConversationIdToDelete() {
            PubSub.publish(this.DELETE_CONVERSATION_GET_ID_MESSAGE, null);
        }
    }, {
        key: "deleteConversation",
        value: function deleteConversation(message, id) {
            $.ajax({
                type: "DELETE",
                url: "conversation/" + id,
                data: {},
                success: function success(data) {
                    window.location.href = "/conversation";
                }
            });
        }
    }]);

    return ConversationDelete;
}();

exports.ConversationDelete = ConversationDelete;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationActions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _delete = __webpack_require__(28);

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationActions = function () {
    function ConversationActions(conversation_id) {
        _classCallCheck(this, ConversationActions);

        this.conversation_id = conversation_id;

        this.$settingsButton = $('#conversation-settings');

        // PubSub Messages
        this.DELETE_CONVERSATION_GET_ID_MESSAGE = "delete conversation";
        this.DELETE_CONVERSATION_POST_ID_MESSAGE = "delete conversation with id";

        this.delete = new _delete.ConversationDelete();

        this.bindListeners();
    }

    _createClass(ConversationActions, [{
        key: "bindListeners",
        value: function bindListeners() {
            PubSub.subscribe(_config.Config.getConversationSwitchMessage(), this.setConversationId.bind(this));
            PubSub.subscribe(this.DELETE_CONVERSATION_GET_ID_MESSAGE, this.sendConversationIdToDelete.bind(this));
        }
    }, {
        key: "setConversationId",
        value: function setConversationId(message, conversation_id) {
            this.conversation_id = conversation_id;
        }
    }, {
        key: "sendConversationIdToDelete",
        value: function sendConversationIdToDelete() {
            PubSub.publish(this.DELETE_CONVERSATION_POST_ID_MESSAGE, this.conversation_id);
        }
    }]);

    return ConversationActions;
}();

exports.ConversationActions = ConversationActions;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _conversation_full = __webpack_require__(16);

$(document).ready(function () {
    var user_id = $('#_user_id').val();
    var user_name = $('#_user_name').val();
    var conversation_id = $('#_conversation_id').val();

    var conversationFull = new _conversation_full.ConversationFull(conversation_id, user_id, user_name);
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationCreate = function () {
    function ConversationCreate() {
        _classCallCheck(this, ConversationCreate);

        this.$addButton = $("#add-conversation");
        this.$selectField = $('select');

        // Activate modal triggering
        this.modal = $('.modal');
        this.modal.modal();

        this.friends = [];

        this.bindDOMListeners();
    }

    _createClass(ConversationCreate, [{
        key: 'bindDOMListeners',
        value: function bindDOMListeners() {
            var self = this;

            this.$addButton.on('click', self.handleAdd.bind(self));
        }
    }, {
        key: 'handleAdd',
        value: function handleAdd() {
            var self = this;

            if (self.friends.length == 0) {
                $.ajax({
                    type: "GET",
                    url: "conversation/get/friends",
                    data: {},
                    success: function success(data) {
                        self.friends = data;

                        self.createSelectField(data);
                    }
                });
            }
        }
    }, {
        key: 'createSelectField',
        value: function createSelectField(data) {
            this.$selectField.append(this.createOptions(data));

            this.$selectField.material_select();
        }
    }, {
        key: 'createOptions',
        value: function createOptions(data) {
            var options = "";

            for (var i = 0; i < data.length; i++) {
                options += '<option value="' + data[i].id + '"> ' + data[i].first_name + ' ' + data[i].last_name + ' </option>';
            }

            return options;
        }
    }]);

    return ConversationCreate;
}();

exports.ConversationCreate = ConversationCreate;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationsFilter = function () {
    function ConversationsFilter() {
        _classCallCheck(this, ConversationsFilter);

        this.$filterInput = $("#filter-conversations-input");

        this.bindDOMListeners();
    }

    _createClass(ConversationsFilter, [{
        key: 'bindDOMListeners',
        value: function bindDOMListeners() {
            this.handleFiltering();
        }
    }, {
        key: 'handleFiltering',
        value: function handleFiltering() {
            this.$filterInput.on('keyup', function () {
                var value = $(this).val();

                $('.conversation-item').each(function () {
                    if ($(this).text().search(value) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });
        }
    }]);

    return ConversationsFilter;
}();

exports.ConversationsFilter = ConversationsFilter;

/***/ })
/******/ ]);