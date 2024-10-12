let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHigh = document.querySelector(".lowOrHigh");
const startOver = document.querySelector(".resultParas");

const p = document.createElement('p');

let prevGuess = [];
let numOfGuesses = 1;
let playGame = true;

const form = document.querySelector('.form'); // Handle the form submit

// Listen to form submit, not button click
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting/reloading
    if (playGame) {
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    }
});

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please enter a valid number");
    } else if (guess < 1) {
        alert("Please enter a number greater than 1");
    } else if (guess > 100) {
        alert("Please enter a number less than 100");
    } else {
        prevGuess.push(guess);
        if (numOfGuesses === 11) {
            cleanupGuess(guess);
            displayMessage(`Game over. The random number was ${randomNumber}`);
            endGame();
        } else {
            cleanupGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage("You guessed it right!");
        endGame();
    } else if (guess < randomNumber) {
        displayMessage("The number is TOO low");
    } else {
        displayMessage("The number is TOO high");
    }
}

function cleanupGuess(guess) {
    userInput.value = ''; // Clear input
    guessSlot.innerHTML += `${guess} `; // Display all guesses
    numOfGuesses++;
    remaining.innerHTML = `${11 - numOfGuesses}`; // Correct remaining guesses
}

function displayMessage(message) {
    lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = ''; // Clear input
    userInput.setAttribute('disabled', ''); // Disable input
    p.classList.add('button');
    p.innerHTML = `<h2 id='newGame'>Start New Game</h2>`;
    startOver.appendChild(p);
    playGame = false;

    // Move the event listener for the new game button here
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function() {
        newGame();
    });
}

function newGame() {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numOfGuesses = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = '10'; // Reset remaining guesses
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
}
