import React from 'react'
import ReactDOM from 'react-dom/client'
import Background from './components/themes';
import App from './App'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Background />
    <App />
  </React.StrictMode>
)