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
/******/ ({

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof importScripts === 'function') {
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js');

    var worker_object = self;

    var Worker = function () {
        function Worker(event) {
            _classCallCheck(this, Worker);

            this.socket = io('http://localhost:8181/videocall');

            this.hash = event.data.hash;
            this.file = event.data.file;
            this.fileName = event.data.fileName;
            this.userId = event.data.user_id;

            this.chunkSize = 200000;

            this.reader = new FileSlicer();
            this.reader.onload = this.onReadAsArrayBuffer.bind(this);
        }

        _createClass(Worker, [{
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

                this.upload(data);

                if (this.file.size > this.offset + data.byteLength) {
                    setTimeout(this.sliceFile.bind(this), 100, this.offset + this.chunkSize);
                } else {
                    this.uploadFinished();
                }
            }
        }, {
            key: 'upload',
            value: function upload(data) {
                console.log("SEND TO SERVER");

                var sendData = {
                    hash: this.hash,
                    data: data
                };

                this.sendMessageWithType('store file chunk', sendData);
            }
        }, {
            key: 'uploadFinished',
            value: function uploadFinished() {
                var data = {
                    hash: this.hash,
                    fileName: this.fileName,
                    user_id: this.userId
                };

                this.sendMessageWithType('store file', data);

                worker_object.postMessage('File uploaded to server successfully');
            }
        }, {
            key: 'sendMessageWithType',
            value: function sendMessageWithType(type, message) {
                this.socket.emit(type, message);
            }
        }]);

        return Worker;
    }();

    self.onmessage = function (event) {
        var worker = new Worker(event);

        worker.sliceFile(0);
    };
}

/***/ })

/******/ });