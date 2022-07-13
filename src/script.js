// Variables 

const scoreboard = document.getElementById('scoreboard');
const result = document.getElementById('result');
const input = document.getElementById('input');
let score;
let streak;
let difficulty;
let expireTime;
let multiplier;
let lifes;
let highscore = 0;

// Random Key Chooser

function GetRandomInteger() {
    return Math.floor(Math.random()*(25)) + 65;
    // Chooses a random number between 65 and 90, that are the key codes from A to Z
};

function GetRandomKey() {
    keyCode = GetRandomInteger();
    return key = { name: String.fromCharCode(keyCode), code: keyCode }; 
    // Use the random number given by GetRandomInteger() to define the key to be pressed
};

function SetKey() { 
    key = GetRandomKey();
    input.innerHTML = `Press ${key.name}`;
    ClearAllTimeouts();

    return timeout = setTimeout(MissKey, expireTime);
    // Sets a key using GetRandomKey, displays it on the HTML, clears all timeouts from previous keys to be pressed and sets a new one for the key to be pressed
};



// Key Listeners & Checkers


function MissKey() {
    streak = 0;
    lifes -=1;
    result.innerHTML = 'Missed one'

    NextKey();
    // Sets a new key to be pressed, nulify your streak, decreases a life and warns you missed a key
};

function RightKey() {
    result.innerHTML = 'Nice one!';
    score += multiplier;
    streak += 1;
    // You win 1 points times the current difficulty multiplier and your streak is increased by one
};

function WrongKey() {
    result.innerHTML = 'Not that one';
    streak = 0;
    lifes -=1;
    // If you miss a key, you lose your streak and one life
};

function CheckKeyPressed(event) {
    if (event.keyCode == key.code) {
        RightKey();
    }
    else {
        WrongKey();
    }

    NextKey();
    // Checks if the key you pressed is equal to the one solicited, reacting accordingly to the result, and asks for the next key to be pressed
};

window.addEventListener("keydown", CheckKeyPressed); // Listener to key press that accionates the Key Check



// Score and Streak

function UpdateScoreboard() {
    scoreboard.innerHTML = `Score: ${score} | Streak: ${streak} | Time Between Keys: ${expireTime}ms | Difficulty: ${difficulty} | Lifes: ${lifes} | Multiplier: ${multiplier} | Highscore: ${highscore}` ;
    // Change the scoreboard HTML so it shows the current score, streak, time between keys, difficulty, lifes, multiplier and highscore
};

function SaveHighscore() {
    if (score > highscore) {
        highscore = score;
    };

    for (i = 0; i < highscore; i++) {
        localStorage.setItem(storedHighscore, highscore); 
    };
};

var storedHighscore = highscore;

function LoadHistory() {
    highscore = localStorage.getItem(storedHighscore);
    UpdateScoreboard();
} 


// State-of-Play Functions

function ClearAllTimeouts() {
    var id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id);
    }

    // Clears all timeouts that might be active at the time
};

function NextKey() {
    SetKey();
    setDifficulty();
    UpdateScoreboard();
    IncreaseLife(); 
    DidYouLose();
    // Sets a new key to be pressed, checks necessity to change difficulty, checks if you gained a new life and updates the scoreboard
};

function Lose() {
    ClearAllTimeouts();
    SaveHighscore();
    UpdateScoreboard();
    window.removeEventListener("keydown", CheckKeyPressed); // Clear listener to key press so the game stops

    result.innerHTML = "You lost :("

    // Clear all current active timeouts and listeners, updates the scoreboard and alert you lost
};

function Reset() {
    score = 0;
    streak = 0;
    lifes = 3;
    setDifficulty();
    UpdateScoreboard();
    ClearAllTimeouts();
    SetKey();
    window.removeEventListener("keydown", CheckKeyPressed); // Disable previous listeners to key press
    window.addEventListener("keydown", CheckKeyPressed); // Enable a listener to key press to play the game

    result.innerHTML = "Let's Go!"
    // Restarts your score, lifes, streak and the difficulty, the score board is reseted and all timeouts to miss a key that are currently active are cleared
};


//  Life Functions

function DidYouLose() {
    switch (true) {
        case (lifes === 0):
            Lose();
            break;

        case (lifes < 0):
            lifes = 0;
            Lose();
            break;
    };
    // Checks if you lost based on your current life, if you have more than 0, it does nothing and let you keep playing
};

function IncreaseLife() {
    if (streak % 50 === 0 && streak != 0 ) {
        lifes += 1;
    };

    if (lifes > 3) {
        lifes = 3;
    };
    // Every 50 keys pressed in a streak you gain a life, maximum lifes is equal to 3
};


// Difficulty Effects & Causes

function setDifficulty() {
    switch (true) {
        case (streak < 10):
            difficulty = 1;
            break;
        
        case (streak < 100):
            difficulty = 2;
            break;
        
        case (streak < 1000):
            difficulty = 3;
            break;
    
        case (streak > 1000):
            difficulty = 4;
            break;
    
        default:
            console.log('Something went wrong while setting difficulty via score');
    };
    // Checks your current streak to define the difficulty

    switch (difficulty) {
        case 1: 
            expireTime = 5000;
            multiplier = 1;
            break;
    
        case 2:
            expireTime = 3500;
            multiplier = 2;
            break;
        
        case 3:
            expireTime = 2000;
            multiplier = 4;
            break;
    
        case 4:
            expireTime = 1000;
            multiplier = 5;
            break;
        
        case (difficulty <= 0):
            difficulty = 1;
            break;
        
        default:
            console.log('Something went wrong while setting difficulty');
    };
    // Checks the difficulty to change the game settings accordingly
};



// HTML Buttons

// document.getElementById('start').onclick = () => { Reset(); };
// document.body.onload = () => { LoadHistory() + Reset() + ClearAllTimeouts() + UpdateScoreboard() };

console.log('OI');