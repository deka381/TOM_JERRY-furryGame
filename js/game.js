var Coin = require("./coin.js");
var Furry = require("./furry.js");
var Enemy = require("./enemy.js");

    var Game = function(){
      this.board=[...document.querySelectorAll("section#board div")];
      this.furry=new Furry();
      this.coin=new Coin();
      this.enemy=[];
      this.score=0;
//////////////////////////////
      this.index = function(x,y){
        return x + (y * 10);
      }
///////////////////////////////////////////
      this.showFurry = function() {
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
       }
///////////////////////////////////////////

      this.hideVisibleFurry = function() {
         var delClass = document.querySelector(".furry");
          delClass.classList.remove("furry");
        }
///////////////////////////////////////////
      this.showCoin = function() {

        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
      }
///////////////////////////////////////////
      this.showEnemy = function() {
        const self=this;
        this.enemy.forEach(function(e){

          self.board[ self.index(e.x,e.y) ].classList.add('enemy');
        })
       }
 /////////////////////////////////////////////
      this.moveFurry = function() {
        this.hideVisibleFurry();
        this.hiEnemy();
        if(this.furry.direction === "right") {
          this.furry.x = this.furry.x + 1;
          this.gameOver();
        } else if ( this.furry.direction === "left"){
          this.furry.x = this.furry.x - 1;
          this.gameOver();
        }else if (this.furry.direction === "top") {
          this.furry.y = this.furry.y - 1;
          this.gameOver();
        }else if (this.furry.direction === "down") {
          this.furry.y = this.furry.y + 1;
          this.gameOver();
        }
        this.showFurry();
        this.checkCoinCollision();
        this.enemyHit();

      }
///////////////////////////////////////////
      this.turnFurry = function(event) {
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
          default: self.furry.direction = 'right';
        }
      }
///////////////////////////////////////////
      this.checkCoinCollision=function () {
        if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
          var coinClass = document.querySelector(".coin");
          var enemyClass = document.querySelector(".enemy");
          coinClass.classList.remove("coin");
          var scorePoint=document.querySelector('#score div strong');
          this.score= this.score + 1;
          scorePoint.innerText=this.score;
          if ((this.score%1===0) && (this.coin.x !== this.enemy.x) ) {
            this.coin = new Coin;
            this.showCoin();
            // enemyClass.classList.remove("enemy");////////////////////////////////////////////////do przeróbki

            this.enemy.push(new Enemy());
            game.showEnemy();

            let ArrEnemy=[];
            ArrEnemy.push(this.enemy);
            console.log(ArrEnemy);

          }
        }
      }

///////////////////////////////////////////
      this.gameOver=function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y>9) {
          console.log("gameOver");
          clearInterval(this.idSetInterval);
          var over = document.querySelector('#over');
          over.classList.remove('invisible');
          var scorePointGO=document.querySelector('#over h2 strong');
          this.score= this.score + 1;
          scorePointGO.innerText=this.score -1 ;
        }
      }
///////////////////////////////////////////


        this.enemyHit=function () {
          const self=this;
          this.enemy.forEach(function (e) {

          if((self.furry.x === e.x) && (self.furry.y === e.y) ){
            clearInterval(self.idSetInterval);
            var over = document.querySelector('#over');
            over.classList.remove('invisible');
            var scorePointGO=document.querySelector('#over h2 strong');
            self.score= self.score + 1;
            scorePointGO.innerText=self.score -1 ;
          }else{
            console.log("lala");
          }
        });
        }

        this.hiEnemy=function () {

        }











///////////////////////////////////////////
      this.startGame = function() {
        var self=this;
        this.idSetInterval=setInterval(function () {
          self.moveFurry();
        }, 250);
      }
    }








var game = new Game();
game.showFurry();
game.showCoin();
game.showEnemy();
 game.startGame();
 document.addEventListener('keydown',function(event){
    game.turnFurry(event);
 });
module.exports = Game;
