// global HTML elements
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUL = document.querySelector('#phrase ul');
const scoreboard = document.getElementById('scoreboard');
const lives = document.getElementsByClassName('tries');
const heart = document.querySelectorAll('.tries img');
const headline = document.querySelector('.title');
const phraseLetters = document.getElementsByClassName('letter');
const phraseSpaces = document.getElementsByClassName('space');
const keyRow = document.getElementsByClassName('keyrow');
const keyButton = document.querySelectorAll('.keyrow button');
const visLetters = document.getElementsByClassName('show');
const startScreen = document.getElementById('overlay');
const restartButton = document.querySelector('.btn__reset');
let missed = 0;

// phrases array
const phrases = [
  'A stitch in time saves nine',
  'You are what you eat',
  'Curiosity killed the cat',
  'Diamond in the rough',
  'Great minds think alike',
  'Hit the ground running',
  'Mind your Ps and Qs',
  'Break a leg',
  'Snug as a bug in a rug'
];

// function that randomly chooses a phrase from the phrases array
function getRandomPhraseArray(arr) {
  let randomNumber = Math.floor(Math.random() * phrases.length);
  let randomPhrase = phrases[randomNumber].toLowerCase();
  let splitPhrase = randomPhrase.split('');
  return splitPhrase;
}

// function that adds random phrase to the screen
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    let letter = document.createElement('li');
    letter.textContent = arr[i];
    phrase.appendChild(letter);
    if (letter.textContent.includes(' ')) {
      letter.classList.add('space');
    } else {
      letter.classList.add('letter');
    }
  }
}

function checkLetter(button) {
  const letts = document.getElementsByClassName('letter');
  let newArray = Array.from(letts);
  let check = 'null';

  for (let i = 0; i < newArray.length; i++) {
    if (button.textContent === newArray[i].textContent) {
      newArray[i].classList.add('show');
      check = true;
    }
  }
  return check;
}

// -----> Extra credit: reset the board after one game is played
// take away phrase and replace it with new random phrase
// reset keyboard so that no keys are 'chosen'
// hide the letters in the phrase
// ----------------------------> //

// reset keyboard
function resetKeyboard() {

}

// replace lives
function restoreLives() {
  for (let i = 0; i < lives.length; i++) {
    if (lives[i].innerHTML === '<img src="images/lostHeart.png" height="35px" width="30px">') {
      lives[i].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
    }
  }
}

// remove previous letters
function removeLetter() {
  for (let i = 0; i < phraseLetters.length; i++) {
    if (phraseLetters[i].classList.contains('letter')) {
      phraseLetters[i].classList.remove('show');
    }
  }
}

// remove previous spaces?
function removeSpaces() {
  for (let i = 0; i < phraseSpaces.length; i++) {
    if (phraseSpaces[i].classList.contains('space')) {
      phraseSpaces[i].classList.remove('show');
    }
  }
}

// call above functions and reset the game
function resetGame() {
  // set missed variable back to 0
  missed = 0;
  removeLetter();
  removeSpaces();
  resetKeyboard();
  restoreLives();
}

// check for a win each time the player presses a button
function checkWin() {
  // check if number of letters with class 'show' is equal to the number of letters with class 'letters'
  if (phraseLetters.length === visLetters.length) {
    startScreen.style.display = 'block';
    startScreen.className = 'win';
    headline.innerHTML = 'You win!';
  }
  if (missed >= 5) {
    startScreen.style.display = 'block';
    startScreen.className = 'lose';
    headline.innerHTML = 'Game Over!'
  }
}

// clicking button on start screen resets/starts game
restartButton.addEventListener('click', function() {
  startScreen.style.display = 'none';
  const phraseArray = getRandomPhraseArray(phrases);
  addPhraseToDisplay(phraseArray);

// if keys have been clicked, reset the game
for (let i = 0; i < keyButton.length; i++) {
  if (keyButton[i].classList == 'chosen') {
    resetGame();
  }
}

});

keyboard.addEventListener('click', function(e) {

  let userBtn = e.target;
  if (e.target.tagName === 'BUTTON') {
    userBtn.classList.add('chosen');
  }
  let letterFound = checkLetter(userBtn);

  if (letterFound == 'null' && e.target.tagName === 'BUTTON') {
    // remove a try from the board
    missed++;
    lives[missed-1].innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`;
  }
  checkWin();
  return letterFound;
});
