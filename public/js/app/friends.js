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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ({

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FriendsController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modal = __webpack_require__(38);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FriendsController = function () {
    function FriendsController() {
        _classCallCheck(this, FriendsController);

        // Variables
        this.$filter = $('#persons-filter');
        this.modal = new _modal.Modal();

        this.bindListeners();
    }

    _createClass(FriendsController, [{
        key: 'bindListeners',
        value: function bindListeners() {
            var self = this;

            this.handleFiltering();
            this.handleModalTriggering();

            this.modal.$profileAddFriend.on('click', self.handleAddFriend.bind(self));
            this.modal.$profileRemoveFriend.on('click', self.handleRemoveFriend.bind(self));
        }
    }, {
        key: 'handleFiltering',
        value: function handleFiltering() {
            this.$filter.on('keyup', function () {
                var value = $(this).val();

                $('.person-box').each(function () {
                    if ($(this).text().search(value) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });
        }
    }, {
        key: 'handleModalTriggering',
        value: function handleModalTriggering() {
            var self = this;

            self.modal.$modalTrigger.on('click', function () {
                var friend_id = this.id;

                // Get profile picture, name, other info from server
                $.ajax({
                    type: 'GET',
                    url: '/friends/' + friend_id,
                    data: {},
                    success: function success(data) {
                        self.modal.profileID = data.id;
                        self.modal.$profileName.text(data.fullname);

                        if (data.isFriend) {
                            self.modal.showRemoveFriend();
                        } else {
                            self.modal.showAddFriend();
                        }
                    }
                });
            });
        }
    }, {
        key: 'handleAddFriend',
        value: function handleAddFriend() {
            var self = this;

            var data = {
                id: self.modal.profileID
            };

            $.ajax({
                type: "POST",
                url: "/friends",
                data: data,
                success: function success(_success) {
                    if (_success) {
                        self.modal.showRemoveFriend();
                    }
                }
            });
        }
    }, {
        key: 'handleRemoveFriend',
        value: function handleRemoveFriend() {
            var self = this;

            $.ajax({
                type: "DELETE",
                url: "/friends/" + self.modal.profileID,
                data: {},
                success: function success(_success2) {
                    if (_success2) {
                        self.modal.showAddFriend();
                    }
                }
            });
        }
    }]);

    return FriendsController;
}();

exports.FriendsController = FriendsController;

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
    function Modal() {
        _classCallCheck(this, Modal);

        this.$modal = $('.modal');

        this.$modalTrigger = $('.modal-trigger');

        this.profileID = null;

        this.$profileName = $('#profile-name');
        this.$profileAddFriend = $('#areNotFriends');
        this.$profileRemoveFriend = $('#areFriends');

        this.activateModal();
    }

    _createClass(Modal, [{
        key: 'activateModal',
        value: function activateModal() {
            this.$modal.modal();
        }
    }, {
        key: 'showAddFriend',
        value: function showAddFriend() {
            this.$profileRemoveFriend.hide();
            this.$profileAddFriend.show();
        }
    }, {
        key: 'showRemoveFriend',
        value: function showRemoveFriend() {
            this.$profileAddFriend.hide();
            this.$profileRemoveFriend.show();
        }
    }]);

    return Modal;
}();

exports.Modal = Modal;

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _FriendsController = __webpack_require__(22);

$(document).ready(function () {
    var friendsController = new _FriendsController.FriendsController();
});

/***/ })

/******/ });