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
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
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

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof importScripts === 'function') {
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js');

    var worker_object = self;

    worker_object.socketIO = new _socket.SocketIO(io, 'http://localhost:8181/chat');

    var FileSlicer = function () {
        function FileSlicer(file, socketIO) {
            _classCallCheck(this, FileSlicer);

            this.file = file;
            this.socketIO = socketIO;

            this.chunkSize = 32000;

            this.reader = new FileReader();
            this.reader.onload = this.onReadAsArrayBuffer.bind(this);
        }

        _createClass(FileSlicer, [{
            key: 'sliceFile',
            value: function sliceFile(offset) {
                this.offset = offset;

                var slice = this.file.slice(offset, offset + this.chunkSize);
                this.reader.readAsArrayBuffer(slice);
            }
        }, {
            key: 'onReadAsArrayBuffer',
            value: function onReadAsArrayBuffer(event) {
                var data = event.target.result;

                this.sendChunk(data);

                if (this.file.size > this.offset + data.byteLength) {
                    setTimeout(this.sliceFile.bind(this), 0, this.offset + this.chunkSize);
                } else {
                    this.sendFinishMessage();
                }
            }
        }, {
            key: 'sendChunk',
            value: function sendChunk(chunk) {
                var data = {
                    fileChunk: chunk
                };

                this.transfer(data, [data]);
            }
        }, {
            key: 'sendFinishMessage',
            value: function sendFinishMessage() {
                var data = {
                    finish: true
                };

                delete this.reader;

                this.transfer(data);
            }
        }, {
            key: 'transfer',
            value: function transfer(data) {
                this.socketIO.sendMessage('file_chunk', data);
            }
        }]);

        return FileSlicer;
    }();

    self.onmessage = function (event) {
        var room = event.data.conversation_id + "_fileTransfer";
        worker_object.socketIO.setRoom(room);

        var fileReader = new FileSlicer(event.data.file, worker_object.socketIO);

        fileReader.sliceFile(0);
    };
}

/***/ })

/******/ });