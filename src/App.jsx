import './App.css'
import Scoreboard from './components/scoreboard'
import Player from './components/player'
import PromptDiv from './components/prompts'
import { useState } from 'react'


function App() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      {Player.name}
      <Scoreboard score={Player.score} streak= {Player.streak} difficulty= {Player.difficulty} lifes= {Player.lifes} multiplier= {Player.multiplier} highscore= {Player.highscore} />
      {playing
        ? <PromptDiv />
        : <div id='prompt'><button onClick={() => {setPlaying(true)}}>Test</button></div> }
    </>
  )
};

export default App

