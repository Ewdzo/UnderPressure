import { useEffect, useState } from "react";
import './profile.css'

const userToken = document.cookie.replace("userToken=", "");
const getGithubInfo = async () => {
    const res = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: "token " + userToken
      }
    });

    return res.json();
};
const userInfo = await getGithubInfo();

function Profile() {

    const [user, setUser] = useState(userInfo.name)
    const [avatar, setAvatar] = useState(`https://github.com/${userInfo.login}.png`)
    const [userHighscore, setUserHighscore] = useState(0)
    const [userStreak, setUserStreak] = useState(0)
    const [userMultiplier, setUserMultiplier] = useState(0)
    const [userMatchs, setUserMatchs] = useState(0)
    const [userDifficulty, setUserDifficulty] = useState('')

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

        if (userToken){
            const logOut = () => {
                document.cookie = "userToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                location.reload();
            }
    
            document.getElementById('log-out').onclick = () => logOut()

            document.getElementById('log-out').onmouseover = () => {
                document.getElementById('log-out-img').style.display = 'none'
                document.getElementById('log-out-img-hover').style.display = 'flex'
            }

            document.getElementById('log-out').onmouseout = () => {
                document.getElementById('log-out-img').style.display = 'flex'
                document.getElementById('log-out-img-hover').style.display = 'none'
            }
        }
    })

    if (userToken) {
        return ( 
            <>
                <div id='menu'><input id="menu-btn" type='checkbox' /><img id="menu-icon" src="src/images/hamburger_icon.png" alt="" /></div>            
                <div id="profile-container">
                    <a href={`https://github.com/${user}`} target='blank'><img id="profile-picture" src={avatar}  alt="" /></a>
                    <h1>{user}</h1>
                    <table>
                        <tbody>
                        <tr>
                            <td><img src="src/images/highscore.png" alt="Highscore Icon" /><h3>Highscore</h3><br />{userHighscore}</td>
                            <td><img src="src/images/streak.png" alt="Streak Icon" /><h3>Biggest Streak</h3><br />{userStreak}</td>
                        </tr>
                        <tr>
                            <td><img src="src/images/multiplier.png" alt="Multiplier Icon" /><h3>Biggest Multiplier</h3><br />{userMultiplier}</td>
                            <td><img src="src/images/joystick.png" alt="Joystick Icon" /><h3>Matches Played</h3><br />{userMatchs}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}><img src="src/images/difficulty.png" alt="Difficulty Icon" /><h3>Most Played Difficulty</h3><br />{userDifficulty}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button id="log-out"><img id="log-out-img" src="src/images/log-out.png" alt="" title="Log Out"/><img id="log-out-img-hover" src="src/images/log-out-hover.png" alt="" title="Log Out"/></button>
                </div>
            </>
        )
    }
    else{
        return ( 
            <>  
                <div id='menu'><input id="menu-btn" type='checkbox' /><img id="menu-icon" src="src/images/hamburger_icon.png" alt="" /></div>    
                <div id="profile-container">
                    <a href=""><img id="profile-picture" src='src/images/default_icon.png'  alt="" /></a>
                    <h1>Welcome, Guest!</h1>
                    <div id="game-logo"><img src="src/images/under_pressure.png" alt="" /></div>
                    <a href="http://localhost:8000/auth">
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