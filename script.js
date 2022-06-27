// Concept 

const keyName = 'any key';

console.log(`Press ${keyName}`)

document.addEventListener("keydown", GotIt)

function GotIt() {
    console.log(`You got it!`)
}