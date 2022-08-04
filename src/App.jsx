import './App.css';
import UnderPressure from './components/player';
import { useEffect, useState } from 'react';
import Profile from './components/profile';


function App() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playing == false) {
      const labels = document.getElementsByTagName('label');

      [...labels].forEach((label, index) => { 
        labels[index].onclick = () => {for (var i = 0; i <= (labels.length); i++) {
          document.getElementsByTagName('label')[index].className = 'animate__animated animate__bounce';
          document.getElementsByTagName('label')[index].style.color = '#4894ff';

          if(i != (labels.length)){
            document.getElementsByTagName('label')[i].className = '';
            document.getElementsByTagName('label')[i].style.color = '';
          }
          
        }}
      });
    }
  })

  if (playing == false) { 
    return (
      <>
        <div id="main">
          <Profile />
          <div id='title'><h1>Under Pressure</h1></div>
          <div id='prompt'>
              <button id="start" onClick={() => {setPlaying(true)}}>Play</button>
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
        <UnderPressure />
      </>
  )}
};

export default App