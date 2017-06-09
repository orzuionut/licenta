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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Notification = function () {
    function Notification() {
        _classCallCheck(this, Notification);

        this.$incoming_call_alert = $('#conversation-header-alert');
        this.$answer_call = $("#call-answer");
        this.$reject_call = $("#call-reject");

        this.bindListeners();
    }

    _createClass(Notification, [{
        key: "bindListeners",
        value: function bindListeners() {
            PubSub.subscribe('voice_in_progress', this.handleIncomingCall.bind(this));
            PubSub.subscribe('call_in_progress', this.handleIncomingCall.bind(this));
            PubSub.subscribe('cinema_in_progress', this.handleIncomingCall.bind(this));
        }
    }, {
        key: "handleIncomingCall",
        value: function handleIncomingCall(message, data) {
            var self = this;

            this.showIncomingCallAlert();

            this.$answer_call.click(function () {
                switch (message) {
                    case 'voice_in_progress':
                        window.location.href = "/conversation/voice/" + data.conversation_id;
                        break;

                    case 'call_in_progress':
                        window.location.href = "/conversation/call/" + data.conversation_id;
                        break;

                    case 'cinema_in_progress':
                        window.location.href = "/conversation/cinema/" + data.conversation_id;
                        break;

                    default:
                        window.location.href = "/conversation/call/" + data.conversation_id;
                }
            });

            this.$reject_call.click(function () {
                self.hideIncomingCallAlert();
            });
        }
    }, {
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

    return Notification;
}();

exports.Notification = Notification;

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _notification = __webpack_require__(19);

$(document).ready(function () {
    var notification = new _notification.Notification();
});

/***/ })

/******/ });