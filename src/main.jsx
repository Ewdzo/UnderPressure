import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Background from './components/themes';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Background />
    <App />
  </React.StrictMode>
)