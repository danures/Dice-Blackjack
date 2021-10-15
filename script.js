'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl1 = document.querySelector('.dice1');
const diceEl2 = document.querySelector('.dice2');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, playing, finalScores, currentScores, finishedTurn;

//Starting conditions
const init = function () {
  finalScores = [0, 0];
  currentScores = [0, 0];
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl1.classList.add('hidden');
  diceEl2.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//Switch active player
const switchPlayer = function () {
  
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
    
};


const rollDice = function () {
    if (playing) {
        //Generating a random dice roll
        const dice1 = Math.trunc(Math.random() * 6) + 1;
        const dice2 = Math.trunc(Math.random() * 6) + 1;
        const dice = dice1 + dice2;
        if (finishedTurn) newRound();

        //Display dice
        diceEl1.classList.remove('hidden');
        diceEl2.classList.remove('hidden');
        diceEl1.src = `dice-${dice1}.png`;
        diceEl2.src = `dice-${dice2}.png`;
        // Rolling dice functionality
        if (currentScores[activePlayer] + dice < 21) {

            currentScores[activePlayer] += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScores[activePlayer];

        } else if (currentScores[activePlayer] + dice === 21) {
            currentScores[activePlayer] += dice;
            finalScores[activePlayer] += 1;
            document.getElementById(`current--${activePlayer}`).textContent = currentScores[activePlayer];
            document.getElementById(`score--${activePlayer}`).textContent = finalScores[activePlayer];
            finishedTurn = true;
        } 
        else {
            currentScores[activePlayer] += dice;
            document.getElementById(`current--${activePlayer}`).textContent = "Bust!";
            activePlayer === 0 ? finalScores[1] += 1 : finalScores[0] += 1;
            document.getElementById(`score--0`).textContent = finalScores[0];
            document.getElementById(`score--1`).textContent = finalScores[1];
            finishedTurn = true;
        }
        finishGame();
    }
};

//Computer's turn to play
const compTurn = async function () {

    while (currentScores[0] > currentScores[1]) {
        rollDice();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    if (currentScores[1] > currentScores[0] && currentScores[1] <= 21) {
        finalScores[1] += 1;
        document.getElementById(`score--${activePlayer}`).textContent = finalScores[1];
    } else if (currentScores[1] < currentScores[0]){
        finalScores[0] += 1;
        document.getElementById(`score--${activePlayer}`).textContent = finalScores[0];
    }
    finishedTurn = true;
};


btnRoll.addEventListener('click', function () {
    rollDice();
});

btnHold.addEventListener('click', function () {
    if (playing && activePlayer === 0) {
        switchPlayer();
        compTurn();
    }
});

  
const finishGame = function () {
    // Finish the game
    if (finalScores[0] >= 5 || finalScores[1] >= 5) {
        playing = false;
        diceEl1.classList.add('hidden');
        diceEl2.classList.add('hidden');

        if (finalScores[0] > finalScores[1]) {
            document.querySelector(`.player--0`).classList.add('player--winner');
            document.querySelector(`.player--0`).classList.remove('player--active');
        } else {
            document.querySelector(`.player--1`).classList.add('player--winner');
            document.querySelector(`.player--1`).classList.remove('player--active');
        }
    }
};

//Set up a new round
const newRound = function () {
    diceEl1.classList.add('hidden');
    diceEl2.classList.add('hidden');
    finishedTurn = false;
    currentScores = [0, 0];
    if (activePlayer === 1) switchPlayer();
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
};

//New game button
btnNew.addEventListener('click', init);






