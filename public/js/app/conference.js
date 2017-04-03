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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Body = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Body = function () {
    function Body() {
        _classCallCheck(this, Body);

        this.$box = $('.conversation-body');
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
            var is_current_user = data.user_id == current_user_id;
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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.ConversationBuilder = undefined;

var _conversation = __webpack_require__(5);

var _dom = __webpack_require__(6);

var _body = __webpack_require__(2);

var _footer = __webpack_require__(3);

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
/* 5 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationDOM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversation_without_header = __webpack_require__(11);

var _headerFiles = __webpack_require__(12);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationFilesDOM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversation_files = __webpack_require__(9);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConversationWithoutHeader = undefined;

var _body = __webpack_require__(2);

var _footer = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConversationWithoutHeader = function ConversationWithoutHeader() {
    _classCallCheck(this, ConversationWithoutHeader);

    this.body = new _body.Body($('.conversation-body'));
    this.footer = new _footer.Footer($('#enter-message'), $('#submit-message'));
};

exports.ConversationWithoutHeader = ConversationWithoutHeader;

/***/ }),
/* 12 */
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
/* 13 */,
/* 14 */,
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Conference = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(28);

var _config = __webpack_require__(8);

var _participants = __webpack_require__(31);

var _socket = __webpack_require__(1);

var _file_receive = __webpack_require__(29);

var _indexedDB = __webpack_require__(19);

var _file_send = __webpack_require__(30);

var _data_channel_send = __webpack_require__(27);

var _data_channel_receive = __webpack_require__(26);

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

        this.fileReceive = {};

        this.iceServers = _config.Config.getIceServers();

        window.onbeforeunload = function () {
            this.socketIO.socket.disconnect();
        }.bind(this);

        this.DOM = new _dom.ConferenceDOM();

        this.db = new _indexedDB.DB();
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

            // Send files through data channel
            this.dataChannelSend = new _data_channel_send.DataChannelSend(this.localPeer);

            this.sendFile = new _file_send.SendFile(this.DOM, this.dataChannelSend);
            this.sendFile.bindDOMListeners();

            /////////////////////////////////

            window.RTC = this.localPeer;

            // @message.data => existing Participants in the room
            for (var i in message.data) {
                this.receiveVideoFrom(message.data[i]);
            }
        }
    }, {
        key: 'receiveVideoFrom',
        value: function receiveVideoFrom(sender) {
            var dataChannel = new _data_channel_receive.DataChannelReceive(this.localPeer);

            var dataChannelConfig = {};

            dataChannelConfig.onopen = function () {};
            dataChannelConfig.onclose = null;

            dataChannelConfig.onmessage = dataChannel.handleMessage;

            var participant = new _participants.Participant(sender, this.socketIO.socket);
            this.participants[sender] = participant;

            var video = _dom.ConferenceDOM.createVideo(participant);

            var options = {
                remoteVideo: video,
                onicecandidate: participant.onIceCandidate.bind(participant),
                configuration: this.iceServers,
                dataChannelConfig: dataChannelConfig,
                dataChannels: true
            };

            participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
                if (error) {
                    return console.error(error);
                }

                this.generateOffer(participant.offerToReceiveVideo.bind(participant));
            });

            dataChannel.setRemotePeer(participant.rtcPeer);

            this.fileReceive[sender] = new _file_receive.FileReceive(this.socketIO.socket, this.DOM, this.db, dataChannel);
            this.fileReceive[sender].bindEvents();
            this.fileReceive[sender].bindDOMListeners();

            PubSub.subscribe('handle data channel message', this.fileReceive[sender].handleDataChannelMessage.bind(this.fileReceive[sender]));

            //TODO: delete
            window.peerRTC = participant.rtcPeer;
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

            // Delete the file transfer
            delete this.fileReceive[message.sessionId];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataChannelReceive = function () {
    function DataChannelReceive(localPeer) {
        _classCallCheck(this, DataChannelReceive);

        this.localPeer = localPeer;
    }

    _createClass(DataChannelReceive, [{
        key: "setRemotePeer",
        value: function setRemotePeer(remotePeer) {
            this.remotePeer = remotePeer;
        }
    }, {
        key: "handleMessage",
        value: function handleMessage(data) {
            console.log("RECEIVE");

            var HANDLE_DATA_CHANNEL_MESSAGE = 'handle data channel message';
            PubSub.publish(HANDLE_DATA_CHANNEL_MESSAGE, data);
        }
    }]);

    return DataChannelReceive;
}();

exports.DataChannelReceive = DataChannelReceive;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataChannelSend = function () {
    function DataChannelSend(localPeer) {
        _classCallCheck(this, DataChannelSend);

        this.localPeer = localPeer;
    }

    _createClass(DataChannelSend, [{
        key: "send",
        value: function send(message) {
            console.log("SEND");

            this.localPeer.send(message);
        }
    }]);

    return DataChannelSend;
}();

