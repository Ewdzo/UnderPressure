import { useState, useEffect } from "react";

function Background() {

    const [theme, setTheme] = useState('Purple');


    useEffect (() => {
        
        const selectTheme = document.getElementsByName('theme');
        
        [...selectTheme].forEach((button, index) => { 
            selectTheme[index].onclick = () => { 
                setTheme(document.querySelector('input[name="theme"]:checked').value)
            }
        });

    });


    if (theme == 'Purple') {
        return(
            <>  
                <link rel="stylesheet" href="src/components/underpressure/theme_purple.css" />
                <form id="theme">
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
                <form id="theme">
                    <input type="radio" id="blue" name="theme" defaultChecked value="Blue" />
                    <input type="radio" id="purple" name="theme" value="Purple" />
                </form>
                <img src="src/images/background-blue.jpg" id="background" alt="" />
            </>
        )
    }
}

export default Background