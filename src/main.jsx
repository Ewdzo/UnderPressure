import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import VideoBackground from './components/VideoBackground';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VideoBackground />
    <App />
  </React.StrictMode>
)
