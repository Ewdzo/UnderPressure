import './App.css'
import {useState} from 'react'
import PlayerStats from './components/player'

function App() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      {playing
        ? <PlayerStats />
        : <div id='prompt'><button onClick={() => {setPlaying(true)}}>Test</button></div> }
    </>
  )
};

export default App