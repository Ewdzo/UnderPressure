import { useState, useEffect } from "react";
import './theme_picker.css'

function Background() {

    const [theme, setTheme] = useState('blue');

    const blueBackground = document.createElement("img");
    blueBackground.id = "background";
    blueBackground.src = "src/images/background_blue.png";
    blueBackground.alt = "Blue Mountains Pixel Art";

    const purpleBackground = document.createElement("video");
    purpleBackground.src = "./src/videos/background.mp4";
    purpleBackground.id = "background";
    purpleBackground.muted = true;
    purpleBackground.autoplay = true;
    purpleBackground.loop = true;

    const iconTheme = document.createElement("link");
    iconTheme.rel = "icon";
    iconTheme.href = `src/images/under_pressure_${theme}.png`;
    iconTheme.type = "image/x-icon";
    iconTheme.id = 'windowIcon'

    useEffect (() => {
        const selectTheme = document.getElementsByName('theme');

        const updateTheme = () => {
            if(document.getElementById('logo')) {document.getElementById('logo').src = `src/images/under_pressure_${theme}.png`};
            if(document.getElementById('home-icon')) {document.getElementById('home-icon').src = `src/images/home_${theme}.png`};
            if(document.getElementById('profile-logo')) {document.getElementById('profile-logo').src = `src/images/under_pressure_${theme}.png`};
            if(document.getElementById('log-out-img')) {document.getElementById('log-out-img').src = `src/images/log-out_${theme}.png`}
            if(document.getElementById('log-out-img-hover')) {document.getElementById('log-out-img-hover').src = `src/images/log-out-hover_${theme}.png`}
            if(document.getElementById('menu-icon')) {document.getElementById('menu-icon').src = `src/images/menu_${theme}.png`}
        };
        
        [...selectTheme].forEach((button, index) => { 
            selectTheme[index].onclick = () => { 
                setTheme(document.querySelector('input[name="theme"]:checked').value);
                updateTheme();
            }
        });

        document.getElementById(theme).checked = true;

        updateTheme();     
    });

    if(theme == 'purple') {
        useEffect(() => {
            if(document.getElementById("background")) {document.getElementById("background").remove()};
            if(document.getElementById("windowIcon")) {document.getElementById("windowIcon").remove()};
            document.getElementById("theme-picker-container").after(purpleBackground);
            document.getElementsByTagName("head")[0].appendChild(iconTheme);
        })
    }
    else if(theme == 'blue') {
        useEffect(() => {
            if(document.getElementById("background")) {document.getElementById("background").remove()};
            if(document.getElementById("windowIcon")) {document.getElementById("windowIcon").remove()};
            document.getElementById("theme-picker-container").after(blueBackground);
            document.getElementsByTagName("head")[0].appendChild(iconTheme);
        })
    };

    return(
        <>  
        <div id="theme-picker-container">
            <link rel="stylesheet" href={`src/components/themes/theme_${theme}.css`} />
            <form id="theme-picker">
                <button id="palette"><img id="palette-icon" src="src/images/palette.png" alt="Palette" /></button>
                <input type="radio" id="blue" name="theme" value="blue" />
                <label id='blue-label' htmlFor="blue"><img src="src/images/theme_1.png" alt="Blue Theme" /></label>
                <input type="radio" id="purple" name="theme" value="purple" />
                <label id='purple-label' htmlFor="purple"><img src="src/images/theme_2.png" alt="Purple Theme" /></label>
            </form>
        </div>
    </>
    )
};

export default Background