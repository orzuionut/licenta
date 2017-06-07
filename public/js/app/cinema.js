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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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

            // PubSub.subscribe(Config.getConversationFilesButtonClickedMessage(), this.hide.bind(this));
            PubSub.subscribe(_config.Config.getConversationFilesButtonClickedMessage(), this.hide.bind(this));

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Conference = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(10);

var _config = __webpack_require__(0);

var _participants = __webpack_require__(11);

var _socket = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conference = function () {
    function Conference(conversation_id) {
        _classCallCheck(this, Conference);

        this.id = conversation_id;

        this.socketIO = new _socket.SocketIO(io, 'http://localhost:8181');

        this.socketIO.setRoom(this.id);

        this.configuration = null;

        this.sessionId = null;
        this.participants = {};

        this.iceServers = _config.Config.getIceServers();

        window.onbeforeunload = function () {
            this.socketIO.socket.disconnect();
        }.bind(this);

        this.DOM = new _dom.ConferenceDOM();
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
            var self = this;

            var dataChannelConfig = {};

            // Send Channel opened.. maybe enable buttons
            dataChannelConfig.onopen = function () {};
            dataChannelConfig.onclose = null;

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
                configuration: this.iceServers,
                dataChannelConfig: dataChannelConfig,
                dataChannels: true
            };

            localParticipant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
                if (error) return console.error(error);

                this.generateOffer(localParticipant.offerToReceiveVideo.bind(localParticipant));
            });

            this.localPeer = localParticipant.rtcPeer;

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
                configuration: this.iceServers,
                dataChannels: true
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

        // handleFileInputChanged(event)
        // {
        //     let fileName = null;
        //
        //     if( event.target.value )
        //         fileName = event.target.value.split( '\\' ).pop();
        //
        //     if( fileName )
        //         this.conversationDOM.filesDOM.footer.$inputFileLabel.find('span').html(fileName);
        // }
        //


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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Cinema = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(21);

var _config = __webpack_require__(0);

var _socket = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cinema = function () {
    function Cinema(id) {
        _classCallCheck(this, Cinema);

        this.id = id;
        this.dom = new _index.CinemaDOM();

        this.socketIO = new _socket.SocketIO(io, 'http://localhost:8181/chat');
        this.socketIO.setRoom(this.id);

        this.bindListeners();
    }

    _createClass(Cinema, [{
        key: "bindListeners",
        value: function bindListeners() {
            PubSub.subscribe(_config.Config.getFilmDroppedMessage(), this.handleFilmDroppedOnDOM.bind(this));

            this.socketIO.socket.on('play_film', this.handleFilmReceived.bind(this));

            this.socketIO.socket.on('play_button_pressed', this.handlePlayButtonPressedByOther.bind(this));
            this.socketIO.socket.on('pause_button_pressed', this.handlePauseButtonPressedByOther.bind(this));

            PubSub.subscribe(_config.Config.getFilmPlayButtonPressedMessage(), this.notifyParticipantsToPlayFilm.bind(this));
            PubSub.subscribe(_config.Config.getFilmPauseButtonPressedMessage(), this.notifyParticipantsToPauseFilm.bind(this));
        }
    }, {
        key: "handleFilmDroppedOnDOM",
        value: function handleFilmDroppedOnDOM(message, file) {
            var self = this;

            self.seedFile(file).then(function (torrent) {
                self.hideFilmUpload();
                self.displayFilm(torrent.magnetURI);

                self.sendFilmToOtherParticipants(torrent);
            });
        }
    }, {
        key: "seedFile",
        value: function seedFile(file) {
            var webtorrentClient = new WebTorrent();

            return new Promise(function (resolve, reject) {
                webtorrentClient.seed(file, function (torrent) {
                    resolve(torrent);
                });
            });
        }
    }, {
        key: "hideFilmUpload",
        value: function hideFilmUpload() {
            PubSub.publish(_config.Config.getHideFilmUploadMessage(), null);
        }
    }, {
        key: "displayFilm",
        value: function displayFilm(torrentMagnetURI) {
            var self = this;
            var webtorrentClient = new WebTorrent();

            webtorrentClient.add(torrentMagnetURI, function (torrent) {
                var file = torrent.files.find(function (file) {
                    return file.name.endsWith('.mp4');
                });

                self.appendVideoToDOM(file);
            });
        }
    }, {
        key: "appendVideoToDOM",
        value: function appendVideoToDOM(file) {
            PubSub.publish(_config.Config.getAppendFilmToDOMMessage(), file);
        }
    }, {
        key: "sendFilmToOtherParticipants",
        value: function sendFilmToOtherParticipants(torrent) {
            // send message with the torrent
            this.socketIO.sendMessage("play_film", { torrent: torrent.magnetURI });
        }
    }, {
        key: "handleFilmReceived",
        value: function handleFilmReceived(data) {
            this.hideFilmUpload();
            this.displayFilm(data[0].torrent);
        }
    }, {
        key: "notifyParticipantsToPlayFilm",
        value: function notifyParticipantsToPlayFilm() {
            this.socketIO.sendMessage("play_button_pressed", {});
        }
    }, {
        key: "notifyParticipantsToPauseFilm",
        value: function notifyParticipantsToPauseFilm() {
            this.socketIO.sendMessage("pause_button_pressed", {});
        }
    }, {
        key: "handlePlayButtonPressedByOther",
        value: function handlePlayButtonPressedByOther() {
            PubSub.publish(_config.Config.getFilmPlayButtonPressedByOtherMessage(), null);
        }
    }, {
        key: "handlePauseButtonPressedByOther",
        value: function handlePauseButtonPressedByOther() {
            PubSub.publish(_config.Config.getFilmPauseButtonPressedByOtherMessage(), null);
        }
    }]);

    return Cinema;
}();

