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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
        key: 'blobToFile',
        value: function blobToFile(blob, fileName) {
            blob.lastModifiedDate = new Date();
            blob.name = fileName;
            return blob;
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
    }, {
        key: 'flash',
        value: function flash(message) {
            Materialize.toast(message, 4000, 'flash-message');
        }
    }, {
        key: 'ArrayBufferToString',
        value: function ArrayBufferToString(buffer) {
            return String.fromCharCode.apply(null, new Uint8Array(buffer));
        }
    }, {
        key: 'StringToArrayBuffer',
        value: function StringToArrayBuffer(string) {
            var buf = new ArrayBuffer(string.length); // 2 bytes for each char
            var bufView = new Uint8Array(buf);
            for (var i = 0, strLen = string.length; i < strLen; i++) {
                bufView[i] = string.charCodeAt(i);
            }
            return buf;
        }
    }, {
        key: 'getIDfromURL',
        value: function getIDfromURL() {
            var current_url = $(location).attr("href");
            return current_url.substring(current_url.lastIndexOf("/") + 1);
        }
    }, {
        key: 'measureBW',
        value: function measureBW() {
            var startTime, endTime, fileSize;

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {

                // we only need to know when the request has completed
                if (xhr.readyState === 4 && xhr.status === 200) {

                    // Here we stop the timer & register end time
                    endTime = new Date().getTime();

                    // Also, calculate the file-size which has transferred
                    fileSize = xhr.responseText.length;

                    // Calculate the connection-speed
                    var speed = fileSize / ((endTime - startTime) / 1000) / 1024;

                    // Report the result, or have fries with it...
                    alert(speed + " KBps\n");
                }
            };

            startTime = new Date().getTime();

            xhr.open("GET", "/img/register_panel.jpg", true);
            xhr.send();
        }
    }]);

    return Helper;
}();

exports.Helper = Helper;

/***/ }),
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

        // Connection
        this.socket = io.connect(url, { secure: true, reconnect: true, rejectUnauthorized: false });
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

            self.socketIO = new _socket.SocketIO(io, 'https://' + window.location.hostname + '/chat');

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Videocall = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(13);

var _peer_connection = __webpack_require__(14);

var _helper = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Videocall = function () {
    function Videocall(user_id) {
        _classCallCheck(this, Videocall);

        this.user_id = user_id;

        this.REMOTE_STREAM_ADDED = 'remote stream added';

        this.HANDLE_DATA_CHANNEL_MESSAGE = 'handle data channel message';
        this.HANDLE_DATA_CHANNEL_OPEN = 'handle data channel open';
        this.HANDLE_DATA_CHANNEL_CLOSE = 'handle data channel close';

        this.constraints = {
            video: true,
            audio: true
        };

        this.DOM = new _dom.VideocallDOM();

        this.nav = navigator;

        this.nav.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

        this.sendChannel = null;
        this.receiveChannel = null;

        this.isChannelReady = false;
        this.isInitiator = false;
        this.isStarted = false;

        this.localStream = null;
        this.remoteStream = null;

        this.room = _helper.Helper.getIDfromURL();

        this.socket = io.connect('https://' + window.location.hostname + '/videocall', { secure: true, reconnect: true, rejectUnauthorized: false });
    }

    _createClass(Videocall, [{
        key: 'setConfig',
        value: function setConfig(constraints) {
            this.constraints = constraints;
        }
    }, {
        key: 'build',
        value: function build() {
            if (this.room !== '') {
                var data = {
                    room: this.room,
                    user_id: this.user_id
                };
                this.socket.emit('create or join', data);
            }

            this.nav.getUserMedia(this.constraints, this.handleUserMedia.bind(this), this.handleUserMediaError);
        }
    }, {
        key: 'handleSocketMessages',
        value: function handleSocketMessages() {
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
        }
    }, {
        key: 'bindListeners',
        value: function bindListeners() {
            PubSub.subscribe(this.REMOTE_STREAM_ADDED, this.handleRemoteStreamAdded.bind(this));

            PubSub.subscribe(this.HANDLE_DATA_CHANNEL_OPEN, this.handleDataChannelOpen.bind(this));
            PubSub.subscribe(this.HANDLE_DATA_CHANNEL_CLOSE, this.handleDataChannelClose.bind(this));

            window.onbeforeunload = function () {
                this.hangup();
            }.bind(this);
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
        key: 'hangup',
        value: function hangup() {
            this.sendMessage({
                message: 'bye',
                channel: this.room
            });

            this.stop();
        }
    }, {
        key: 'handleRemoteHangup',
        value: function handleRemoteHangup(message) {
            this.DOM.updateVideoElementsCallStopped();
            this.DOM.showFlashMessageCallStopped();
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
        }
    }]);

    return Videocall;
}();

exports.Videocall = Videocall;

/***/ }),
/* 13 */
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
    }

    _createClass(VideocallDOM, [{
        key: "updateVideoElementsCallRunning",
        value: function updateVideoElementsCallRunning() {
            this.localVideo.classList.remove("video-fullscreen");
            this.localVideo.classList.add("video-small");

            this.remoteVideo.classList.remove("video-hidden");
            this.remoteVideo.classList.add("video-fullscreen");
        }
    }, {
        key: "updateVideoElementsCallStopped",
        value: function updateVideoElementsCallStopped() {
            this.localVideo.classList.remove("video-small");
            this.localVideo.classList.add("video-fullscreen");

            this.remoteVideo.classList.remove("video-fullscreen");
            this.remoteVideo.classList.add("video-hidden");
        }
    }, {
        key: "showFlashMessageCallStopped",
        value: function showFlashMessageCallStopped() {
            swal({
                title: "Video call ended!",
                imageUrl: "/img/call_ended_icon.png"
            });
        }
    }]);

    return VideocallDOM;
}();

exports.VideocallDOM = VideocallDOM;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PeerConnection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _helper = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PeerConnection = function () {
    function PeerConnection(isInitiator, localStream, socket) {
        _classCallCheck(this, PeerConnection);

        this.constraints = this.getConstraints();
        this.iceServers = this.getIceServers();
        this.sdpConstraints = webrtcDetectedBrowser === 'firefox' ? { 'offerToReceiveAudio': true, 'offerToReceiveVideo': true } : { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } };

        this.socket = socket;
        this.room = _helper.Helper.getIDfromURL();

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
                alert('Cannot create RTCPeerConnection object. ' + e.message);
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

            this.isInitiator = true;
        }
    }, {
        key: 'gotReceiveChannel',
        value: function gotReceiveChannel(event) {
            this.receiveChannel = event.channel;
            this.receiveChannel.binaryType = 'arraybuffer';

            this.setDataChannelHandlers(this.receiveChannel);

            this.isInitiator = false;
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _videocall = __webpack_require__(12);

var _conversation_builder = __webpack_require__(3);

var _helper = __webpack_require__(1);

$(document).ready(function () {
    var user_id = $('#_user_id').val();
    var user_name = $('#_user_name').val();
    var conversation_id = _helper.Helper.getIDfromURL();

    var videocall = new _videocall.Videocall(user_id);

    videocall.build();

    videocall.handleSocketMessages();

    videocall.bindListeners();

    var build = new _conversation_builder.ConversationBuilder(conversation_id, user_id, user_name);
});

/***/ })
/******/ ]);