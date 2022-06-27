// Variables 

let scoreboard;
let score = 0;
let streak = 0;
let keyName = getRandomKey();

// Random Key Chooser

function getRandomInteger() {
    return Math.floor(Math.random() * (25) ) + 65;
};

function getRandomKey() {
    keyCode = getRandomInteger();
    return key = { keyName: String.fromCharCode(keyCode), keyCode: keyCode }; 
}

//

console.log(`Press ${keyName}`)

window.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(event) {
    if (event.keyCode == '65') {
        console.log('Congrats');
    }
    else {
        console.log('Not that one')
    }
}