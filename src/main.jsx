import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Scoreboard }  from './components/scoreboard'
import './index.css'
import {score, streak, expireTime, difficulty, lifes, multiplier, highscore } from './Test'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <br />
    <Scoreboard score={score} streak={streak} time={expireTime} difficulty= {difficulty} lifes= {lifes} multiplier= {multiplier} highscore= {highscore} />
  </React.StrictMode>
)
  