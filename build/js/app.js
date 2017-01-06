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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(5);
	__webpack_require__(4);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Util_1 = __webpack_require__(3);
	var Note = function () {
	    function Note(obj) {
	        this.id = 0;
	        this.noteId = '';
	        this.idPrefix = obj.idPrefix;
	        this.colourSet = obj.colourSet;
	    }
	    Note.prototype.createNote = function (obj) {
	        this.id = obj.id;
	        var container = document.createElement('div');
	        var button = document.createElement('a');
	        var title = document.createElement('div');
	        var header = document.createElement('header');
	        var footer = document.createElement('footer');
	        var body = document.createElement('div');
	        var content = document.createElement('div');
	        var select = document.createElement('select');
	        var id = "" + this.idPrefix + this.id;
	        var _this = this;
	        this.noteId = id;
	        container.id = id;
	        container.classList.add('note__container');
	        content.classList.add('note__content');
	        body.classList.add('note__body');
	        header.classList.add('note__header');
	        footer.classList.add('note__footer');
	        title.classList.add('note__title');
	        button.classList.add('note__delete');
	        select.classList.add('note__label');
	        for (var _i = 0, _a = this.colourSet; _i < _a.length; _i++) {
	            var colour = _a[_i];
	            var option = document.createElement('a');
	            option.classList.add('note__colour-picker');
	            option.setAttribute('data-colour', colour['value']);
	            option.setAttribute('data-note', this.noteId);
	            option.setAttribute('href', '#colour');
	            option.setAttribute('title', colour['label']);
	            option.setAttribute('style', "background-color: " + colour['value']);
	            option.innerHTML = colour['label'];
	            option.addEventListener('click', _this.updateNoteLabel.bind(this), false);
	            footer.appendChild(option);
	        }
	        var firstOption = footer.getElementsByTagName('a')[0];
	        firstOption.classList.add('is--active');
	        container.setAttribute('style', "background-color:" + firstOption.getAttribute('data-colour'));
	        button.setAttribute('data-note', id);
	        button.setAttribute('href', '#delete');
	        button.innerHTML = '&#45;';
	        title.innerHTML = Util_1.TimeStamp();
	        content.setAttribute('contenteditable', 'true');
	        button.addEventListener('click', this.deleteNote.bind(container), false);
	        body.appendChild(content);
	        header.appendChild(title);
	        header.appendChild(button);
	        container.appendChild(header);
	        container.appendChild(body);
	        container.appendChild(footer);
	        return container;
	    };
	    Note.prototype.updateNoteLabel = function (event) {
	        var selectedElement = event.target;
	        var parent = selectedElement.parentNode;
	        var elements = parent.getElementsByTagName('a');
	        var colour = selectedElement.getAttribute('data-colour');
	        var note = document.getElementById(this.noteId);
	        note.setAttribute('style', "background-color:" + colour);
	        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
	            var element = elements_1[_i];
	            element.classList.toggle('is--active', false);
	        }
	        selectedElement.classList.add('is--active');
	        event.preventDefault();
	        return false;
	    };
	    Note.prototype.deleteNote = function (event) {
	        event.target.removeEventListener('click', this.deleteNote);
	        var elem = this;
	        if (elem.parentNode) {
	            elem.parentNode.removeChild(elem);
	        }
	        event.preventDefault();
	        return false;
	    };
	    return Note;
	}();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Note;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Note_1 = __webpack_require__(1);
	var Notes = function () {
	    function Notes(obj) {
	        if (obj === void 0) {
	            obj = {};
	        }
	        var _a = obj,
	            _b = _a.startingId,
	            startingId = _b === void 0 ? 0 : _b,
	            _c = _a.idPrefix,
	            idPrefix = _c === void 0 ? 'note' : _c,
	            _d = _a.colourSet,
	            colourSet = _d === void 0 ? [{ 'label': 'pale', 'value': '#FEFEFF' }, { 'label': 'blue', 'value': '#eef6fb' }, { 'label': 'beige', 'value': '#FED99B' }, { 'label': 'red', 'value': '#fbd5d0' }] : _d;
	        this.id = startingId;
	        this.colourSet = colourSet;
	        this.idPrefix = idPrefix;
	        this.notesContainer = document.getElementById('notes');
	        this.btnAdd = document.getElementById('btnAdd');
	        this.btnAdd.addEventListener('click', this.addNote.bind(this), false);
	        this.addNote();
	    }
	    Notes.prototype.addNote = function (event) {
	        if (event === void 0) {
	            event = null;
	        }
	        var note = new Note_1.default({ idPrefix: this.idPrefix, colourSet: this.colourSet });
	        this.notesContainer.insertBefore(note.createNote({ id: this.id }), this.notesContainer.childNodes[0]);
	        this.id += 1;
	        if (event) event.preventDefault();
	        return false;
	    };
	    return Notes;
	}();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Notes;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.TimeStamp = function () {
	    var date = new Date();
	    var day = date.getDate();
	    var month = date.getMonth() + 1;
	    var year = date.getFullYear();
	    var hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
	    var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	    var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	    var ampm = date.getHours() >= 12 ? 'pm' : 'am';
	    return day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec + " " + ampm;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Notes_1 = __webpack_require__(2);
	(function () {
	    var notes = new Notes_1.default({
	        startingId: 100,
	        idPrefix: 'mynote'
	    });
	})();

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);