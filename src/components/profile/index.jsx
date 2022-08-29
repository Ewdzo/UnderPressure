import { useEffect, useState } from "react";
import './profile.css'
import Axios from "axios";

const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=')
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
};
const userToken = getCookie("userToken");
const getGithubInfo = async () => {
    if (userToken){
        const res = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: "token " + userToken
            }
        });
      
        return res.json();
    }
};
const userGitInfo = await getGithubInfo();


function Profile() {


    if (userToken) {
        const [userData, setUserData] = useState({score: 0, streak: 0, multiplier: 0, matches: 0, difficulty: 'No Matches Found'});
        const [user, setUser] = useState(userGitInfo.name);
        const [avatar, setAvatar] = useState(`https://github.com/${userGitInfo.login}.png`);
        const [userHighscore, setUserHighscore] = useState(userData.score);
        const [userStreak, setUserStreak] = useState(userData.streak);
        const [userMultiplier, setUserMultiplier] = useState(userData.multiplier);
        const [userMatches, setUserMatches] = useState(userData.matches);
        const [userDifficulty, setUserDifficulty] = useState(userData.difficulty);

        const playerRegister = () => {
            if(userToken) {
                Axios.get("http://localhost:8000/user/", {
                    headers: {
                        userToken: userToken
                    }
                })
                .then(response => response.data)
                .then(response => response.includes("currently registered"))
                .then(response => {if(response==false){
                    Axios.post("http://localhost:8000/user/create", {
                        data: {
                            userToken: userToken
                        }
                    });
                }})
                .catch(err => console.log(err)) 
            }   
        };

        const updateProfile = () => {
            const cookieScore = Number(getCookie("score"));
            const cookieStreak = Number(getCookie("streak"));
            const cookieMultiplier = Number(getCookie("multiplier"));
            const cookieMatches = Number(getCookie("matches"));
            const cookieDifficulty = getCookie("difficulty");

            if(cookieScore){
                if(cookieScore > userHighscore){setUserHighscore(cookieScore)};
                if(cookieStreak > userStreak){setUserStreak(cookieStreak)};
                if(cookieMultiplier > userMultiplier){setUserMultiplier(cookieMultiplier)};
                if(cookieMatches > userMatches){setUserMatches(cookieMatches)};
                if(cookieDifficulty != 'No Matches Found'){setUserDifficulty(cookieDifficulty)};
            }
        };

        useEffect(() => {
            updateProfile();
            playerRegister();          
        });

        useEffect(() => {
            if(userToken && !userData.synced) {
                setUserData({synced: true});
                Axios.get("http://localhost:8000/user/data", {
                    headers: {
                        userToken: userToken
                    }
                })
                .then(response => response.data)
                .then((response) => {
                    document.cookie = `score=${response.score}`
                    document.cookie = `streak=${response.streak}`
                    document.cookie = `multiplier=${response.multiplier}`
                    document.cookie = `matches=${response.matches}`
                    document.cookie = `difficulty=${response.difficulty}`
                }).catch(err => console.log(err)) 
            }      
        });

        useEffect(() => {
            const menuCheckbox = document.getElementById('menu-btn');
            const profileContainer = document.querySelector('#profile-container');

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
                };
            };

            const logOut = () => {
                document.cookie = "userToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                document.cookie = "score= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                document.cookie = "streak= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                document.cookie = "multiplier= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                document.cookie = "matches= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                document.cookie = "difficulty= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                location.reload();
            };


            document.getElementById('refresh').onclick = () => updateProfile();
            document.getElementById('log-out').onclick = () => logOut();

            document.getElementById('log-out').onmouseover = () => {
                document.getElementById('log-out-img').style.display = 'none'
                document.getElementById('log-out-img-hover').style.display = 'flex'
            };

            document.getElementById('log-out').onmouseout = () => {
                document.getElementById('log-out-img').style.display = 'flex'
                document.getElementById('log-out-img-hover').style.display = 'none'
            };
        });


        return ( 
            <>
                <div id='menu'><input id="menu-btn" type='checkbox' /><img id="menu-icon" src="src/images/menu.png" alt="" /></div>            
                <div id="profile-container">
                    <a href={`https://github.com/${user}`} target='blank'><img id="profile-picture" src={avatar}  alt="" /></a>
                    <h1>{user}</h1>
                    <table>
                        <tbody>
                        <tr>
                            <td><img src="src/images/highscore.png" alt="Highscore Icon" /><h3>Highest Score</h3><span>{userHighscore}</span></td>
                            <td><img src="src/images/streak.png" alt="Streak Icon" /><h3>Highest Streak</h3><span>{userStreak}</span></td>
                        </tr>
                        <tr>
                            <td><img src="src/images/multiplier.png" alt="Multiplier Icon" /><h3>Highest Multiplier</h3><span>{userMultiplier}</span></td>
                            <td><img src="src/images/joystick.png" alt="Joystick Icon" /><h3>Matches Played</h3><span>{userMatches}</span></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><img src="src/images/difficulty.png" alt="Difficulty Icon" /><h3>Last Played Difficulty</h3><span>{userDifficulty}</span></td>
                        </tr>
                        </tbody>
                    </table>
                    <div id='buttons'>
                        <button id="log-out"><img id="log-out-img" src="src/images/log-out.png" alt="" title="Log Out"/><img id="log-out-img-hover" src="src/images/log-out-hover.png" alt="" title="Log Out"/></button>
                        <button id="refresh"><img src="src/images/refresh.png" alt="" title="Refresh Profile"/></button>
                    </div>
                    
                </div>
            </>
        );
    }
    else {
        useEffect(() => {
            const theme = document.querySelector('input[name="theme"]:checked').value;
            const menuCheckbox = document.getElementById('menu-btn');
            const profileContainer = document.querySelector('#profile-container');
    
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
                };
            };
            
            document.getElementById('profile-logo').src = `src/images/under_pressure_${theme}.png`;
            document.getElementById('menu-icon').src = `src/images/menu_${theme}.png`;
        });

        return ( 
            <>  
                <div id='menu'><input id="menu-btn" type='checkbox' /><img id="menu-icon" alt="" /></div>    
                <div id="profile-container">
                    <a href=""><img id="profile-picture" src='src/images/default_icon.png'  alt="" /></a>
                    <h1>Welcome, Guest!</h1>
                    <div id="game-logo"><img id="profile-logo" alt="" /></div>
                    <a href="http://localhost:8000/auth">
                        <div id="auth-btn">
                            <img id="git-logo" src="src/images/github.png" alt="" />
                            <p>Log in with GitHub</p>
                        </div>
                    </a>
                </div>
            </>
        );
    };   
};

export default Profile