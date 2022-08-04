import { useEffect, useState } from "react";
import './profile.css'

function Profile() {
    const isLogged = true;

    const [user, setUser] = useState('Ewdzo')
    const [userHighscore, setUserHighscore] = useState(100000)
    const [userStreak, setUserStreak] = useState(500)
    const [userMultiplier, setUserMultiplier] = useState(25)
    const [userMatchs, setUserMatchs] = useState(100)
    const [userDifficulty, setUserDifficulty] = useState('Medium')

    useEffect(() => {
        const menuCheckbox = document.getElementById('menu-btn')
        const profileContainer = document.querySelector('#profile-container')

        menuCheckbox.onclick = () => { 
            if (menuCheckbox.checked == true) {
                profileContainer.style.bottom = '0'
                profileContainer.classList.remove('animate__animated', 'animate__bounceOutLeft')
                profileContainer.classList.add('animate__animated', 'animate__bounceInLeft')
                profileContainer.style.transform = 'translateX(0)'
                
            }
            else {
                profileContainer.classList.remove('animate__animated', 'animate__bounceInLeft')
                profileContainer.classList.add('animate__animated', 'animate__bounceOutLeft')
            }
        }
    })

    if (isLogged == true) {
        return ( 
            <>
                <div id='menu'><input id="menu-btn" type='checkbox' /><img id="menu-icon" src="src/images/hamburger_icon.png" alt="" /></div>            
                <div id="profile-container">
                    <a href={`https://github.com/${user}`} target='blank'><img id="profile-picture" src={`https://github.com/${user}.png`}  alt="" /></a>
                    <h1>{user}</h1>
                    <ul>
                        <li><h3>Highscore</h3><br />{userHighscore}</li>
                        <li><h3>Biggest Streak</h3><br />{userStreak}</li>
                        <li><h3>Biggest Multiplier</h3><br />{userMultiplier}</li>
                        <li><h3>Matches Played</h3><br />{userMatchs}</li>
                        <li><h3>Most Played Difficulty</h3><br />{userDifficulty}</li>
                    </ul>
                    <button id="log-out"><img src="src/images/log-out.png" alt="" title="Log Out"/></button>
                </div>
            </>
        )
    }
    else if(isLogged == false) {
        return ( 
            <>  
                <div id='menu'><input id="menu-btn" type='checkbox' /><i className="fa fa-bars"></i></div>  
                <div id="profile-container">
                    <a href=""><img id="profile-picture" src='src/images/default_icon.png'  alt="" /></a>
                    <h1>Welcome, Guest!</h1>
                    <a href="/">
                        <div id="auth-btn">
                            <img id="git-logo" src="src/images/github.png" alt="" />
                            <p>Log in with GitHub</p>
                        </div>
                    </a>
                </div>
            </>
        )
    }   
}

export default Profile