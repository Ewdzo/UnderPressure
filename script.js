// Variables 

const scoreboard = document.getElementById('scoreboard');
const result = document.getElementById('result');
const input = document.getElementById('input');
let score = 0;
let streak = 0;
let multiplier;
let expireTime = 5000;
let difficulty = 1;
let lifes = 3;

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
    // Sets a key using GetRandomKey, displays it on the HTML, clears all timeouts from previous keys to be pressed and defines a new one to the key to be pressed
};



// Key Listeners & Checkers

function NewKey() {
    SetKey();
    setDifficulty();
    UpdateScoreboard(); 
    DidYouLose();
    // Sets a new key to be pressed, checks necessity to change difficulty and updates the scoreboard
};


function MissKey() {
    streak = 0;
    lifes -=1;
    result.innerHTML = 'Missed one'

    NewKey();
    // Sets a new key to be pressed, nulify your streak, updates the scoreboard, decreases a life and warns you missed a key
};

function RightKey() {
    result.innerHTML = 'Nice one!';
    IncreaseScore(multiplier);
    streak += 1;
    // If you get a key right, you win 1 points times your streak, your streak is increased by one and the difficulty is increased
};

function WrongKey() {
    result.innerHTML = 'Not that one';
    streak = 0;
    lifes -=1;
    // If you miss a key, you lose your streak, but not points
};

function CheckKeyPressed(event) {
    if (event.keyCode == key.code) {
        RightKey();
    }
    else {
        WrongKey();
    }

    NewKey();
    // Checks if the key you pressed is equal to the one solicited, reacting accordingly to the result, defines a new key to be pressed and updates your scoreboard
};

window.addEventListener("keydown", CheckKeyPressed); // Listener to key press that accionates the Key Check



// Score and Streak

function IncreaseScore(points) {
    if (points > 0) {
        score += points;
    } 
    else {
        score += 1;
    }
    // Increases your score in one point, if the points to be increased is zero is increases one instead
};

function UpdateScoreboard() {
    scoreboard.innerHTML = `Score: ${score} | Streak: ${streak} | Time Between Keys: ${expireTime}ms | Difficulty: ${difficulty} | Lifes: ${lifes}` ;
    // Change the scoreboard HTML so it shows the current score and streak
};



// State-of-Play Functions

function ClearAllTimeouts() {
    var id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id);
    }

    // Clears all timeouts that might be active at the time
};

function Lose() {
    ClearAllTimeouts();
    UpdateScoreboard();
    // WIP - SaveScore();
    window.removeEventListener("keydown", CheckKeyPressed); // Clear listener to key press so the game stops

    result.innerHTML = "You lost :("
};

function Reset() {
    score = 0;
    streak = 0;
    lifes = 3;
    UpdateScoreboard();
    ClearAllTimeouts();
    SetKey();
    window.removeEventListener("keydown", CheckKeyPressed); // Clear previous listeners to key press
    window.addEventListener("keydown", CheckKeyPressed); // Listener to key press that accionates the Key Check

    result.innerHTML = "Let's Go!"
    // Restarts the game, you score and streak are nulified, the score board is reseted and all timeouts to miss a key that are currently active are cleared
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
};


// Difficulty Effects & Causes

function setDifficulty() {
    switch (true) {
        case (streak < 10):
            difficulty = 1;
            break;
        
        case (streak < 350):
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

    switch (difficulty) {
        case 1: 
            expireTime = 50;
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
};



// HTML Buttons

document.getElementById('start').onclick = () => { Reset() };
document.getElementById('reset').onclick = () => { Reset() };