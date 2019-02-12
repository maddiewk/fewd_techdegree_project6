// global HTML elements
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
const lives = document.getElementsByClassName('tries');
let missed = 0;

// hide start screen overlay
const startScreen = document.getElementById('overlay');
const restartButton = document.querySelector('.btn__reset');

restartButton.addEventListener('click', function() {
  startScreen.style.display = 'none';
});

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
// split the chosen phrase into a new array of characters
// return the new character array

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

// call functions defined above to show phrase length on screen
const phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray);


function checkLetter(button) {
  const letts = document.getElementsByClassName('letter');
  let newArray = Array.from(letts);

  for (let i = 0; i < newArray.length; i++) {
    if (button.textContent === newArray[i].textContent) {
      newArray[i].classList.add('show');
    }
  }
  return newArray;
}

keyboard.addEventListener('click', function(e) {
  let userBtn = e.target;
  if (e.target.tagName === 'BUTTON') {
    userBtn.classList.add('chosen');
  }
  let letterFound = checkLetter(userBtn);
  // work on this !!!!!!!!
  if (letterFound === null) {
    // remove a try from the board
    missed+= 1;
    console.log("Null");
  }
  return letterFound;

});
