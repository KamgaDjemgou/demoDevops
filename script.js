'use strict';

const currentDice = document.querySelector(".dice");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold     = document.querySelector(".btn--hold");
const btnNewGame  = document.querySelector(".btn--new");
let gameover      = false;

const player1 = {
    totalScore   : 0,
    currentScore : 0,

    hold         : function(){
        this.totalScore += this.currentScore;
        document.querySelector("#score--0").textContent
        = this.totalScore;

        this.currentScore = 0;
        document.querySelector("#current--0").textContent 
        = this.currentScore;
    },

    setCurrentScore: function(newScore){
        
        this.currentScore += newScore;
        document.querySelector("#current--0").textContent 
        = this.currentScore;
    },

    setActive: function(){
        document.querySelector(".player--0").
        classList.add("player--active")
    },
    setPassive: function(){
        document.querySelector(".player--0").
        classList.remove("player--active")
    },

    wins: function(){
        document.querySelector(".player--0").
        classList.add("player--winner")
    },

    reset: function(){
        this.totalScore = 0;
        this.currentScore = 0;

        document.querySelector("#score--0").textContent 
        = this.totalScore;
        document.querySelector("#current--0").textContent 
        = this.currentScore;
        this.setActive();

        document.querySelector(".player--0").
        classList.remove("player--winner")
        
    }
};

const player2 = {
    totalScore   : 0,
    currentScore : 0,

    hold         : function(){
        this.totalScore += this.currentScore;
        document.querySelector("#score--1").textContent
        = this.totalScore;

        this.currentScore = 0;
        document.querySelector("#current--1").textContent 
        = this.currentScore;
    },
    setCurrentScore: function(newScore){
        
        this.currentScore += newScore;
        document.querySelector("#current--1").textContent 
        = this.currentScore;
    },
    setActive: function(){
        document.querySelector(".player--1").
        classList.add("player--active")
    },
    setPassive: function(){
        document.querySelector(".player--1").
        classList.remove("player--active")
    },

    wins: function(){
        document.querySelector(".player--1").
        classList.add("player--winner")
    },

    reset: function(){
        this.totalScore = 0;
        this.currentScore = 0;

        document.querySelector("#score--1").textContent 
        = this.totalScore;
        document.querySelector("#current--1").textContent 
        = this.currentScore;
        document.querySelector(".player--1").
        classList.remove("player--winner")
        this.setPassive();
    }
};

let currentPlayer = player1;


const switchPlayer = function(){
    currentPlayer.setPassive();

    if(currentPlayer === player1){
        currentPlayer = player2;
    }else{
        currentPlayer = player1;
    }

    currentPlayer.setActive();
};

btnRollDice.addEventListener("click", function(){
    if(!gameover){
        const diceNumber = Math.trunc(Math.random()*6) + 1;

        const diceName = `dice-${diceNumber}.png`;
        currentDice.setAttribute("src", diceName);
        currentDice.classList.remove("hidden");

        if(diceNumber !== 1){ 
            currentPlayer.setCurrentScore(diceNumber);
        }else{
            currentPlayer.currentScore = 0;
            currentPlayer.hold();

            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function(){
    if(!gameover){
        currentPlayer.hold();

        if(currentPlayer.totalScore >= 100){
            currentPlayer.wins();
            gameover = true;
        }else{
            switchPlayer();
        }
    }
});


//Reset the game
btnNewGame.addEventListener("click", function(){
    player1.reset();
    player2.reset();
    currentDice.classList.add("hidden");
    gameover = false;
})