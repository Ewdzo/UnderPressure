import './App.css'
import {useState} from 'react'
import UnderPressure from './components/player'
import MainScreen from './components/mainscreen';

function App() {
    // document.getElementById(start).onclick = {setPlaying(true)} 
    // const [playing, setPlaying] = useState(false);
    const playing = false;

  return (
    <>
      {playing
        ? <UnderPressure />
        : <MainScreen /> }
    </>
  )
};

export default App