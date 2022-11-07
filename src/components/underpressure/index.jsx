import { useEffect, useRef, useState } from "react";
import { defaultPrompt, generatePrompt } from '../prompts';
import { getCookie, userToken } from '../cookies';
import RightKey from '../../audio/key_press.mp3';
import Axios from "axios";
import images from "../../images";
import './underpressure.css'
import 'animate.css';

var timer, countDownTimer;

function App(props) {

    const [score, setScore] = useState(0);
    const [difficulty] = useState(props.difficulty);
    const [streak, setStreak] = useState(0);
    const [lifes, setLifes] = useState(3);
    const [multiplier, setMultiplier] = useState(1);
    const [highscore, setHighscore] = useState(0);
    const [highstreak, setHighstreak] = useState(0);
    const [highmultiplier, setHighmultiplier] = useState(0);
    const [status, setStatus] = useState('Idle');
    const [prompt, setPrompt] = useState(defaultPrompt);
    const [currentLife, setCurrentLife] = useState("src/images/3_hearts.png");
    const [countDown, setCountDown] = useState(0);
    const [cookieScore] = useState(Number(getCookie("score")));
    const [cookieStreak] = useState(Number(getCookie("streak")));
    const [cookieMultiplier] = useState(Number(getCookie("multiplier")));

    const player = {
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

    const lifesRef = useRef(lifes);
    lifesRef.current = lifes;

    const incrementScore = value => { setScore(prevScore => prevScore + value); };

    const resetScore = () => { setScore(0); };

    const incrementStreak = () => { setStreak(prevStreak => prevStreak + 1); };

    const resetStreak = () => { setStreak(0); };

    const incrementLife = value => { setLifes(prevLifes => prevLifes + value); };

    const resetLife = () => { setLifes(3); };

    const decrementLife = value => { setLifes(prevLifes => prevLifes - value); };

    const incrementMultiplier = value => { setMultiplier(prevMultiplier => prevMultiplier + value); };

    const resetMultiplier = () => { setMultiplier(1); };

    const defineHighscore = () => { if (player.highscore < player.score) { setHighscore(score) }; };

    const defineHighstreak = () => { if (player.highstreak < player.streak) { setHighstreak(streak) }; };

    const defineHighmultiplier = () => { if (player.highmultiplier < player.multiplier) { setHighmultiplier(multiplier) }; };

    const resetPrompt = () => { setPrompt(defaultPrompt) };

    const resetGame = () => {
        var id = window.setTimeout(function() {}, 0);
        while (id--) {window.clearTimeout(id); window.clearInterval(id)};

        resetLife();
        resetStreak();
        resetMultiplier();
        resetScore();
        resetPrompt();
    };

    const resetTimer = (prompt) => {
        timer = setTimeout(function() {
            if (lifesRef.current > 0) {
                resetStreak()
                newPrompt()
                decrementLife(1)
            };
        },  prompt.time);

        setCountDown(5);
        countDownTimer = setInterval(function () {
            setCountDown(prevMultiplier => prevMultiplier - 1)
        }, (prompt.time / 5));
    };

    const currentCountdown = () => {
        return images[7 + countDown];
    }

    const newPrompt = () => {
        if (lifesRef.current != 0 ) {
            window.clearTimeout(timer);
            window.clearInterval(countDownTimer);

            if(player.difficulty == "Easy") {
                setPrompt(generatePrompt("Key"));
                const refPrompt = generatePrompt("Key");  
                resetTimer(refPrompt);
            }
            else if(player.difficulty == "Medium") {
                const promptTypes = ["Key", "Word"];
                const randomIndex = (Math.floor(Math.random()*(2)));
                const mediumPrompt = generatePrompt(promptTypes[randomIndex]);

                setPrompt(mediumPrompt);
                resetTimer(mediumPrompt);
            }
            else if(player.difficulty == "Hard") {
                const promptTypes = ["Key", "Word", "Phrase"];
                const randomIndex = (Math.floor(Math.random()*(3)));
                const hardPrompt = generatePrompt(promptTypes[randomIndex]);

                setPrompt(hardPrompt);
                resetTimer(hardPrompt);
            }
            else if(player.difficulty == "Insane") {
                const promptTypes = ["Key", "Word", "Phrase"];
                const randomIndex = (Math.floor(Math.random()*(3)));
                const hardPrompt = generatePrompt(promptTypes[randomIndex]);

                setPrompt(hardPrompt);
                hardPrompt.time = hardPrompt.time / 2;
                hardPrompt.value = hardPrompt.value * 2;
                resetTimer(hardPrompt);
            }     
        }
        else {
            setPrompt({message: 'You Lost'});
        };
    };

    const playSound = () => {
        const audio = new Audio(RightKey)
        audio.volume = 0.2
        audio.play();
    };

    const checkKey = event => {
        if (prompt.code == undefined) { newPrompt(); }

        switch (prompt.type) {
            case "Key": 
                if (event.keyCode == prompt.code && lifesRef.current > 0) {
                    incrementScore(prompt.value * multiplier);
                    incrementStreak(1);
                    newPrompt();
                    playSound();
                }
                else if (event.keyCode != prompt.code && lifesRef.current > 0) {
                    resetStreak();
                    newPrompt();
                    decrementLife(1);
                }
                else if (event.keyCode && lifesRef.current == 0) {
                    newPrompt();
                };

            break;
            
            case "Word":
            case "Phrase":
                if (event.keyCode == prompt.code[prompt.current] && lifesRef.current > 0) {
                    if (prompt.code[prompt.current + 1] == undefined) {
                        incrementScore(prompt.value * multiplier);
                        incrementStreak(1);
                        newPrompt();
                        playSound();
                    }
                    else {
                        prompt.current = prompt.current + 1;
                        playSound();
                    }
                }
                else if (prompt.code[prompt.current + 1] == undefined) {
                    incrementScore(prompt.value * multiplier);
                    incrementStreak(1);
                    newPrompt();
                }
                else if (event.keyCode != prompt.code[prompt.current] && lifesRef.current > 0) {
                    resetStreak();
                    newPrompt();
                    decrementLife(1);
                }
                else if (event.keyCode && lifesRef.current == 0) {
                    newPrompt();
                };

            break;
        }
        
        defineHighstreak();
        defineHighmultiplier();
        defineHighscore();
    };

    const updateCookie = () => {
        if(cookieScore != null){
            if(cookieScore < player.highscore) {document.cookie = `score=${player.highscore}`};
            if (cookieStreak < player.highstreak) {document.cookie = `streak=${player.highstreak}`};
            if (cookieMultiplier < player.highmultiplier) {document.cookie = `multiplier=${player.highmultiplier}`};
            document.cookie = `difficulty=${player.difficulty}`;
            document.cookie = `matches=${Number(getCookie('matches')) + 1}`;
        };
    };

    const updateDatabase = () => {
        if (userToken) {
            Axios.get("http://localhost:8000/user/", {
                headers: {
                    userToken: userToken
                }
            })
            .then(response => response.data)
            .then(response => response.includes("currently registered"))
            .then(response => {

                if(response == false){
                    Axios.post("http://localhost:8000/user/create", {
                        data: {
                            userToken: userToken
                        }
                    });

                    Axios.post("http://localhost:8000/user/update", {
                        data: {
                            userToken: userToken, 
                            score: getCookie('score'), 
                            streak: getCookie('streak'),
                            multiplier: getCookie('multiplier'),
                            difficulty: getCookie('difficulty'),
                            matches: getCookie('matches')
                        }
                    }).catch(err => console.log(err))
                }
                else if(response == true){
                    Axios.get("http://localhost:8000/user/data", {
                    headers: {
                        userToken: userToken
                    }
                    })
                    .then(response => response.data)
                    .then((response) => {
                        if(getCookie('matches') > response.matches){
                            Axios.post("http://localhost:8000/user/update", {
                                data: {
                                    userToken: userToken, 
                                    score: getCookie('score'), 
                                    streak: getCookie('streak'),
                                    multiplier: getCookie('multiplier'),
                                    difficulty: getCookie('difficulty'),
                                    matches: getCookie('matches')
                                }
                            }).catch(err => console.log(err))
                        }
                    }).catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err)) 
        };
    };

    useEffect(() => {
        if(player.streak == 0) { setMultiplier(1) };

        if(player.streak % 50 == 0 && streak != 0 && lifes < 3) {
            incrementLife(1);
            document.querySelector('#newLife').style.transform = 'translateX(0)';
            document.querySelector('#newLife').className = 'animate__animated animate__fadeInUp';
            document.querySelector('#newLife').addEventListener('animationend', () => {document.querySelector('#newLife').className = 'animate__animated animate__fadeOut'});
        };

        if(player.streak % (25 * multiplier) == 0 && streak != 0) { incrementMultiplier(1) };

        window.addEventListener("keydown", checkKey); 

        return () => { window.removeEventListener("keydown", checkKey); };

    }, [prompt, streak, player]);

    useEffect(() => {
        if(lifesRef.current == 0 && prompt.message != 'You Lost') {
            updateCookie();
            newPrompt();
            setStatus('Dead');
            updateDatabase();
        }
        else if(player.lifes == 3 && prompt.message == defaultPrompt.message){ setStatus('Idle') }
        else if(player.lifes != 0 && (prompt.message != defaultPrompt.message)) { setStatus('Playing') };

    }, [player, lifes]);

    useEffect(() =>{
        if (player.status == 'Playing' || player.status == 'Idle') { document.getElementById('start-btn').style.display = 'none' }
        else if (player.status == 'Dead') { document.getElementById('start-btn').style.display = '' };
        
        if (lifes == 3) { setCurrentLife("src/images/3_hearts.png") }
        else if (lifes == 2) { setCurrentLife("src/images/2_hearts.png") }
        else if (lifes == 1) { setCurrentLife("src/images/1_heart.png")  }
        else if (lifes == 0) { setCurrentLife("src/images/0_hearts.png") };

    }, [status, lifes]);
    
    useEffect(() => {
        if(countDown < 0 || prompt.message == 'You Lost') {
            window.clearInterval(countDownTimer);
            setCountDown(0);
        };
    });

    useEffect(() => {     
        if(cookieScore) { setHighscore(cookieScore) };

        if (userToken && cookieScore) {
            Axios.get("http://localhost:8000/user/", {
                headers: {
                    userToken: userToken
                }
            })
            .then(response => response.data)
            .then(response => response.includes("currently registered"))
            .then(response => {
                if(response == false){
                    Axios.post("http://localhost:8000/user/create", {
                        data: {
                            userToken: userToken
                        }
                    });

                    Axios.post("http://localhost:8000/user/update", {
                        data: {
                            userToken: userToken, 
                            score: getCookie('score'), 
                            streak: getCookie('streak'),
                            multiplier: getCookie('multiplier'),
                            difficulty: getCookie('difficulty'),
                            matches: getCookie('matches')
                        }
                    }).catch(err => console.log(err))
                }
                else if(response == true){
                    Axios.get("http://localhost:8000/user/data", {
                    headers: {
                        userToken: userToken
                    }
                    })
                    .then(response => response.data)
                    .then((response) => {
                        if(getCookie('matches') > response.matches){
                            Axios.post("http://localhost:8000/user/update", {
                                data: {
                                    userToken: userToken, 
                                    score: getCookie('score'), 
                                    streak: getCookie('streak'),
                                    multiplier: getCookie('multiplier'),
                                    difficulty: getCookie('difficulty'),
                                    matches: getCookie('matches')
                                }
                            }).catch(err => console.log(err))
                        }
                    }).catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err)) 
        };
    }, [document.cookie]);

    return(
        <div id='container'>
            <div id='scoreboard'>
                <div id='score'>{player.score}</div>
                <div id='multiplier'>{player.multiplier}x</div>
                <div id='lifes'><img src={currentLife} alt=""/></div>
                <div id='newLife'><img src={images[28]} alt="New Heart Icon" /></div>
                <div id='prompt'>
                    <h1>{prompt.message}</h1>
                    <div id='timer'><img src={currentCountdown()} alt="CountDown Timer" /></div>
                    <button id="start-btn" onClick={() => { resetGame() }}>Reset</button>
                </div>
                <div>
                    <div id='difficulty'><img src={images[14]} alt="Difficulty Icon" />Difficulty<br></br>{player.difficulty}</div>
                    <div id='streak'><img src={images[31]}alt="Streak Icon" /> Streak<br></br>{player.streak}</div>
                    <div id='highscore'><img src={images[17]} alt="Highscore Icon" /> Highscore<br></br>{player.highscore}</div> 
                </div>  
            </div> 
        </div>
    );
};

export default App