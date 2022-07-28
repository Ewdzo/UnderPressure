import './scoreboard.css'
import './style.css'
import { useEffect, useRef, useState } from "react";
import generatePrompt from '../prompts';

function App() {

    const initialPrompt = {message: 'Press Any Key to Start', time: 5000}

    const [name, setName] = useState('PlayerTest');
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [streak, setStreak] = useState(0);
    const [lifes, setLifes] = useState(3);
    const [multiplier, setMultiplier] = useState(1);
    const [highscore, setHighscore] = useState(0);
    const [status, setStatus] = useState('Idle')
    const [prompt, setPrompt] = useState(initialPrompt);
    const lifesRef = useRef(lifes);
    lifesRef.current = lifes;



    const incrementScore = value => {
    setScore(prevScore => prevScore + value)
    };

    const resetScore = () => {
        setScore(0)
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

    const resetLife = () => {
        setLifes(3)
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
        setPrompt(initialPrompt)
    }

    const resetGame = () => {
        var id = window.setTimeout(function() {}, 0);
        while (id--) {window.clearTimeout(id)}
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
        highscore: highscore,
        status: status
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
        if(player.streak % 50 == 0 && streak != 0 && lifes < 3) {
            incrementLife(1)
        }

        if(player.streak % (25 * multiplier) == 0 && streak != 0) {
            incrementMultiplier(1)
        }

        window.addEventListener("keydown", checkKey);
        
        return () => {
        window.removeEventListener("keydown", checkKey);
        };
    }, [prompt]);

    useEffect(() =>{
        if(lifesRef.current == 0 && prompt.message != 'You Lost') {
            newPrompt()
            defineHighscore()
            setStatus('Dead')
        }
        else if(player.lifes == 3 && prompt.message == initialPrompt.message){
            setStatus('Idle')
        }
        else if(player.lifes != 0 && (prompt.message != initialPrompt.message)) {
            setStatus('Playing')
        };
    }, [prompt, player])

    useEffect(() =>{
        if (player.status == 'Playing' || player.status == 'Idle') {document.getElementById('start-btn').style.display = 'none'}
        else if (player.status == 'Dead') {document.getElementById('start-btn').style.display = ''};
    }, [status])

// Lifes - Image
    const [currentLife, setCurrentLife] = useState("src/images/3_hearts.png")
    useEffect(() =>{
        if (lifes == 3) {
            setCurrentLife("src/images/3_hearts.png")
        }
        else if (lifes == 2) {
            setCurrentLife("src/images/2_hearts.png")
        }
        else if (lifes == 1) {
            setCurrentLife("src/images/1_heart.png")
        }
        else if (lifes == 0) {
            setCurrentLife("src/images/0_hearts.png")
        }

    }, [lifes])



    return(
        <div id='container'>
            <div id='scoreboard'>
                <div id='score'>{player.score}</div>
                <div id='multiplier'>{player.multiplier}x</div>
                <div id='streak'>Streak<br></br>{player.streak}</div>
                <div id='difficulty'>Difficulty<br></br>{player.difficulty}</div>
                <div id='lifes'><img src={currentLife} alt="" /></div>
                <div id='highscore'>Highscore<br></br>{player.highscore}</div> 
            </div> 
            <div id='prompt'>
                <p>{prompt.message}</p>
                <button id="start-btn" onClick={function() {resetGame()}}>Reset</button>
            </div>
        </div>
    );
};

export default App