import './App.css'
import Scoreboard from './components/scoreboard'
import Player from './components/player'
import Prompt from './components/prompts'
import { useEffect, useState } from 'react'


function App() {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {

    function checkKey(event) {
      if (event.key== prompt.code) {
        console.log("Nice one!");
      }
      else {
        console.log(event.key, prompt.code);
      }
    };

    window.addEventListener("keydown", checkKey);
    
    return () => {
      window.removeEventListener("keydown", checkKey);
    };
  }, [prompt]);

  return (
    <>
      {Player.name}
      <Scoreboard score={Player.score} streak= {Player.streak} difficulty= {Player.difficulty} lifes= {Player.lifes} multiplier= {Player.multiplier} highscore= {Player.highscore} />
      <div id='prompt'>
        <p>This: {prompt.message}</p>
        <button onClick={() => setPrompt(Prompt())}>Start</button>
      </div>
    </>
  )
};

export default App

