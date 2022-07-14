import './App.css'
import Scoreboard from './components/scoreboard'
import Player from './components/player'
import Prompt from './components/prompts'

function App() {

  return (
    <div>
      <Scoreboard score={Player.score} streak= {Player.streak} difficulty= {Player.difficulty} lifes= {Player.lifes} multiplier= {Player.multiplier} highscore= {Player.highscore} />
      <Prompt />
      {Player.name}
  </div>
  )
}

export default App

