// Define an array of word puzzles for each level
const puzzles = [
  { hint: "Level 1 Hint: It's my name.", word: 'kobie' },
  { hint: "Level 2 Hint: It's a four-letter word for a sweet treat.", word: 'cake' },
  { hint: "Level 3 Hint: It's a six-letter word for a fluffy pet.", word: 'kitten' },
  { hint: "Level 4 Hint: It's a six-letter word for a popular citrus fruit.", word: 'orange' },
  { hint: "Level 5 Hint: It's a five-letter word for a large vehicle used for transportation.", word: 'truck' },
  { hint: "Level 6 Hint: It's a seven-letter word for a shiny piece of jewelry.", word: 'diamond' },
  { hint: "Level 7 Hint: It's a three-letter word for a small flying insect.", word: 'bee' },
  { hint: "Level 8 Hint: It's a eight-letter word for a frozen dessert.", word: 'icecream' },
  { hint: "Level 9 Hint: It's a five-letter word for a musical instrument with black and white keys.", word: 'piano' },
  { hint: "Level 10 Hint: It's a six-letter word for a hot beverage made from beans.", word: 'coffee' },
  { hint: "Level 11 Hint: It's a four-letter word for a natural satellite of the Earth.", word: 'moon' },
  { hint: "Level 12 Hint: It's a five-letter word for a reptile that slithers.", word: 'snake' },
  { hint: "Level 13 Hint: It's a seven-letter word for a popular social media platform.", word: 'twitter' },
  { hint: "Level 14 Hint: It's a six-letter word for a season between summer and winter.", word: 'autumn' },
  { hint: "Level 15 Hint: It's a three-letter word for a flying mammal.", word: 'bat' },
];

// Set initial level to 1
let currentLevel = 1;
let remainingGuesses = 3;

// Get DOM elements
const levelTitleElement = document.getElementById('level-title');
const jumbledLettersElement = document.getElementById('jumbled-letters');
const puzzleHintElement = document.getElementById('puzzle-hint');
const userInputElement = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const resultMessageElement = document.getElementById('result-message');
const popupContainer = document.getElementById('popup-container');
const popupContent = document.getElementById('popup-content');

// Load the first puzzle
loadPuzzle(currentLevel);

// Function to load a puzzle for a given level
function loadPuzzle(level) {
  const puzzle = puzzles[level - 1];
  levelTitleElement.textContent = `Level ${level}`;
  jumbledLettersElement.textContent = jumbleLetters(puzzle.word);
  puzzleHintElement.textContent = puzzle.hint;
  userInputElement.value = '';
  resultMessageElement.textContent = '';
  submitButton.disabled = false;
  submitButton.removeEventListener('click', handleGuess); // Remove the previous event listener if it exists
  submitButton.addEventListener('click', handleGuess); // Add the event listener for handling the guess
}

// Function to jumble the letters of a word
function jumbleLetters(word) {
  let jumbledWord = '';
  const letters = word.split('');

  while (letters.length > 0) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    jumbledWord += letters.splice(randomIndex, 1)[0];
  }

  return jumbledWord;
}

// Set the audio source URL
const audioSrc = "Audio/audio1.mp3";

// Create the audio element
const audioElement = document.createElement('audio');
audioElement.src = audioSrc;

// Function to play the sound effect
function playSoundEffect() {
  audioElement.currentTime = 0; // Reset the audio to the beginning
  audioElement.play();
}

const successAudioSrc = "Audio/success-1-6297.mp3";
const congratulations  =  "Audio/crowd-cheer-ii-6263.mp3";
const failureAudioSrc  =  "Audio/audio2.mp3";
// Create the audio elements
// Create the audio elements
const successAudioElement = createAudioElement(successAudioSrc);
const failureAudioElement = createAudioElement(failureAudioSrc);
const Congratulations = createAudioElement(congratulations);
function createAudioElement(src) {
  const audioElement = document.createElement('audio');
  audioElement.src = src;
  return audioElement;
}

// Get the success animation element
const successAnimation = document.getElementById('success-animation');

function handleGuess() {
  const userGuess = userInputElement.value.toLowerCase();
  const puzzle = puzzles[currentLevel - 1];

  if (userGuess.trim() === '') {
    resultMessageElement.textContent = 'Walang laman. Sagutan mo!'; // Display message for empty guess
    return; // Exit the function without further processing
  }

  if (userGuess === puzzle.word) {
    resultMessageElement.textContent = 'Correct answer!';
    submitButton.disabled = true;
    successAudioElement.play(); // Play success audio

    // Move to the next level if available
    if (currentLevel < puzzles.length) {
      currentLevel++;
      setTimeout(() => loadPuzzle(currentLevel), 1600);
    } else {
      // Show congratulations popup message for completing all levels
      resultMessageElement.textContent = '';
      Congratulations.play();
      showPopupMessage("Congratulations!", "You completed all levels.");
      
    }
  } else {
    resultMessageElement.textContent = 'Baket🤸bobo🤸ang🤸beshy🤸ko. Try again.';
    failureAudioElement.play(); // Play failure audio

    // Decrement the guess count and disable the submit button if the user has no more attempts
    remainingGuesses--;
    if (remainingGuesses === 0) {
      submitButton.disabled = true;
      // Show failure popup message
      resultMessageElement.textContent = '';
      showPopupMessage("Game Over", "You failed to guess the word after 3 attempts.");
    }
  }
}

// Add event listener to close the popup message
popupContainer.addEventListener('click', hidePopupMessage);

// Function to show the popup message
function showPopupMessage(title, message) {
  popupContent.querySelector('h2').textContent = title;
  popupContent.querySelector('p').textContent = message;
  popupContainer.classList.remove('hidden');
}

function hidePopupMessage() {
  popupContainer.classList.add('hidden');
}
// Get the dark mode toggle checkbox element
const darkModeToggle = document.getElementById('dark-mode-toggle-checkbox');

// Get the body element
const body = document.body;

// Function to toggle dark mode
function toggleDarkMode() {
  // Toggle the 'dark-mode' class on the body element
  body.classList.toggle('dark-mode');
}

// Event listener for dark mode toggle
darkModeToggle.addEventListener('change', toggleDarkMode);
