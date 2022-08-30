import { useState, useEffect } from "react";

function Background() {

    const [theme, setTheme] = useState('Purple');


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
                <link rel="stylesheet" href="src/components/underpressure/theme_purple.css" />
                <form id="theme" style={{position: 'absolute', 'z-index': '3'}}>
                    <input type="radio" id="blue" name="theme" value="Blue" />
                    <input type="radio" id="purple" name="theme" defaultChecked value="Purple" />
                </form>
                <video autoPlay muted loop id="background">
                    <source src="./src/videos/background.mp4" type="video/mp4" />
                </video>
            </>
        )
    }
    else if(theme == 'Blue'){
        return(
            <>  
                <link rel="stylesheet" href="src/components/underpressure/theme_blue.css" />
                <form id="theme" style={{position: 'absolute'}}>
                    <input type="radio" id="blue" name="theme" defaultChecked value="Blue" />
                    <input type="radio" id="purple" name="theme" value="Purple" />
                </form>
                <img src="src/images/background-blue.png" id="background" alt="" />
            </>
        )
    }
}

export default Background