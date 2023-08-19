'use strict';
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
function setMsg(msg) {
  document.querySelector('.message').textContent = msg;
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // when no input
  if (!guess) document.querySelector('.message').textContent = '⛔ No number!';
  // When player wins
  else if (guess === secretNumber) {
    setMsg(`🎉 Right answer!`);
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  }

  // when player guess wrong
  else {
    if (!score) setMsg('😭 Game Over!');
    else {
      document.querySelector('.score').textContent = --score;
      setMsg(guess > secretNumber ? '👆 Too high!' : '👇 Too low!');
    }
  }
});

document.querySelector('.btn').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#222';
  setMsg(`Start guessing...`);
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  score = 20;
  document.querySelector('.score').textContent = score;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
});
