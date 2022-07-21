import './scoreboard.css'
import { useState } from "react";

function PlayerStats() {

    const [score, setScore] = useState(0)
    const [difficulty, setDifficulty] = useState('Easy')
    const [streak, setStreak] = useState(0)
    const [lifes, setLifes] = useState(3)
    const [multiplier, setMultiplier] = useState(1)
    const [highscore, setHighscore] = useState(0)


    const incrementScore = value => {
    setScore(prevScore => prevScore + value)
    };

    const decrementScore = value => {
        setScore(prevScore => prevScore - value)
    };

    const incrementStreak = () => {
        setStreak(prevStreak => prevStreak + 1)
    };

    const resetStreak = () => {
        setStreak(0)
    };

    const incrementLife = value => {
        setLifes(prevLifes => prevLifes + value)
    };

    const decrementLife = value => {
        setLifes(prevLifes => prevLifes - value)
    };

    const incrementMultiplier = value => {
        setMultiplier(prevMultiplier => prevMultiplier + value)
    };

    const decrementMultiplier = value => {
        setMultiplier(prevMultiplier => prevMultiplier - value)
    };

    const resetMultiplier = value => {
        setMultiplier(0)
    };

    const defineHighscore = () => {
        if (highscore < score) {
            highscore = score}
    }

    const [name, setName] = useState('Ewdzo')

    const player = {
        name: name,
        difficulty: difficulty,
        score: score,
        streak: streak,
        lifes: lifes,
        multiplier: multiplier,
        highscore: highscore
    }

    return(
        <div id='scoreboard' style={{display: 'block'}}>
            <div id='scoremulti'>
                <div id='score'>Score: {player.score}</div>
                <div id='multiplier'>{player.multiplier}x</div>
            </div>
            <div id='streak'>Streak: {player.streak}</div>
            <div id='difficulty'>Difficulty: {player.difficulty}</div>
            <div id='lifes'>Lifes: {player.lifes}</div>
            <div id='highscore'>Highscore: {player.highscore}</div> 
        </div>
    )
}

export default PlayerStats
// export { incrementScore, decrementScore, incrementStreak, resetStreak, incrementLife, decrementLife, incrementMultiplier, decrementMultiplier, resetMultiplier, setHighscore };