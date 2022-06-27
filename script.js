// Variables 

let scoreboard;
let score = 0;
let streak = 0;
let key;

// Random Key Chooser

function getRandomInteger() {
    return Math.floor(Math.random() * (25) ) + 65;
};

function getRandomKey() {
    keyCode = getRandomInteger();
    return key = { name: String.fromCharCode(keyCode), code: keyCode }; 
}

// Key Chooser 

function setKey() { 
    key = getRandomKey();
    console.log(`Press ${key.name}`);
};

// Key Press Listener

window.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(event) {
    if (event.keyCode == key.code) {
        console.log('Congrats');
    }
    else {
        console.log('Not that one')
    }
    setKey();
}

// First Run

setKey();