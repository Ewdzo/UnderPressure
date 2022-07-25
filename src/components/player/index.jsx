import './scoreboard.css'
import '../prompts/prompts.css'
import { useEffect, useRef, useState } from "react";
import generatePrompt from '../prompts';

function PlayerStats() {
    
    const [name, setName] = useState('PlayerTest');
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [streak, setStreak] = useState(0);
    const [lifes, setLifes] = useState(3);
    const [multiplier, setMultiplier] = useState(1);
    const [highscore, setHighscore] = useState(0);
    const [prompt, setPrompt] = useState({message: 'Press Any Key to Start', time: 5000});
    const lifesRef = useRef(lifes);
    lifesRef.current = lifes;


    const incrementScore = value => {
    setScore(prevScore => prevScore + value)
    };

    const resetScore = value => {
        setScore(0)
    };

    const incrementStreak = () => {
        setStreak(prevStreak => prevStreak + 1)
    };

    const resetStreak = () => {
        setStreak(0)
    };

    const resetLife = () => {
        setLifes(3)
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

    const resetMultiplier = () => {
        setMultiplier(1)
    };

    const defineHighscore = () => {
        if (player.highscore < player.score) {
            setHighscore(score)}
    };

    const resetPrompt = () => {
        setPrompt({message: 'Press Any Key to Start', time: 5000})
    }

    const resetGame = () => {
        resetLife()
        resetStreak()
        resetMultiplier()
        resetScore()
        resetPrompt()
    }

    const player = {
        name: name,
        difficulty: difficulty,
        score: score,
        streak: streak,
        lifes: lifes,
        multiplier: multiplier,
        highscore: highscore
    };

    const newPrompt = () => {
        if (lifesRef.current == 0 ) {
            setPrompt({message: 'You Lost'})
        }

        else {
            setPrompt(generatePrompt());
            var id = window.setTimeout(function() {}, 0);
            while (id--) {
                window.clearTimeout(id);
            };
        
            const timer = setTimeout(function() {
                if (lifesRef.current > 0) {
                    resetStreak()
                    newPrompt()
                    decrementLife(1)
                };
            },  prompt.time);
        };
    };

    const checkKey = event => {
        if (prompt.code == undefined) {
            newPrompt()
        }
        else if (event.keyCode == prompt.code && lifesRef.current > 0) {
            incrementScore(prompt.value * multiplier);
            incrementStreak(1)
            newPrompt()
        }
        else if (event.keyCode != prompt.code && lifesRef.current > 0) {
            resetStreak()
            newPrompt()
            decrementLife(1)
        }
        else if (event.keyCode != prompt.code || event.keyCode == prompt.code  && lifesRef.current == 0) {
            newPrompt()
        }
    };
    
    useEffect(() => {
        if(lifesRef.current == 0 && prompt.message != 'You Lost') {
            newPrompt()
            defineHighscore()
        };

        if(player.streak % 50 == 0 && streak != 0) {
            incrementLife(1)
        }

        if(player.streak % (50 * multiplier) == 0 && streak != 0) {
            incrementMultiplier(1)
        }

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
                <button onClick={ 
                    function() {
                        resetGame()
                    }}>
                    Start
                    </button>
            </div>
        </>
    );
};

export default PlayerStats