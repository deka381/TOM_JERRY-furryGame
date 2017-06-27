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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Coin() {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
}
module.exports = Coin;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Enemy() {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
}
module.exports = Enemy;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Furry() {
  this.x = 0;
  this.y = 0;
  this.direction = "right";
}
module.exports = Furry;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Coin = __webpack_require__(0);
var Furry = __webpack_require__(2);
var Enemy = __webpack_require__(1);

var Game = function Game() {
  this.board = [].concat(_toConsumableArray(document.querySelectorAll("section#board div")));
  this.furry = new Furry();
  this.coin = new Coin();
  this.enemy = [];
  this.score = 0;
  //////////////////////////////
  this.index = function (x, y) {
    return x + y * 10;
  };
  ///////////////////////////////////////////
  this.showFurry = function () {
    this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
  };
  ///////////////////////////////////////////

  this.hideVisibleFurry = function () {
    var delClass = document.querySelector(".furry");
    delClass.classList.remove("furry");
  };
  ///////////////////////////////////////////
  this.showCoin = function () {

    this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
  };
  ///////////////////////////////////////////
  this.showEnemy = function () {
    var self = this;
    this.enemy.forEach(function (e) {

      self.board[self.index(e.x, e.y)].classList.add('enemy');
    });
  };
  /////////////////////////////////////////////
  this.moveFurry = function () {
    this.hideVisibleFurry();
    this.hiEnemy();
    if (this.furry.direction === "right") {
      this.furry.x = this.furry.x + 1;
      this.gameOver();
    } else if (this.furry.direction === "left") {
      this.furry.x = this.furry.x - 1;
      this.gameOver();
    } else if (this.furry.direction === "top") {
      this.furry.y = this.furry.y - 1;
      this.gameOver();
    } else if (this.furry.direction === "down") {
      this.furry.y = this.furry.y + 1;
      this.gameOver();
    }
    this.showFurry();
    this.checkCoinCollision();
    this.enemyHit();
  };
  ///////////////////////////////////////////
  this.turnFurry = function (event) {
    var self = this;
    switch (event.which) {
      case 37:
        self.furry.direction = 'left';
        break;
      case 38:
        self.furry.direction = 'top';
        break;
      case 39:
        self.furry.direction = 'right';
        break;
      case 40:
        self.furry.direction = 'down';
        break;
      default:
        self.furry.direction = 'right';
    }
  };
  ///////////////////////////////////////////
  this.checkCoinCollision = function () {
    if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
      var coinClass = document.querySelector(".coin");
      var enemyClass = document.querySelector(".enemy");
      coinClass.classList.remove("coin");
      var scorePoint = document.querySelector('#score div strong');
      this.score = this.score + 1;
      scorePoint.innerText = this.score;
      if (this.score % 1 === 0 && this.coin.x !== this.enemy.x) {
        this.coin = new Coin();
        this.showCoin();
        // enemyClass.classList.remove("enemy");////////////////////////////////////////////////do przeróbki

        this.enemy.push(new Enemy());
        game.showEnemy();

        var ArrEnemy = [];
        ArrEnemy.push(this.enemy);
        console.log(ArrEnemy);
      }
    }
  };

  ///////////////////////////////////////////
  this.gameOver = function () {
    if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
      console.log("gameOver");
      clearInterval(this.idSetInterval);
      var over = document.querySelector('#over');
      over.classList.remove('invisible');
      var scorePointGO = document.querySelector('#over h2 strong');
      this.score = this.score + 1;
      scorePointGO.innerText = this.score - 1;
    }
  };
  ///////////////////////////////////////////


  this.enemyHit = function () {
    var self = this;
    this.enemy.forEach(function (e) {

      if (self.furry.x === e.x && self.furry.y === e.y) {
        clearInterval(self.idSetInterval);
        var over = document.querySelector('#over');
        over.classList.remove('invisible');
        var scorePointGO = document.querySelector('#over h2 strong');
        self.score = self.score + 1;
        scorePointGO.innerText = self.score - 1;
      } else {
        console.log("lala");
      }
    });
  };

  this.hiEnemy = function () {};

  ///////////////////////////////////////////
  this.startGame = function () {
    var self = this;
    this.idSetInterval = setInterval(function () {
      self.moveFurry();
    }, 250);
  };
};

var game = new Game();
game.showFurry();
game.showCoin();
game.showEnemy();
game.startGame();
document.addEventListener('keydown', function (event) {
  game.turnFurry(event);
});
module.exports = Game;

/***/ })
/******/ ]);