exports.Cinema = Cinema;

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationDOM = function () {
    function ConversationDOM() {
        _classCallCheck(this, ConversationDOM);

        this.$conversationToggle = $('#conversation-toggle');
        this.$videosToggle = $('#videos-toggle');

        this.$conversationDOM = $('#conversation-container');
        this.$videosDOM = $('#videos-container');

        this.bindListeners();
    }

    _createClass(ConversationDOM, [{
        key: 'bindListeners',
        value: function bindListeners() {
            this.$conversationToggle.on('click', this.conversationToggleClicked.bind(this));
            this.$videosToggle.on('click', this.videosToggleClicked.bind(this));
        }
    }, {
        key: 'conversationToggleClicked',
        value: function conversationToggleClicked() {
            this.hideVideos();
            this.showConversation();

            this.hideConversationToggle();
            this.showVideosToggle();
        }
    }, {
        key: 'videosToggleClicked',
        value: function videosToggleClicked() {
            this.showVideos();
            this.hideConversation();

            this.showConversationToggle();
            this.hideVideosToggle();
        }
    }, {
        key: 'showVideos',
        value: function showVideos() {
            this.$videosDOM.show();
        }
    }, {
        key: 'showConversation',
        value: function showConversation() {
            this.$conversationDOM.show();
        }
    }, {
        key: 'hideVideos',
        value: function hideVideos() {
            this.$videosDOM.hide();
        }
    }, {
        key: 'hideConversation',
        value: function hideConversation() {
            this.$conversationDOM.hide();
        }
    }, {
        key: 'showVideosToggle',
        value: function showVideosToggle() {
            this.$videosToggle.show();
        }
    }, {
        key: 'showConversationToggle',
        value: function showConversationToggle() {
            this.$conversationToggle.show();
        }
    }, {
        key: 'hideVideosToggle',
        value: function hideVideosToggle() {
            this.$videosToggle.hide();
        }
    }, {
        key: 'hideConversationToggle',
        value: function hideConversationToggle() {
            this.$conversationToggle.hide();
        }
    }]);

    return ConversationDOM;
}();

exports.ConversationDOM = ConversationDOM;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FilmDOM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilmDOM = function () {
    function FilmDOM() {
        _classCallCheck(this, FilmDOM);

        this.$container = $('#film-playing');
        this.$uploadContainer = $('#film-placeholder');

        this.flag = false;

        this.bindListeners();
    }

    _createClass(FilmDOM, [{
        key: 'bindListeners',
        value: function bindListeners() {
            DragDrop(this.$uploadContainer.selector, this.handleFileDropped.bind(this));

            PubSub.subscribe(_config.Config.getHideFilmUploadMessage(), this.hideFilmUploadContainer.bind(this));
            PubSub.subscribe(_config.Config.getAppendFilmToDOMMessage(), this.handleAppendFilmToDOM.bind(this));

            // Other user pressed video player buttons
            PubSub.subscribe(_config.Config.getFilmPlayButtonPressedByOtherMessage(), this.playVideo.bind(this));
            PubSub.subscribe(_config.Config.getFilmPauseButtonPressedByOtherMessage(), this.pauseVideo.bind(this));
        }
    }, {
        key: 'bindFilmListeners',
        value: function bindFilmListeners() {
            this.film = this.$container.find("video");

            this.film.on('play', function () {
                PubSub.publish(_config.Config.getFilmPlayButtonPressedMessage(), null);
            });

            this.film.on('pause', function () {
                PubSub.publish(_config.Config.getFilmPauseButtonPressedMessage(), null);
            });
        }
    }, {
        key: 'handleFileDropped',
        value: function handleFileDropped(files) {
            PubSub.publish(_config.Config.getFilmDroppedMessage(), files);
        }
    }, {
        key: 'hideFilmUploadContainer',
        value: function hideFilmUploadContainer() {
            this.$uploadContainer.hide();
        }
    }, {
        key: 'handleAppendFilmToDOM',
        value: function handleAppendFilmToDOM(message, film) {
            film.appendTo(this.$container.selector, { autoplay: false });

            this.bindFilmListeners();
        }
    }, {
        key: 'playVideo',
        value: function playVideo() {
            if (this.film[0].paused) {
                this.film[0].play();
            }
        }
    }, {
        key: 'pauseVideo',
        value: function pauseVideo() {
            if (!this.film[0].paused) {
                this.film[0].pause();
            }
        }
    }]);

    return FilmDOM;
}();

exports.FilmDOM = FilmDOM;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CinemaDOM = undefined;

var _film = __webpack_require__(20);

var _conversation = __webpack_require__(19);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CinemaDOM = function CinemaDOM() {
    _classCallCheck(this, CinemaDOM);

    this.filmDOM = new _film.FilmDOM();
    this.conversationDOM = new _conversation.ConversationDOM();
};

exports.CinemaDOM = CinemaDOM;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _helper = __webpack_require__(1);

var _cinema = __webpack_require__(12);

var _conference = __webpack_require__(9);

var _conversation_builder = __webpack_require__(3);

$(document).ready(function () {
    var user_id = $('#_user_id').val();
    var user_name = $('#_user_name').val();
    var conversation_id = _helper.Helper.getIDfromURL();

    var conference = new _conference.Conference(conversation_id);

    conference.init();
    conference.listen();

    var build = new _conversation_builder.ConversationBuilder(conversation_id, user_id, user_name);

    var cinema = new _cinema.Cinema(conversation_id);
});

/***/ })
/******/ ]);