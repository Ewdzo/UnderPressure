import './App.css'
import Scoreboard from './components/scoreboard'
import Player from './components/player'
import Prompt from './components/prompts'
import { useState } from 'react'


function App() {
  const currentPrompt = Prompt()
  const [prompt, setPrompt] = useState('');

  return (
    <>
      {Player.name}
      <Scoreboard score={Player.score} streak= {Player.streak} difficulty= {Player.difficulty} lifes= {Player.lifes} multiplier= {Player.multiplier} highscore= {Player.highscore} />
      <div id='prompt'><p onMouseOver={() => setPrompt(currentPrompt)}>This: {prompt.message}</p></div>
    </>
  )
}

export default App

