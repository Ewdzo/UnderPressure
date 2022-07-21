import './scoreboard.css'
import '../prompts/prompts.css'
import { useEffect, useState } from "react";
import generatePrompt from '../prompts';

function PlayerStats() {

    const [name, setName] = useState('PlayerTest')
    const [score, setScore] = useState(0)
    const [difficulty, setDifficulty] = useState('Easy')
    const [streak, setStreak] = useState(0)
    const [lifes, setLifes] = useState(3)
    const [multiplier, setMultiplier] = useState(1)
    const [highscore, setHighscore] = useState(0)
    const [prompt, setPrompt] = useState({time: 5000});


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

    const resetMultiplier = () => {
        setMultiplier(0)
    };

    const defineHighscore = () => {
        if (highscore < score) {
            setHighscore(score)}
    }

    const player = {
        name: name,
        difficulty: difficulty,
        score: score,
        streak: streak,
        lifes: lifes,
        multiplier: multiplier,
        highscore: highscore
    }

    function newPrompt() {
    setPrompt(generatePrompt());
    
    var id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id);
    };
    
        const timer = setTimeout(function() {
            resetStreak() 
            newPrompt()
        },  prompt.time);
    };
    
    useEffect(() => {
    
        function checkKey(event) {
        if (event.keyCode == prompt.code) {
            incrementScore(prompt.value);
            incrementStreak(1)
            newPrompt()
        }
        else {
            resetStreak()
            newPrompt()
            decrementLife(1)
        }
        };
    
        window.addEventListener("keydown", checkKey);
        
        return () => {
        window.removeEventListener("keydown", checkKey);
        };
    }, [prompt]);

    
    
    return(
        <>
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

            <div id='prompt'>
            <p>{prompt.message}</p>
            <button onClick={() => newPrompt()}>Start</button>
            </div>
        </>
    )
}

export default PlayerStats
// export { incrementScore, decrementScore, incrementStreak, resetStreak, incrementLife, decrementLife, incrementMultiplier, decrementMultiplier, resetMultiplier, setHighscore };