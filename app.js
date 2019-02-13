// global HTML elements
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUL = document.querySelector('#phrase ul');
const scoreboard = document.getElementById('scoreboard');
const lives = document.getElementsByClassName('tries');
const headline = document.querySelector('.title');
const phraseLetters = document.getElementsByClassName('letter');
const phraseSpaces = document.getElementsByClassName('space');
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

// function that loops through an array of characters
// inside the loop, for each character in the array, create a list item, put
// the character inside the list item, and append that list item to the #phrase ul
// in your HTML.
// if the character in the array is a letter the function should add the class
// "letter" to the list item

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

// remove previous phrase
function removePhrase() {
  for (let i = 0; i < phraseLetters.length; i++) {
    phraseUL.removeChildElement(phraseLetters[i]);
  }

}

// function to reset the game
function resetGame() {
  missed = 0;
  // removePhrase();
}

// check for a win each time the player presses a button
function checkWin() {
  // check if number of letters with class 'show' is equal to the number of letters with class 'letters'
  if (phraseLetters.length === visLetters.length) {
    startScreen.style.display = 'block';
    startScreen.className = 'win';
    headline.innerHTML = 'You Win!!';
  }
  if (missed >= 5) {
    startScreen.style.display = 'block';
    startScreen.className = 'lose';
    headline.innerHTML = 'Game Over!'
  }
}

// clicking button on start screen resets/starts game
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
restartButton.addEventListener('click', function() {
  startScreen.style.display = 'none';
  const phraseArray = getRandomPhraseArray(phrases);
  addPhraseToDisplay(phraseArray);
  resetGame();
});

keyboard.addEventListener('click', function(e) {

  let userBtn = e.target;
  if (e.target.tagName === 'BUTTON') {
    userBtn.classList.add('chosen');
  }
  let letterFound = checkLetter(userBtn);

  if (letterFound == 'null') {
    // remove a try from the board
    missed++;
    lives[missed-1].innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`;
  }
  checkWin();
  return letterFound;
});
