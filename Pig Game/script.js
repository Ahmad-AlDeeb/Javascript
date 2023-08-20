'use strict';
////////////////// Variables //////////////////
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
let activePlayer = 0;
let currentScore = 0;
let playing = true;

////////////////// functions //////////////////
function showDice(num) {
  dice.src = `dice-${num}.png`;
  dice.classList.remove('hidden');
}
function changeCurrent(value) {
  currentScore += value;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}
function resetCurrent() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}
function switchPlayer() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  activePlayer = Number(!activePlayer);

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
}
function resetGame() {
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
}

////////////////// Starting condition //////////////////
resetGame();

////////////////// Rolling the dice //////////////////
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    showDice(diceNumber);

    if (diceNumber == 1) {
      resetCurrent();
      switchPlayer();
    } else changeCurrent(diceNumber);
  }
});

////////////////// holding the current //////////////////
btnHold.addEventListener('click', function () {
  if (playing) {
    let playerScore = Number(
      document.querySelector(`#score--${activePlayer}`).textContent
    );
    playerScore += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = playerScore;
    resetCurrent();

    if (playerScore >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else switchPlayer();
  }
});

////////////////// Making New Game //////////////////
btnNew.addEventListener('click', resetGame);
