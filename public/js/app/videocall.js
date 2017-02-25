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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Videocall = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _indexedDB = __webpack_require__(13);

var _dom = __webpack_require__(14);

var _peer_connection = __webpack_require__(15);

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
        this.uuid = this.guid();
    }

    _createClass(Videocall, [{
        key: 'build',
        value: function build() {
            if (this.room !== '') {
                this.socket.emit('create or join', this.room);
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

            this.socket.on('join', function (room) {
                self.isChannelReady = true;
            });

            this.socket.on('joined', function (room) {
                self.isChannelReady = true;
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
                download: fileName
            });

            this.DOM.$filesContainer.append($fileLink);
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
                console.log("Exception.. channel closed.." + this.offset + " sent from " + this.file.size + " total.");
            }
        }
    }, {
        key: 'onReadAsArrayBuffer',
        value: function onReadAsArrayBuffer(event) {
            var data = event.target.result;

            this.sendThroughDataChannel(data);

            if (this.file.size > this.offset + data.byteLength) {
                window.setTimeout(this.sliceFile.bind(this), 0, this.offset + this.chunkSize);
            } else {
                var _data = {};
                _data.fileName = this.file.name;

                delete this.reader;

                this.sendThroughDataChannel(JSON.stringify(_data));
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
                console.log("I have sent " + message.receivedDataSize + " to other peer");
                console.log("Also the saved chunks of files are saved with hash: " + message.hash);
            }

            this.stop();

            this.isInitiator = false;
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
        key: 'guid',
        value: function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    }]);

    return Videocall;
}();

exports.Videocall = Videocall;

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
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

        this.db = new Dexie("files");
        this.db.version(1).stores({
            files: '++id,data,hash'
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideocallDOM = function VideocallDOM() {
    _classCallCheck(this, VideocallDOM);

    this.localVideo = document.querySelector('#localVideo');
    this.remoteVideo = document.querySelector("#remoteVideo");

    this.$dataChannelSend = $('#dataChannelSend');
    this.$sendButton = $('#send-button');
    this.$filesContainer = $('#files-container');
};

exports.VideocallDOM = VideocallDOM;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PeerConnection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(1);

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
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _videocall = __webpack_require__(9);

$(document).ready(function () {
    var videocall = new _videocall.Videocall();

    videocall.build();

    videocall.bindEvents();

    videocall.bindListeners();
});

/***/ })
/******/ ]);