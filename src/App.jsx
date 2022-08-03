import './App.css';
import UnderPressure from './components/player';
import { useEffect, useState } from 'react';


function App() {
  const [playing, setPlaying] = useState(1);

  useEffect(() => {
    const labels = document.getElementsByTagName('label');

    [...labels].forEach((label, index) => { 
      labels[index].onclick = () => {for (var i = 0; i < (labels.length + 1); i++) {
        document.getElementsByTagName('label')[index].className = 'animate__animated animate__bounce';
        document.getElementsByTagName('label')[index].style.color = '#4894ff';
        document.getElementsByTagName('label')[i].className = '';
        document.getElementsByTagName('label')[i].style.color = '';
      }}
    });
  })

  if (playing == 1) { 
    return (
      <>
        <div id="main">
          <div id='menu'><a href=""><i className="fa fa-bars"></i></a></div>
          <div id='profile'><a href=""><img src="src/images/default_icon.png" alt="" /></a></div>
          <div id='title'><h1>Under Pressure</h1></div>
          <div id='prompt'>
              <button id="start" onClick={() => {setPlaying(2)}}>Play</button>
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

  else if (playing == 2) {
    return (
      <>
        <UnderPressure />
      </>
  )}
};

export default App