import './scoreboard.css'
import { useEffect, useRef, useState } from "react";
import generatePrompt from '../prompts';
import 'animate.css';
import Profile from '../profile';
import Axios from "axios";

var timer;
const userToken = document.cookie.replace("userToken=", "");

function App(props) {
    const initialPrompt = {message: 'Press Any Key to Start', time: 5000}

    const [name, setName] = useState('Null');
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState(props.difficulty);
    const [streak, setStreak] = useState(0);
    const [lifes, setLifes] = useState(3);
    const [multiplier, setMultiplier] = useState(1);
    const [highscore, setHighscore] = useState(0);
    const [highstreak, setHighstreak] = useState(0);
    const [highmultiplier, setHighmultiplier] = useState(0);
    const [status, setStatus] = useState('Idle')
    const [prompt, setPrompt] = useState(initialPrompt);
    const [currentLife, setCurrentLife] = useState("src/images/3_hearts.png")
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
            setHighscore(score)
        }
    };

    const defineHighstreak = () => {
        if (player.highstreak < player.streak) {
            setHighstreak(streak)
        }
    };

    const defineHighmultiplier = () => {
        if (player.highmultiplier < player.multiplier) {
            setHighmultiplier(multiplier)
        }
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
        highmultiplier: highmultiplier,
        highstreak: highstreak,
        status: status
    };

    const newPrompt = () => {
        if (lifesRef.current == 0 ) {
            setPrompt({message: 'You Lost'})
        }

        else {
            setPrompt(generatePrompt());
            window.clearTimeout(timer);
        
            timer = setTimeout(function() {
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
        playSound()
        defineHighstreak()
        defineHighmultiplier()
        defineHighscore()
    };

    const playSound = () => {
        const audio = new Audio('src/audio/key_press.mp3')
        audio.volume = 0.2
        audio.play();
    }

    useEffect(() => {
        if(player.streak == 0) {
            setMultiplier(1)
        }

        if(player.streak % 50 == 0 && streak != 0 && lifes < 3) {
            incrementLife(1)
            document.querySelector('#newLife').style.transform = 'translateX(0)'
            document.querySelector('#newLife').className = 'animate__animated animate__fadeInUp'
            document.querySelector('#newLife').addEventListener('animationend', () => {document.querySelector('#newLife').className = 'animate__animated animate__fadeOut'});
        }

        if(player.streak % (25 * multiplier) == 0 && streak != 0) {
            incrementMultiplier(1)
        }

        window.addEventListener("keydown", checkKey); 
        
        return () => {
        window.removeEventListener("keydown", checkKey);
        };
    }, [prompt, streak]);

    useEffect(() => {
        if(lifesRef.current == 0 && prompt.message != 'You Lost') {
            if (userToken) {
                Axios.post("http://localhost:8000/user/update", {
                    data: {
                        userToken: userToken, 
                        score: player.highscore, 
                        streak: player.highstreak,
                        multiplier: player.highmultiplier,
                        difficulty: player.difficulty,
                    }
                }).then((response) => {
                    console.log(response)
                }).catch(err => console.log(err))
            }
            newPrompt()
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
    }, [status, lifes])

    return(
        <div id='container'>
            <Profile />
            <div id='scoreboard'>
                <div id='score'>{player.score}</div>
                <div id='multiplier'>{player.multiplier}x</div>
                <div id='lifes'><img src={currentLife} alt=""/></div>
                <div id='newLife'><img src="src/images/new_heart.png" alt="New Heart Icon" /></div>
                <div id='prompt'>
                    <h1>{prompt.message}</h1>
                    <button id="start-btn" onClick={function() {resetGame()}}>Reset</button>
                </div>
                <div>
                    <div id='difficulty'><img src="src/images/difficulty.png" alt="Difficulty Icon" />Difficulty<br></br>{player.difficulty}</div>
                    <div id='streak'><img src="src/images/streak.png" alt="Streak Icon" /> Streak<br></br>{player.streak}</div>
                    <div id='highscore'><img src="src/images/highscore.png" alt="Highscore Icon" /> Highscore<br></br>{player.highscore}</div> 
                </div>  
            </div> 
        </div>
    );
};

export default App