exports.DataChannelSend = DataChannelSend;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConferenceDOM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversation_with_files = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConferenceDOM = function () {
    function ConferenceDOM() {
        _classCallCheck(this, ConferenceDOM);

        this.conversationDOM = new _conversation_with_files.ConversationFilesDOM();
        this.conversationDOM.bindListeners();
    }

    _createClass(ConferenceDOM, [{
        key: 'handleFileInputChanged',
        value: function handleFileInputChanged(event) {
            var fileName = null;

            if (event.target.value) fileName = event.target.value.split('\\').pop();

            if (fileName) this.conversationDOM.filesDOM.footer.$inputFileLabel.find('span').html(fileName);
        }
    }], [{
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileReceive = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileReceive = function () {
    function FileReceive(socket, DOM, db, dataChannel) {
        _classCallCheck(this, FileReceive);

        this.socket = socket;
        this.DOM = DOM;
        this.db = db;
        this.dataChannel = dataChannel;

        this.channelOpen = true;

        this.arrayToStoreChunks = [];
        this.receivedDataSize = 0;
        this.temporaryDataSize = 0;
        this.lastPositionSavedInArray = 0;
        this.chunkSizeLimit = 992000; // save chunks of ~ 1 MB to DB (62 slices of 16KB received)
        this.uuid = _helper.Helper.guid();
    }

    _createClass(FileReceive, [{
        key: 'bindEvents',
        value: function bindEvents() {
            this.socket.on('download file', this.handleFileDownload.bind(this));
            this.socket.on('download finished', this.handleFileDownloadFinished.bind(this));
        }
    }, {
        key: 'bindDOMListeners',
        value: function bindDOMListeners() {
            var self = this;

            this.DOM.conversationDOM.filesDOM.body.$files.on('click', this.target, self.handleFileDownloadResume.bind(self));
        }
    }, {
        key: 'handleDataChannelMessage',
        value: function handleDataChannelMessage(message, event) {
            var data = event.data;

            try {
                data = JSON.parse(data);

                console.log(data);

                this.saveToDisk(this.arrayToStoreChunks, data.fileName);

                this.deleteTemporaryData(this.uuid);

                this.arrayToStoreChunks = [];
                this.receivedDataSize = 0;

                _helper.Helper.flash("You have received a new file");
            } catch (e) {
                data = _helper.Helper.StringToArrayBuffer(data);

                this.arrayToStoreChunks.push(data);

                this.temporaryDataSize += data.byteLength;

                if (this.temporaryDataSize == this.chunkSizeLimit) {
                    var temporaryDataArray = this.arrayToStoreChunks.slice(this.lastPositionSavedInArray);

                    this.storeTemporaryData({ data: temporaryDataArray, hash: this.uuid });

                    this.receivedDataSize += this.temporaryDataSize;
                    this.temporaryDataSize = 0;
                    this.lastPositionSavedInArray = this.arrayToStoreChunks.length;
                }
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
        }
    }, {
        key: 'handleRemoteHangup',
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
    }, {
        key: 'handleFileDownloadResume',
        value: function handleFileDownloadResume(file) {
            _helper.Helper.flash("Attempting to retrieve temporary data");

            // this is bind to DOM element
            this.file_id = $(file.target).attr('data-id');
            this.file_name = $.trim($(file.target).text());

            this.getChunksByHash(this.file_id).then(this.handleChunksFetchSuccess.bind(this)).catch(this.handleChunksFetchError);
        }
    }, {
        key: 'handleChunksFetchSuccess',
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
        key: 'handleFileDownload',
        value: function handleFileDownload(data) {
            console.log("GOT DATA");
            this.arrayChunks.push(data.chunk);
        }
    }, {
        key: 'handleFileDownloadFinished',
        value: function handleFileDownloadFinished(data) {
            _helper.Helper.flash("Temporary file data retrieve successfully");

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

    return FileReceive;
}();

exports.FileReceive = FileReceive;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SendFile = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SendFile = function () {
    function SendFile(DOM, dataChannel) {
        _classCallCheck(this, SendFile);

        this.DOM = DOM;
        this.dataChannel = dataChannel;

        this.channelOpen = true;

        this.chunkSizeLimit = 992000; // save chunks of ~ 1 MB to DB (62 slices of 16KB received)
    }

    _createClass(SendFile, [{
        key: 'bindDOMListeners',
        value: function bindDOMListeners() {
            var self = this;

            this.DOM.conversationDOM.filesDOM.footer.$inputFile.on('change', this, self.DOM.handleFileInputChanged.bind(self.DOM));
            this.DOM.conversationDOM.filesDOM.footer.$sendButton.on('click', self.sendFileToPeer.bind(self));
        }
    }, {
        key: 'sendFileToPeer',
        value: function sendFileToPeer() {
            _helper.Helper.flash("Sending file to your friend..");

            this.file = this.getFileFromInput();

            this.chunkSize = 16000;

            this.reader = new window.FileSlicer();
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
            var dataAsArrayBuffer = event.target.result;

            var data = _helper.Helper.ArrayBufferToString(dataAsArrayBuffer);

            this.sendThroughDataChannel(data);

            if (this.file.size > this.offset + dataAsArrayBuffer.byteLength) {
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
                    this.dataChannel.send(data);
                } catch (exception) {
                    this.channelOpen = false;
                }
            }
        }
    }, {
        key: 'getFileFromInput',
        value: function getFileFromInput() {
            return this.DOM.conversationDOM.filesDOM.footer.$inputFile[0].files[0];
        }
    }]);

    return SendFile;
}();

exports.SendFile = SendFile;

/***/ }),
/* 31 */
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
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _conference = __webpack_require__(20);

var _conversation_builder = __webpack_require__(4);

var _helper = __webpack_require__(0);

$(document).ready(function () {
    var user_id = $('#_user_id').val();
    var user_name = $('#_user_name').val();
    var conversation_id = _helper.Helper.getIDfromURL();

    var conference = new _conference.Conference(conversation_id);

    conference.init();
    conference.listen();

    var build = new _conversation_builder.ConversationBuilder(conversation_id, user_id, user_name);

    window.Conference = conference;
});

/***/ })
/******/ ]);