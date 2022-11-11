import { useEffect, useState } from 'react';
import UnderPressure from './components/underpressure';
import Profile from './components/profile';
import swal from 'sweetalert';
import './App.css';

function App() {
  const [playing, setPlaying] = useState(false);
  const start = () => {
    if(document.querySelector('input[name="difficulty"]:checked')){setPlaying(true)}
    else{swal('Choose Difficulty');}
  }

  useEffect(() => {
    if (playing == false) {
      const labels = document.getElementsByName('difficulty-label');

      [...labels].forEach((label, index) => { 
        labels[index].onclick = () => {for (var i = 0; i <= (labels.length); i++) {
          labels[index].className = 'animate__animated animate__bounce';
          labels[index].id = 'difficulty-selected'

          if(i != (labels.length)){
            labels[i].className = '';
            labels[i].id = ''
          }
          
        }}
      });
    }
  })

  if (playing == false) { 
    const theme = (() => { 
      if(document.querySelector('input[name="theme"]:checked')) { return document.querySelector('input[name="theme"]:checked').value }
      else { return 'Blue'} 
    })();

    return (
      <> 
        <div id='container'>
          <Profile />
          <div id='prompt'>
            <div id='title'><h1>Under Pressure</h1><img id='logo' src={`src/images/under_pressure_${theme}.png`} alt="" /></div>
            <button id="start" onClick={start}>Play</button>
            <form id="difficulty-selector" action="">
              <label name="difficulty-label" htmlFor="easy">Easy</label>
              <label name="difficulty-label" htmlFor="medium">Medium</label>
              <label name="difficulty-label" htmlFor="hard">Hard</label>
              <label name="difficulty-label" htmlFor="insane">Insane</label><br />
              <input type="radio" id="easy" name="difficulty" value="Easy" />
              <input type="radio" id="medium" name="difficulty" value="Medium" />
              <input type="radio" id="hard" name="difficulty" value="Hard" />  
              <input type="radio" id="insane" name="difficulty" value="Insane" />    
            </form> 
          </div> 
        </div>
      </>
  )}

  else if (playing == true) {
    const theme = (() => { if(document.querySelector('input[name="theme"]:checked')){ return document.querySelector('input[name="theme"]:checked').value}})();
    return (
      <>
        <Profile />
        <UnderPressure difficulty={document.querySelector('input[name="difficulty"]:checked').value} />
        <div id="home"><button id="home-btn" onClick={() => {setPlaying(false)}}><img id='home-icon' src={`src/images/home_${theme}.png`} alt="" /></button></div>
      </>
  )}
};

export default App