import './prompts.css'

class Prompts {
    constructor(key) {
        this.name = `Type${key}`,
        this.type = "Key",
        this.message = `Type the letter ${key}`,
        this.value = 1,
        this.difficulty = "easy",
        this.time = 5000,
        this.prompt = key
    }
}

function Prompt() {
    const randomLetter = String.fromCharCode(Math.floor(Math.random()*(25)) + 65);
    const randomPrompt = new Prompts(randomLetter);

    return (
        randomPrompt
    ) 
};

export default Prompt