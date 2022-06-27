// Variables 

const scoreboard = document.getElementById('scoreboard');
const result = document.getElementById('result');
const input = document.getElementById('input');
let score = 0;
let streak = 0;
let key;

// Score and Streak

function IncreaseScore(points) {
    if (points > 0) {
        score += points;
    } 
    else {
        score += 1;
    }
};

function updateScoreboard() {scoreboard.innerHTML = `Score: ${score} | Streak: ${streak};`};

function reset () {
    score = 0;
    streak = 0;
}

// Random Key Chooser

function getRandomInteger() {
    return Math.floor(Math.random()*(25)) + 65;
};

function getRandomKey() {
    keyCode = getRandomInteger();
    return key = { name: String.fromCharCode(keyCode), code: keyCode }; 
}

// Key Chooser 

function setKey() { 
    key = getRandomKey();
    input.innerHTML = `Press ${key.name}`;
};

// Key Press Listener

window.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(event) {
    if (event.keyCode == key.code) {
        result.innerHTML = 'Nice one!';
        IncreaseScore(streak)
        streak += 1;
    }
    else {
        result.innerHTML = 'Not that one';
        streak = 0;
    }
    setKey();
    updateScoreboard();
}

// First Run

document.getElementById('start').onclick = () => { setKey() + reset() + updateScoreboard(); };