import { Component } from "react";

class Player extends Component {
    state = {
        name: "Null",
        difficulty: "Easy",
        score: 0,
        streak: 0,
        lifes: 3,
        multiplier: 1,
        highscore: 0}
};

const newPlayer = (new Player).state
export default newPlayer


// Functions

const incrementScore = (player, value) => {
   player.score = player.score + value
};

const decrementScore = (player, value) => {
    player.score = player.score - value
};

const incrementStreak = player => {
    player.streak = player.streak + 1
};

const resetStreak = player => {
    player.streak = 0
};

const incrementLife = (player, value) => {
    player.lifes = player.streak + value
};

const decrementLife = (player, value) => {
    player.lifes = player.streak - value
};

const incrementMultiplier = (player, value) => {
    player.multiplier = player.multiplier + value
};

const decrementMultiplier = (player, value) => {
    player.multiplier = player.multiplier - value
};

const resetMultiplier = player => {
    player.multiplier = 0
};


function setHighscore(player) {
    if (player.score > player.highscore) {
        player.highscore = player.score
    }
}

export { incrementScore, decrementScore, incrementStreak, resetStreak, incrementLife, decrementLife, incrementMultiplier, decrementMultiplier, resetMultiplier, setHighscore };