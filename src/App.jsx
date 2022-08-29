import './App.css';
import UnderPressure from './components/player';
import { useEffect, useState } from 'react';
import Profile from './components/profile';
import swal from 'sweetalert';


function App() {
  const [playing, setPlaying] = useState(false);
  const start = () => {
    if(document.querySelector('input[name="difficulty"]:checked')){setPlaying(true)}
    else{swal('Choose Difficulty');}
  }

  useEffect(() => {
    if (playing == false) {
      document.getElementById('menu-icon').style.filter = ''
      const labels = document.getElementsByTagName('label');

      [...labels].forEach((label, index) => { 
        labels[index].onclick = () => {for (var i = 0; i <= (labels.length); i++) {
          document.getElementsByTagName('label')[index].className = 'animate__animated animate__bounce';
          document.getElementsByTagName('label')[index].style.color = '#6C23D1';

          if(i != (labels.length)){
            document.getElementsByTagName('label')[i].className = '';
            document.getElementsByTagName('label')[i].style.color = '';
          }
          
        }}
      });
    }
    else {
      document.getElementById('menu-icon').style.filter = 'invert()'
    }
  })

  if (playing == false) { 
    return (
      <> 
        <div id='container'>
          <Profile />
          <div id='prompt'>
            <div id='title'><h1>Under Pressure</h1><img src="src/images/under_pressure.png" alt="" /></div>
            <button id="start" onClick={start}>Play</button>
            <form id="difficulty-selector" action="">
              <label htmlFor="easy">Easy</label>
              <label htmlFor="medium">Medium</label>
              <label htmlFor="hard">Hard</label>
              <label htmlFor="insane">Insane</label><br />
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

    return (
      <>
        <Profile />
        <UnderPressure difficulty={document.querySelector('input[name="difficulty"]:checked').value} />
        <div id="home"><button id="home-btn" onClick={() => {setPlaying(false)}}><img src="src/images/home.png" alt="" /></button></div>
      </>
  )}
};

export default App