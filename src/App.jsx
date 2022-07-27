import './App.css'
import {useState} from 'react'
import UnderPressure from './components/player'

function App() {
  const [playing, setPlaying] = useState(true);

  return (
    <>
      {playing
        ? <UnderPressure />
        : <div id='prompt'><button onClick={() => {setPlaying(true)}}>Test</button></div> }
    </>
  )
};

export default App