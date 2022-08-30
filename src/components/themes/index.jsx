import { useState, useEffect } from "react";
import './theme_picker.css'

function Background() {

    const [theme, setTheme] = useState('Blue');


    useEffect (() => {
        
        const selectTheme = document.getElementsByName('theme');
        const updateTheme = () => {
            if(document.getElementById('logo')) {document.getElementById('logo').src = `src/images/under_pressure_${theme}.png`};
            if(document.getElementById('home-icon')) {document.getElementById('home-icon').src = `src/images/home_${theme}.png`};
            if(document.getElementById('profile-logo')) {document.getElementById('profile-logo').src = `src/images/under_pressure_${theme}.png`};
            if(document.getElementById('log-out-img')) {document.getElementById('log-out-img').src = `src/images/log-out_${theme}.png`}
            if(document.getElementById('log-out-img-hover')) {document.getElementById('log-out-img-hover').src = `src/images/log-out-hover_${theme}.png`}
            if(document.getElementById('menu-icon')) {document.getElementById('menu-icon').src = `src/images/menu_${theme}.png`}
        }
        
        [...selectTheme].forEach((button, index) => { 
            selectTheme[index].onclick = () => { 
                setTheme(document.querySelector('input[name="theme"]:checked').value);
                updateTheme();
            }
        });

        updateTheme();     
    });


    if (theme == 'Purple') {
        return(
            <>  
                <div id="theme-picker-container">
                    <link rel="stylesheet" href="src/components/themes/theme_purple.css" />
                    <form id="theme-picker">
                        <button id="palette"><img id="palette-icon" src="src/images/palette.png" alt="Palette" /></button>
                        <input type="radio" id="blue" name="theme" value="Blue" />
                        <label id='blue-label' htmlFor="blue"><img src="src/images/theme_1.png" alt="Blue Theme" /></label>
                        <input type="radio" id="purple" name="theme" value="Purple" />
                        <label id='purple-label' htmlFor="purple"><img src="src/images/theme_2.png" alt="Purple Theme" /></label>
                    </form>
                </div>
                <video autoPlay muted loop id="background">
                    <source src="./src/videos/background.mp4" type="video/mp4" />
                </video>
            </>
        )
    }
    else if(theme == 'Blue'){
        return(
            <>  
                <div id="theme-picker-container">
                    <link rel="stylesheet" href="src/components/themes/theme_blue.css" />
                    <form id="theme-picker">
                        <button id="palette"><img id="palette-icon" src="src/images/palette.png" alt="Palette" /></button>
                        <input type="radio" id="blue" name="theme" value="Blue" />
                        <label id='blue-label' htmlFor="blue"><img src="src/images/theme_1.png" alt="Blue Theme" /></label>
                        <input type="radio" id="purple" name="theme" value="Purple" />
                        <label id='purple-label' htmlFor="purple"><img src="src/images/theme_2.png" alt="Purple Theme" /></label>
                    </form>
                </div>
                <img src="src/images/background-blue.png" id="background" alt="" />
            </>
        )
    }
}

export default Background