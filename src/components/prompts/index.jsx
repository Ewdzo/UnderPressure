const promptWords = ['aglet', 'agile', 'adventure', 'Alabasta', 'absolute', 'Brook', 'brownish', 'Baratie', 'backpack', 'Blackbeard', 'Chopper', 'cringe', 'cronometer', 'cascade', 'clockwork', 'Dressrosa', 'dangerous', 'dinasty', 'demogorgon', 'demonic', 'Elbaf', 'elucity', 'episode', 'energic', 'epifany', 'facility', 'Franky', 'fiesta', 'factoid', 'firefighter', 'gamer', 'Gastino', 'gangster', 'guillotine', 'gnocchi', 'Hancock', 'hammer', 'habitant', 'hemoglobin', 'hertz', 'indigo', 'Inuarashi', 'island', 'icon', 'ideal', 'Jinbe', 'jacket', 'jetpack', 'join', 'justify', 'Kozuki', 'Kaido', 'know', 'keynote', 'knot', 'Luffy', 'Loguetown', 'level', 'liberty', 'light', 'Marineford', 'machine', 'monkey', 'monster', 'multiplier', 'Nami', 'nanometer', 'necromancer', 'night', 'Newgate', 'objectivism', 'ocean', 'ocular', 'omnipotent', 'Onigashima', 'Poneglyph', 'paint', 'paleozoic', 'peppermint', 'perfect', 'queue', 'quote', 'quitter', 'quiz', 'quantum', 'Robin', 'rocket', 'rampage', 'racoon', 'restless', 'Sogeking', 'Sanji', 'sample', 'sugestive', 'Skypiea', 'thousand', 'time', 'tempest', 'temperature', 'Teach', 'Usopp', 'unity', 'ukulele', 'ultimate', 'Uranus', 'Vinsmoke', 'vintage', 'volcano', 'volume', 'voice', 'Whitebeard', 'Wano', 'water', 'wedding', 'waypoint', 'Xebec', 'xenobiotic', 'xenophobic', 'x-ray', 'Xerxes', 'Zoro', 'zoomer', 'zucchini', 'zebra', 'zombie'];
const promptPhrases = ['An apple a day', 'A leap of faith', 'A storm in a tea-cup', 'A taste of your own medicine', 'Adventure lies ahead', 'Black Beard is back', 'Break a leg', 'Break the ice', 'Bring the beat in', 'Beat it', "Conqueror's Haki", 'Call me by your name', 'Cost an arm', 'Crocodile tears', 'Come on', 'Darkest hour', "Don't Stop Me Now", 'Dropping like flies', 'Daylight madness', 'Danger lies ahead', 'Enemies to lovers', 'Early to bed', 'Early to rise', 'Eye for an eye', 'Enies Lobby', 'Everbody wants to be my enemy', 'Fair and square', 'Fall of the wagon', 'Fish out of water', 'Foosha Village', 'Four Emperors of the Sea', 'Game Over', 'Get Over It', 'Go berserk', 'Grandfather clock', 'Gol D. Roger', 'Heads or Tails', 'Hell in a Bottle', 'Here today, gone tomorrow', 'Honor among thieves', 'Hito Hito no Mi', 'Impel Down', 'In a while', 'It takes two', "It's your funeral", 'In the dark', 'Jaguar D. Saul', 'Joy Boy', 'Jack Frost', 'Joined the party', 'Jump up', 'Kage Kage no Mi', 'Keep a straight face', 'Kick the bucket', 'Know your place', 'Kokuzi Oden', 'Log Pose', 'Left in the dark', 'Let the dust settle', 'Like a fish out of water', 'Long time no see', 'Monkey D. Luffy', 'Mark my words', 'Melting pot', 'Move mountains', 'My hands are tied', 'New sheriff in town', 'Night owl', 'No can do', 'Now and then', 'Nico Robin', 'Off the shelf', 'On the fly', 'On the same page', 'Over the top', 'One Piece', 'Portgas D. Ace', "Pandora's box", 'Pick up the pace', 'Piece of Cake', 'Presence of mind', 'Question of time', 'Quick fix', 'Quiet before the Storm', 'Queen bee', 'Quick brown fox', 'Raining cats and dogs', 'Read between the lines', 'Ring a bell', 'Road to Laugh Tale', 'Roll your eyes', 'Salt in a wound', 'Scattered to the four winds', 'Shake a leg', 'Shot in the dark', 'Shandora Bell', 'Tables are turned', 'Tempest in a teapot', 'The sands of time', 'The One Piece is Real', 'Tie the knot', 'Under the gun', 'Upper hand', 'Under a cloud', 'Up to the eyes', "Under Usopp's nose", 'Vinsmoke Judge', 'Vultures are circling', 'Vicious circle', 'Voice in the wilderness', 'Voice of all things', 'Watch your back', 'Weight off your shoulders', 'When pigs fly', "Wolf in sheep's clothing", 'Wano Country', 'X marks the spot', 'Rocks D. Xebec', 'Xerxes is gone', 'Xena Warrior Princess', 'You are what you eat', "You're toast", 'Your call', 'You said it!', 'Yamato will come', 'Zip your lips', 'Zero hour', "Zeppelin's end" , "Zoro's Ambition", 'Zunesha knows too much'  ]

const textToCode = (text) => {
    const charArray = [];

    for(let i=0; i < text.length; i++) {
        charArray.push(text.toUpperCase().charCodeAt(i))
    };

    return charArray;
};

class KeyPrompt {
    constructor(key) {
        this.name = `Type${key}`,
        this.type = "Key",
        this.message = `Type the letter ${key}`,
        this.value = 1,
        this.difficulty = "easy",
        this.time = 2500,
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
        this.time = 5000,
        this.code = textToCode(word),
        this.current = 0
    }
};

class PhrasePrompt {
    constructor(phrase) {
        this.name = `TypePhrase${phrase}`
        this.type = "Phrase",
        this.message = `Type the phrase ${phrase}`,
        this.value = 15,
        this.difficulty = "hard",
        this.time = 8000,
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
        const randomPhrase = promptPhrases[randomNumber];
        const randomPrompt = new PhrasePrompt(randomPhrase);
        return (randomPrompt);
    }


};

export default generatePrompt