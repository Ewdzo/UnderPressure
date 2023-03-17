import { useState, useEffect } from "react";
import './theme_picker.css';
import images from "../../images";
import backgroundVideo from "../../videos/background.mp4";

function ThemeSrc() {

    const [theme, setTheme] = useState('blue');
    const [themeIndex, setThemeIndex] = useState('0');

    const blueBackground = document.createElement("img");
    blueBackground.id = "background";
    blueBackground.src = images[4];
    blueBackground.alt = "Blue Mountains Pixel Art";

    const purpleBackground = document.createElement("video");
    purpleBackground.src = backgroundVideo;
    purpleBackground.id = "background";
    purpleBackground.muted = true;
    purpleBackground.autoplay = true;
    purpleBackground.loop = true;

    const iconTheme = document.createElement("link");
    iconTheme.rel = "icon";
    iconTheme.type = "image/x-icon";
    iconTheme.id = 'windowIcon';
    iconTheme.href = images[34 + themeIndex];

    const updateTheme = () => {
        if(theme == 'blue'){ setThemeIndex(0) }
        else if(theme == 'purple'){ setThemeIndex(1) };

        if(document.getElementById('logo')) {document.getElementById('logo').src = images[34 + themeIndex]};
        if(document.getElementById('home-icon')) {document.getElementById('home-icon').src = images[18 + themeIndex]};
        if(document.getElementById('profile-logo')) {document.getElementById('profile-logo').src = images[34 + themeIndex]};
        if(document.getElementById('log-out-img')) {document.getElementById('log-out-img').src = images[21 + themeIndex]}
        if(document.getElementById('log-out-img-hover')) {document.getElementById('log-out-img-hover').src = images[23 + themeIndex]}
        if(document.getElementById('menu-icon')) {document.getElementById('menu-icon').src = images[25 + themeIndex]}
    };

    useEffect (() => {
        const selectTheme = document.getElementsByName('theme');
        
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
            <form id="theme-picker">
                <button id="palette"><img id="palette-icon" src={images[29]} alt="Palette" /></button>
                <input type="radio" id="blue" name="theme" value="blue" />
                <label id='blue-label' htmlFor="blue"><img src={images[32]} alt="Blue Theme" /></label>
                <input type="radio" id="purple" name="theme" value="purple" />
                <label id='purple-label' htmlFor="purple"><img src={images[33]} /></label>
            </form>
        </div>
    </>
    )
};

export default ThemeSrc

class ThemeCSSClasses {
    construct(profileContainerClass, profileContainerImagesClass, swallButtonClass, promptButtonClass, difficultySelectorClass, difficultySelectedClass){
        this.profileContainer = profileContainerClass;
        this.profileContainerImages = profileContainerImagesClass;
        this.profilePicture = profileContainerImagesClass;
        this.swallButton = swallButtonClass;
        this.promptButton = promptButtonClass;
        this.difficultySelector = difficultySelectorClass;
        this.difficultySelected = difficultySelectedClass;
    }
}

export const blueThemeClasses = new ThemeCSSClasses("blue-theme-profile-container", "blue-theme-profile-container-image", "swal-button-blue", "prompt-button-blue", "difficulty-selector-blue", "difficulty-selected-blue");

export const purpleThemeClasses = new ThemeCSSClasses("purple-theme-profile-container", "purple-theme-profile-container-image", "swal-button-purple", "prompt-button-purple", "difficulty-selector-purple", "difficulty-selected-purple");