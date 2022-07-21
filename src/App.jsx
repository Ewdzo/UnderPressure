import './App.css'
import PromptDiv from './components/prompts'
import {useState} from 'react'
import PlayerStats from './components/player'

function App() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <PlayerStats />
      {playing
        ? <PromptDiv />
        : <div id='prompt'><button onClick={() => {setPlaying(true)}}>Test</button></div> }
    </>
  )
};

export default App