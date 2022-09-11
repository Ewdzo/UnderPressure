const promptWords = ['aglet', 'agile', 'adventure', 'Alabasta', 'absolute', 'Brook', 'brownish', 'Baratie', 'backpack', 'Blackbeard', 'Chopper', 'cringe', 'cronometer', 'cascade', 'clockwork', 'Dressrosa', 'dangerous', 'dinasty', 'demogorgon', 'demonic', 'Elbaf', 'elucity', 'episode', 'energic', 'epifany', 'facility', 'Franky', 'fiesta', 'factoid', 'firefighter', 'gamer', 'Gastino', 'gangster', 'guillotine', 'gnocchi', 'Hancock', 'hammer', 'habitant', 'hemoglobin', 'hertz', 'indigo', 'Inuarashi', 'island', 'icon', 'ideal', 'Jinbe', 'jacket', 'jetpack', 'join', 'justify', 'Kozuki', 'Kaido', 'know', 'keynote', 'knot', 'Luffy', 'Loguetown', 'level', 'liberty', 'light', 'Marineford', 'machine', 'monkey', 'monster', 'multiplier', 'Nami', 'nanometer', 'necromancer', 'night', 'Newgate', 'objectivism', 'ocean', 'ocular', 'omnipotent', 'Onigashima', 'Poneglyph', 'paint', 'paleozoic', 'peppermint', 'perfect', 'queue', 'quote', 'quitter', 'quiz', 'quantum', 'Robin', 'rocket', 'rampage', 'racoon', 'restless', 'Sogeking', 'Sanji', 'sample', 'sugestive', 'Skypiea', 'thousand', 'time', 'tempest', 'temperature', 'Teach', 'Usopp', 'unity', 'ukulele', 'ultimate', 'Uranus', 'Vinsmoke', 'vintage', 'volcano', 'volume', 'voice', 'Whitebeard', 'Wano', 'water', 'wedding', 'waypoint', 'Xebec', 'xenobiotic', 'xenophobic', 'x-ray', 'Xerxes', 'Zoro', 'zoomer', 'zucchini', 'zebra', 'zombie'];

const textToCode = (text) => {
    const charArray = [];

    for(let i=0; i < text.length; i++) {
        charArray.push(text.toUpperCase().charCodeAt(i))
    };

    return charArray;
};
class ButtonPrompt {
    constructor(button) {
        this.name = `TypePhrase${button}`
        this.type = "Button",
        this.message = `Type the work ${button}`,
        this.value = 1,
        this.difficulty = "easy",
        this.time = 500
    }
}

class KeyPrompt {
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

class WordPrompt {
    constructor(word) {
        this.name = `TypeWord${word}`
        this.type = "Word",
        this.message = `Type the word ${word}`,
        this.value = 5,
        this.difficulty = "medium",
        this.time = 10000,
        this.code = textToCode(word),
        this.current = 0
    }
};

class PhrasePrompt {
    constructor(phrase) {
        this.name = `TypePhrase${phrase}`
        this.type = "Phrase",
        this.message = `Type the phrase ${phrase}`,
        this.value = 10,
        this.difficulty = "hard",
        this.time = 15000,
        this.code = textToCode(phrase),
        this.current = 0
    }
};

function generatePrompt(type) {

    if(type == "Key") {
        const randomNumber = (Math.floor(Math.random()*(25)) + 65);
        const randomLetter = String.fromCharCode(randomNumber);
        const randomPrompt = new KeyPrompt(randomLetter);
        return (randomPrompt);
    }
    else if(type == "Button") {
        const randomPrompt = new ButtonPrompt("Button");
        return (randomPrompt);
    }
    else if(type == "Word") {
        const randomNumber = (Math.floor(Math.random()*(125)));
        const randomWord = promptWords[randomNumber];
        const randomPrompt = new WordPrompt(randomWord);
        return (randomPrompt);
    }
    else if(type == "Phrase") {
        const randomNumber = (Math.floor(Math.random()*(125)));
        const randomPhrase= promptPhrase[randomNumber];
        const randomPrompt = new PhrasePrompt(randomPhrase);
        return (randomPrompt);
    }


};

export default generatePrompt