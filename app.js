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
const clickedKeys = document.getElementsByClassName('chosen');
const startScreen = document.getElementById('overlay');
const restartButton = document.querySelector('.btn__reset');
let missed = 0;

// phrases array
const phrases = [
  'Mind over matter',
  'You are what you eat',
  'Curiosity killed the cat',
  'Diamond in the rough',
  'Over the moon',
  'Hit the ground running',
  'Mind your Ps and Qs',
  'Break a leg',
  'Snug as a bug in a rug'
];

// randomly choose a phrase from phrases array
const getRandomPhraseArray = (arr) => {
  let randomNumber = Math.floor(Math.random() * phrases.length);
  let randomPhrase = phrases[randomNumber].toLowerCase();
  let splitPhrase = randomPhrase.split('');
  return splitPhrase;
}

// add random phrase to the screen
const addPhraseToDisplay = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let letter = document.createElement('li');
    letter.textContent = arr[i];
    phrase.appendChild(letter);

    if (letter.textContent.includes(' ')) {
      letter.classList.add('space');
      letter.classList.add('short');
    } else {
      letter.classList.add('letter');
    }
    if (arr.length > 23 && letter.classList == 'letter') {
      letter.classList.add('small');
    }
  }
}

// match keys user clicks to letters in the random phrase
const checkLetter = (button) => {
  const letts = document.getElementsByClassName('letter');
  let newArray = Array.from(letts);
  let show = 'null';

  for (let i = 0; i < newArray.length; i++) {
    if (button.textContent === newArray[i].textContent) {
      newArray[i].classList.add('show');
      show = true;
    }
  }
  return show;
}

// reset keyboard
const resetKeyboard = () => {
  for (let i = 0; i < keyButton.length; i++) {
    if (keyButton[i].classList.contains('chosen')) {
      keyButton[i].classList.remove('chosen');
    }
  }
  let disabledKeys = document.getElementsByTagName('button');
  Array.from(disabledKeys).forEach(disabledKeys => disabledKeys.disabled = false);
}

// replace lives
const restoreLives = () => {
  for (let i = 0; i < lives.length; i++) {
    if (lives[i].innerHTML === '<img src="images/lostHeart.png" height="35px" width="30px">') {
      lives[i].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
    }
  }
}

// remove clicked keys
const blankKeys = () => {
  let clearKeys = Array.from(clickedKeys).map(key => key.classList.remove('chosen'));
  let clearLetters = Array.from(phraseLetters).map(letter => letter.classList.remove('show'));
  let clearSpaces = Array.from(phraseSpaces).map(space => space.classList.remove('show'));
}

// remove previous phrase from the board
const erasePhrase = () => {
  let oldPhrase = Array.from(phraseLetters);
  oldPhrase.map(phrase => phrase.remove());
  let blankSpace = Array.from(phraseSpaces);
  blankSpace.map(space => space.remove());
}

// reset the game
const resetGame = () => {
  missed = 0;
  resetKeyboard();
  restoreLives();
  erasePhrase();
  blankKeys();
}

// check for a win each time the player presses a button
const checkWin = () => {
  if (phraseLetters.length === visLetters.length) {
    startScreen.style.display = 'flex';
    startScreen.className = 'win';
    headline.innerHTML = 'You win!';
  }
  if (missed >= 5) {
    startScreen.style.display = 'flex';
    startScreen.className = 'lose';
    headline.innerHTML = 'Game Over!'
  }
}

// clicking button on start screen resets/starts game
restartButton.addEventListener('click', function() {
  startScreen.style.display = 'none';
  resetGame();
  const phraseArray = getRandomPhraseArray(phrases);
  addPhraseToDisplay(phraseArray);
});

// listen for keyboard clicks
keyboard.addEventListener('click', function(e) {
  let userBtn = e.target;

  if (e.target.tagName === 'BUTTON') {
    userBtn.classList.add('chosen');
    userBtn.disabled = true;
  }
  let letterFound = checkLetter(userBtn);

  if (letterFound == 'null' && e.target.tagName === 'BUTTON') {
    missed++;
    lives[missed-1].innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`;
  }
  checkWin();
  return letterFound;
});
