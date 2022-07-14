import './prompts.css'

class Prompts {
    constructor(key) {
        this.name = `Type${key}`,
        this.type = "Key",
        this.message = `Type the letter ${key}`,
        this.value = 1,
        this.difficulty = "ease",
        this.time = 5000,
        this.prompt = key
    }
}

function Prompt() {
    const randomPrompt = new Prompts("A");
    console.log(randomPrompt.prompt.charCodeAt(0))

    return (
        <div id="prompt">{randomPrompt.message}</div>
    ) 
};

export default Prompt