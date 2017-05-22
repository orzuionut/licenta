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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
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
exports.Body = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _helper = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Body = function () {
    function Body() {
        _classCallCheck(this, Body);

        this.$container = $('#conversation-messages-container');
        this.$box = $('#conversation-messages-body');

        this.bindListeners();
    }

    _createClass(Body, [{
        key: "bindListeners",
        value: function bindListeners() {
            // PubSub.subscribe(Config.getConversationFilesButtonClickedMessage(), this.hide.bind(this));
            PubSub.subscribe(_config.Config.getConversationFilesButtonClickedMessage(), this.hide.bind(this));
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.ConversationBuilder = undefined;

var _conversation = __webpack_require__(7);

var _dom = __webpack_require__(8);

var _body = __webpack_require__(3);

var _footer = __webpack_require__(4);

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
/* 6 */
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

            // This message is from another user
            if (!is_current_user) {
                var sender_name = typeof item.user_name == 'undefined' ? item.user.first_name + " " + item.user.last_name : item.user_name;

                var $emitter = $("<div class='message-emitter'>" + sender_name + "</div>");

                Helper.append($container, $emitter);
            }

            // Either file name or message
            var text = typeof item.message != 'undefined' ? item.message : item.name;

            // This message is from current user
            Helper.append($container, $('<div class=\'message-box ' + type + '\' data-id="' + item.id + '">' + text + "</div>"));
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
/* 7 */
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

            self.socketIO.socket.on('call', function () {
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
/* 8 */
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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileReceiver = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileReceiver = function () {
    function FileReceiver(worker, conversation_id) {
        _classCallCheck(this, FileReceiver);

        this.worker = worker;

        this.conversation_id = conversation_id;

        var data = {
            conversation_id: conversation_id
        };

        this.worker.postMessage(data);

        this.bindListeners();
    }

    _createClass(FileReceiver, [{
        key: "bindListeners",
        value: function bindListeners() {
            PubSub.subscribe(_config.Config.getConversationSwitchMessage(), this.setConversationId.bind(this));
        }
    }, {
        key: "setConversationId",
        value: function setConversationId(message, conversation_id) {
            this.conversation_id = conversation_id;
        }
    }]);

    return FileReceiver;
}();

exports.FileReceiver = FileReceiver;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileTransfer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileTransfer = function () {
    function FileTransfer(worker, conversation_id) {
        _classCallCheck(this, FileTransfer);

        this.worker = worker;
        this.conversation_id = conversation_id;

        this.bindListeners();
    }

    _createClass(FileTransfer, [{
        key: "bindListeners",
        value: function bindListeners() {
            PubSub.subscribe(_config.Config.getConversationSwitchMessage(), this.setConversationId.bind(this));
        }
    }, {
        key: "setConversationId",
        value: function setConversationId(message, conversation_id) {
            this.conversation_id = conversation_id;
        }
    }, {
        key: "startSending",
        value: function startSending(file, hash) {
            var data = {
                isReader: true,
                file: file,
                hash: hash,
                conversation_id: this.conversation_id
            };

            // Send the file to the Web Worker to process it
            this.worker.postMessage(data);
        }
    }]);

    return FileTransfer;
}();

exports.FileTransfer = FileTransfer;

/***/ }),
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationFull = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversations_list = __webpack_require__(38);

var _conversation_builder = __webpack_require__(5);

var _header = __webpack_require__(39);

var _helper = __webpack_require__(1);

var _index = __webpack_require__(26);

var _file_receiver = __webpack_require__(25);

var _config = __webpack_require__(0);

var _index2 = __webpack_require__(45);

var _index3 = __webpack_require__(47);

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

        _this.actionButtons = new _index3.ConversationActions(conversation_id);
        _this.files = new _index2.ConversationFiles(_this.conversation.socketIO, conversation_id, user_id);

        var worker = new Worker("/js/app/file_transfer.js");

        worker.onmessage = function (data) {
            // Blob = data.data.Blob

            var $fileLink = $('<a/>', {
                text: data.data.fileName,
                href: URL.createObjectURL(data.data.blob),
                target: '_blank',
                download: data.data.fileName,
                class: 'single-file file-bubble file-bubble-download',
                id: 'auto-download'
            });

            var $el = $('.conversation-body');

            $el.append($fileLink);
        };

        _this.fileTransfer = new _index.FileTransfer(worker, conversation_id);

        _this.fileReceiver = new _file_receiver.FileReceiver(worker, conversation_id);

        _this.bindDOMListeners();
        _this.bindListeners();
        return _this;
    }

    _createClass(ConversationFull, [{
        key: "bindListeners",
        value: function bindListeners() {}
    }, {
        key: "bindDOMListeners",
        value: function bindDOMListeners() {
            var self = this;

            this.conversations_list.item.on('click', this, self.switchConversation.bind(self));

            this.conversation.DOM.header.$file_input.on('change', self.uploadFile.bind(self));

            this.conversation.DOM.header.$video_button.click(function () {
                var data = {};
                self.conversation.socketIO.sendMessage('call', data);

                window.location.href = "/conversation/call/" + self.conversation.id;
            });

            this.conversation.DOM.header.$answer_call.click(function () {
                window.location.href = "/conversation/call/" + self.conversation.id;
            });

            this.conversation.DOM.header.$reject_call.click(function () {
                self.conversation.DOM.header.hideIncomingCallAlert();
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
    }, {
        key: "uploadFile",
        value: function uploadFile() {
            _helper.Helper.flash("Uploading file in progress..");

            var file = this.getFileFromInput();
            var hash = _helper.Helper.guid();

            this.fileTransfer.startSending(file, hash);
        }
    }, {
        key: "getFileFromInput",
        value: function getFileFromInput() {
            return this.conversation.DOM.header.$file_input[0].files[0];
        }
    }]);

    return ConversationFull;
}(_conversation_builder.ConversationBuilder);

exports.ConversationFull = ConversationFull;

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationsList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _create = __webpack_require__(49);

var _filter = __webpack_require__(50);

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
    function Header() {
        _classCallCheck(this, Header);

        this.$file_input = $('#dataChannelSend');

        this.$voice_button = $('#conversation-voice');
        this.$video_button = $('#conversation-video');
        this.$profile_button = $('#conversation-profile');

        this.$incoming_call_alert = $('#conversation-header-alert');
        this.$answer_call = $("#call-answer");
        this.$reject_call = $("#call-reject");

        this.$conversation_settings = $('#conversation-settings');
    }

    _createClass(Header, [{
        key: 'showIncomingCallAlert',
        value: function showIncomingCallAlert() {
            this.$incoming_call_alert.css('display', 'flex');
        }
    }, {
        key: 'hideIncomingCallAlert',
        value: function hideIncomingCallAlert() {
            this.$incoming_call_alert.css('display', 'none');
        }
    }]);

    return Header;
}();

exports.Header = Header;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationCompleteFiles = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _complete_files_dom = __webpack_require__(41);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationCompleteFiles = function () {
    function ConversationCompleteFiles(current_user_id) {
        _classCallCheck(this, ConversationCompleteFiles);

        this.current_user_id = current_user_id;

        this.DOM = new _complete_files_dom.ConversationCompleteFilesDOM();

        this.bindListeners();
    }

    _createClass(ConversationCompleteFiles, [{
        key: "bindListeners",
        value: function bindListeners() {
            PubSub.subscribe(_config.Config.getConversationCompleteFilesTabClickedMessage(), this.handleCompleteFilesTabClick.bind(this));

            PubSub.subscribe(_config.Config.getConversationIncompleteFilesTabClickedMessage(), this.handleIncompleteFilesTabClick.bind(this));
        }
    }, {
        key: "handleFilesRetrieved",
        value: function handleFilesRetrieved(data) {
            this.DOM.appendFiles(data, this.current_user_id);
        }
    }, {
        key: "handleCompleteFilesTabClick",
        value: function handleCompleteFilesTabClick() {
            this.DOM.show();
        }
    }, {
        key: "handleIncompleteFilesTabClick",
        value: function handleIncompleteFilesTabClick() {
            this.DOM.hide();
        }
    }]);

    return ConversationCompleteFiles;
}();

exports.ConversationCompleteFiles = ConversationCompleteFiles;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationCompleteFilesDOM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = __webpack_require__(6);

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationCompleteFilesDOM = function () {
    function ConversationCompleteFilesDOM() {
        _classCallCheck(this, ConversationCompleteFilesDOM);

        this.$container = $("#conversation-complete-files-body");
        this.$fileMessages = this.$container.find(".message-box");

        this.bindDOMListeners();
    }

    _createClass(ConversationCompleteFilesDOM, [{
        key: "bindDOMListeners",
        value: function bindDOMListeners() {
            var self = this;

            this.$container.on('click', self.$fileMessages, self.handleFileMessageBoxClicked.bind(self));
        }
    }, {
        key: "handleFileMessageBoxClicked",
        value: function handleFileMessageBoxClicked(clickEvent) {
            var $messageBox = $(clickEvent.target);
            var fileId = $messageBox.data('id');

            var data = {
                file_id: fileId
            };

            PubSub.publish(_config.Config.getFileMessageBoxClickedMessage(), data);
        }
    }, {
        key: "appendFiles",
        value: function appendFiles(files, current_user_id) {
            _helper.Helper.appendConversationItems(this.$container, files, current_user_id);
        }
    }, {
        key: "show",
        value: function show() {
            this.$container.show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this.$container.hide();
        }
    }]);

    return ConversationCompleteFilesDOM;
}();

exports.ConversationCompleteFilesDOM = ConversationCompleteFilesDOM;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationFilesDOM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationFilesDOM = function () {
    function ConversationFilesDOM() {
        _classCallCheck(this, ConversationFilesDOM);

        this.$container = $("#conversation-files-container");
        this.$box = $("#conversation-files-body");

        this.$completeFilesTab = $("#conversation-files-header__complete");
        this.$incompleteFilesTab = $("#conversation-files-header__incomplete");

        this.bindDOMListeners();
    }

    _createClass(ConversationFilesDOM, [{
        key: "bindDOMListeners",
        value: function bindDOMListeners() {
            var self = this;

            this.$completeFilesTab.on('click', self.handleCompleteFilesTabClick.bind(self));
            this.$incompleteFilesTab.on('click', self.handleIncompleteFilesTabClick.bind(self));
        }
    }, {
        key: "handleCompleteFilesTabClick",
        value: function handleCompleteFilesTabClick() {
            PubSub.publish(_config.Config.getConversationCompleteFilesTabClickedMessage(), null);

            this.setCompleteFilesTabAsActive();
            this.setIncompleteFilesTabAsInactive();
        }
    }, {
        key: "handleIncompleteFilesTabClick",
        value: function handleIncompleteFilesTabClick() {
            PubSub.publish(_config.Config.getConversationIncompleteFilesTabClickedMessage(), null);

            this.setCompleteFilesTabAsInactive();
            this.setIncompleteFilesTabAsActive();
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
        key: "setCompleteFilesTabAsActive",
        value: function setCompleteFilesTabAsActive() {
            this.$completeFilesTab.addClass('active');
        }
    }, {
        key: "setIncompleteFilesTabAsInactive",
        value: function setIncompleteFilesTabAsInactive() {
            this.$incompleteFilesTab.removeClass('active');
        }
    }, {
        key: "setCompleteFilesTabAsInactive",
        value: function setCompleteFilesTabAsInactive() {
            this.$completeFilesTab.removeClass('active');
        }
    }, {
        key: "setIncompleteFilesTabAsActive",
        value: function setIncompleteFilesTabAsActive() {
            this.$incompleteFilesTab.addClass('active');
        }
    }]);

    return ConversationFilesDOM;
}();

exports.ConversationFilesDOM = ConversationFilesDOM;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationIncompleteFiles = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _incomplete_files_dom = __webpack_require__(44);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationIncompleteFiles = function () {
    function ConversationIncompleteFiles() {
        _classCallCheck(this, ConversationIncompleteFiles);

        this.DOM = new _incomplete_files_dom.ConversationIncompleteFilesDOM();

        this.bindListeners();
    }

    _createClass(ConversationIncompleteFiles, [{
        key: "bindListeners",
        value: function bindListeners() {
            PubSub.subscribe(_config.Config.getConversationCompleteFilesTabClickedMessage(), this.handleCompleteFilesTabClick.bind(this));

            PubSub.subscribe(_config.Config.getConversationIncompleteFilesTabClickedMessage(), this.handleIncompleteFilesTabClick.bind(this));
        }
    }, {
        key: "handleFilesRetrieved",
        value: function handleFilesRetrieved(data) {
            // this.DOM.appendFiles(data, this.current_user_id);
        }
    }, {
        key: "handleCompleteFilesTabClick",
        value: function handleCompleteFilesTabClick() {
            this.DOM.hide();
        }
    }, {
        key: "handleIncompleteFilesTabClick",
        value: function handleIncompleteFilesTabClick() {
            this.DOM.show();
        }
    }]);

    return ConversationIncompleteFiles;
}();

exports.ConversationIncompleteFiles = ConversationIncompleteFiles;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationIncompleteFilesDOM = function () {
    function ConversationIncompleteFilesDOM() {
        _classCallCheck(this, ConversationIncompleteFilesDOM);

        this.$container = $("#conversation-incomplete-files-body");
    }

    _createClass(ConversationIncompleteFilesDOM, [{
        key: "show",
        value: function show() {
            this.$container.show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this.$container.hide();
        }
    }]);

    return ConversationIncompleteFilesDOM;
}();

exports.ConversationIncompleteFilesDOM = ConversationIncompleteFilesDOM;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationFiles = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(42);

var _config = __webpack_require__(0);

var _complete_files = __webpack_require__(40);

var _incomplete_files = __webpack_require__(43);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationFiles = function () {
    function ConversationFiles(socketIO, conversation_id, current_user_id) {
        _classCallCheck(this, ConversationFiles);

        this.socketIO = socketIO;
        this.conversation_id = conversation_id;
        this.current_user_id = current_user_id;

        this.DOM = new _dom.ConversationFilesDOM();

        this.completeFiles = new _complete_files.ConversationCompleteFiles(this.current_user_id);
        this.incompleteFiles = new _incomplete_files.ConversationIncompleteFiles(this.current_user_id);

        this.webTorrentClient = new window.WebTorrent();

        this.bindListeners();
        this.bindSocketIOListeners();
    }

    _createClass(ConversationFiles, [{
        key: "bindListeners",
        value: function bindListeners() {
            PubSub.subscribe(_config.Config.getConversationSwitchMessage(), this.handleConversationSwitch.bind(this));

            // PubSub.subscribe(Config.getConversationFilesButtonClickedMessage(), this.show.bind(this));
            PubSub.subscribe(_config.Config.getConversationFilesButtonClickedMessage(), this.DOM.show.bind(this.DOM));

            // File message-box clicked
            PubSub.subscribe(_config.Config.getFileMessageBoxClickedMessage(), this.handleCompleteFileMessageBoxClicked.bind(this));
        }
    }, {
        key: "bindSocketIOListeners",
        value: function bindSocketIOListeners() {
            var self = this;

            self.socketIO.socket.on('conversation_complete_files_retrived', function (data) {
                // PubSub.publish(Config.getConversationCompleteFilesRetrievedMessage(), data);
                self.completeFiles.handleFilesRetrieved(data);
            });

            self.socketIO.socket.on('conversation_partial_files_retrived', function (data) {
                // PubSub.publish(Config.getConversationIncompleteFilesRetrievedMessage(), data);
                self.incompleteFiles.handleFilesRetrieved(data);
            });

            self.socketIO.socket.on('download_file', function (data) {
                self.handleFileDownload(data);
            });
        }
    }, {
        key: "handleConversationSwitch",
        value: function handleConversationSwitch(message, conversation_id) {
            this.setConversationId(conversation_id);
            this.setSocketIORoom(conversation_id);

            this.socketIO.sendMessage('get_conversation_complete_files', {});
            this.socketIO.sendMessage('get_conversation_partial_files', {});
        }
    }, {
        key: "setConversationId",
        value: function setConversationId(conversation_id) {
            this.conversation_id = conversation_id;
        }
    }, {
        key: "setSocketIORoom",
        value: function setSocketIORoom(conversation_id) {
            this.socketIO.setRoom(conversation_id);
        }
    }, {
        key: "handleCompleteFileMessageBoxClicked",
        value: function handleCompleteFileMessageBoxClicked(message, data) {
            this.socketIO.sendMessage("download_file", data);
        }
    }, {
        key: "handleFileDownload",
        value: function handleFileDownload(data) {
            var self = this;
            var progress = 0;

            this.webTorrentClient.add(data.torrentId, function (torrent) {
                console.log("ADDING FILE WEBTORRENT");

                var $downloadingStatus = $("<progress/>", {
                    class: "message-downloading-progress",
                    value: 0,
                    max: 1
                });

                var $fileMessageBox = self.completeFiles.DOM.$container.find("[data-id='" + data.file_id + "']");

                $fileMessageBox.after($downloadingStatus);

                timeout($downloadingStatus);

                torrent.on('download', function () {
                    progress = torrent.progress;
                });

                torrent.on('done', function () {
                    var file = torrent.files.find(function (file) {
                        return file;
                    });

                    file.getBlobURL(function (err, url) {
                        if (err) throw err;

                        var $downloadLink = $("<a/>", {
                            download: file.name.replace("1234", ""),
                            href: url,
                            text: "Download"
                        });

                        $fileMessageBox.append($downloadLink);
                    });
                });
            });

            function timeout($progresElement) {
                setTimeout(function () {
                    $progresElement.val(progress);

                    timeout($progresElement);
                }, 3000);
            }
        }
    }]);

    return ConversationFiles;
}();

exports.ConversationFiles = ConversationFiles;

/***/ }),
/* 46 */
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationActions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _delete = __webpack_require__(46);

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationActions = function () {
    function ConversationActions(conversation_id) {
        _classCallCheck(this, ConversationActions);

        this.conversation_id = conversation_id;

        this.$filesButton = $('#conversation-files');
        this.$settingsButton = $('#conversation-settings');

        // PubSub Messages
        this.DELETE_CONVERSATION_GET_ID_MESSAGE = "delete conversation";
        this.DELETE_CONVERSATION_POST_ID_MESSAGE = "delete conversation with id";

        this.delete = new _delete.ConversationDelete();

        this.bindListeners();
        this.bindDOMListeners();
    }

    _createClass(ConversationActions, [{
        key: "bindListeners",
        value: function bindListeners() {
            PubSub.subscribe(_config.Config.getConversationSwitchMessage(), this.setConversationId.bind(this));
            PubSub.subscribe(this.DELETE_CONVERSATION_GET_ID_MESSAGE, this.sendConversationIdToDelete.bind(this));
        }
    }, {
        key: "bindDOMListeners",
        value: function bindDOMListeners() {
            var self = this;

            this.$filesButton.on('click', self.handleFilesButtonClick.bind(self));
        }
    }, {
        key: "handleFilesButtonClick",
        value: function handleFilesButtonClick() {
            PubSub.publish(_config.Config.getConversationFilesButtonClickedMessage(), null);
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _conversation_full = __webpack_require__(28);

$(document).ready(function () {
    var user_id = $('#_user_id').val();
    var user_name = $('#_user_name').val();
    var conversation_id = $('#_conversation_id').val();

    var conversationFull = new _conversation_full.ConversationFull(conversation_id, user_id, user_name);
});

/***/ }),
/* 49 */
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
/* 50 */
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