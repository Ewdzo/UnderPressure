import './prompts.css'
import { useState, useEffect } from 'react'

class Prompts {
    constructor(key) {
        this.name = `Type${key}`,
        this.type = "Key",
        this.message = `Type the letter ${key}`,
        this.value = 1,
        this.difficulty = "easy",
        this.time = 5000,
        this.code = key.charCodeAt(0)
    }
}

function choosePrompt() {
    const randomNumber = (Math.floor(Math.random()*(25)) + 65)
    const randomLetter = String.fromCharCode(randomNumber)
    const randomPrompt = new Prompts(randomLetter)

    return (
        randomPrompt
    ) 
};

function PromptDiv() {
   
const [prompt, setPrompt] = useState('');

function newPrompt() {
    setPrompt(choosePrompt());

    var id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id);
    }

    const timer = setTimeout(() => console.log(prompt.time), prompt.time);
  };

  useEffect(() => {

    function checkKey(event) {
      if (event.keyCode == prompt.code) {
        newPrompt();
      }
      else {
        console.log(event.key, prompt.message);
      }
    };

    window.addEventListener("keydown", checkKey);
    
    return () => {
      window.removeEventListener("keydown", checkKey);
    };
  }, [prompt]);

  useEffect(() => {
    newPrompt()
  }, []);

    return(
        <div id='prompt'>
        <p>This: {prompt.message}</p>
        <button onClick={() => newPrompt()}>Start</button>
      </div>
    )
}

export default PromptDiv