const promptTypes = [ 'key', 'word', 'phrase', 'button' ];

class ButtonPrompts {
    constructor(button) {
        this.name = `TypePhrase${button}`
        this.type = "Button",
        this.message = `Type the work ${button}`,
        this.value = 1,
        this.difficulty = "easy",
        this.time = 500
    }
}

class KeyPrompts {
    constructor(key) {
        this.name = `Type${key}`,
        this.type = "Key",
        this.message = `Type the letter ${key}`,
        this.value = 1,
        this.difficulty = "easy",
        this.time = 5000,
        this.code = key.charCodeAt(0)
    };
};

class WordPrompts {
    constructor(word) {
        this.name = `TypeWord${word}`
        this.type = "Word",
        this.message = `Type the work ${word}`,
        this.value = 5,
        this.difficulty = "medium",
        this.time = 10000
    }
}

class PhrasePrompts {
    constructor(phrase) {
        this.name = `TypePhrase${word}`
        this.type = "Phrase",
        this.message = `Type the work ${word}`,
        this.value = 10,
        this.difficulty = "hard",
        this.time = 15000
    }
}

function generatePrompt(type) {

    if(type == 'key') {
        const randomNumber = (Math.floor(Math.random()*(25)) + 65);
        const randomLetter = String.fromCharCode(randomNumber);
        const randomPrompt = new KeyPrompts(randomLetter);
        return (randomPrompt);
    };

};

export default generatePrompt