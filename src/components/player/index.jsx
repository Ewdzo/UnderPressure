class Players {
    constructor(score, streak, lifes, multiplier, highscore) {
        this.name = "Ewdzo";
        this.difficulty = Number("4");
        this.score = score;
        this.streak = streak;
        this.lifes = lifes;
        this.multiplier = multiplier;
        this.highscore = highscore;

        switch (this.difficulty) {
            case 0:
                this.difficulty = "Easy";
                break;
            
            case 1:
                this.difficulty = "Normal";
                break;
            
            case 2:
                this.difficulty = "Medium"
                break;

            case 3:
                this.difficulty = "Hard"
                break;
            
            case 4:
                this.difficulty = "Insane"
                break;

            default:
                this.difficulty = "Invalid Difficulty"
                alert("Invalid Difficulty, please choose from 0-4")
        } 
    }
};

const Ewdzo = new Players(0, 0, 3, 1, 10000)

export default Ewdzo