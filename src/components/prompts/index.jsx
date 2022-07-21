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

function generatePrompt() {
    const randomNumber = (Math.floor(Math.random()*(25)) + 65)
    const randomLetter = String.fromCharCode(randomNumber)
    const randomPrompt = new Prompts(randomLetter)

    return (
        randomPrompt
    ) 
};

export default generatePrompt