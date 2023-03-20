import { useEffect, useState } from "react";
import { getCookie, userToken } from "../cookies";
import { userGitInfo } from "./data";
import Axios from "axios";
import images from "../../images";
import './profile.css'
import { blueThemeClasses, purpleThemeClasses} from "../themes";

function Profile(props) {
    const themeClasses = [ blueThemeClasses, purpleThemeClasses];

    
    if(userToken) {
        const [userData, setUserData] = useState({score: 0, streak: 0, multiplier: 0, matches: 0, difficulty: 'No Matches Found'});
        const [user] = useState(userGitInfo.name);
        const [avatar] = useState(`https://github.com/${userGitInfo.login}.png`);
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
            };  
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
            };
        };

        useEffect(() => {
            updateProfile();
            playerRegister(); 

            if(userToken && !userData.synced) {
                setUserData({synced: true});
                Axios.get("http://localhost:8000/user/data", {
                    headers: {
                        userToken: userToken
                    }
                })
                .then(response => response.data)
                .then((response) => {
                    document.cookie = `score=${response.score}`;
                    document.cookie = `streak=${response.streak}`;
                    document.cookie = `multiplier=${response.multiplier}`;
                    document.cookie = `matches=${response.matches}`;
                    document.cookie = `difficulty=${response.difficulty}`;
                }).catch(err => console.log(err)) 
            };  

            const menuCheckbox = document.getElementById('menu-btn');
            const profileContainer = document.querySelector('#profile-container');

            menuCheckbox.onclick = () => { 
                if(menuCheckbox.checked == true) {
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
                <div id='menu'><input id="menu-btn" type='checkbox' /><img id="menu-icon" src={images[25 + props.theme]} alt="Menu Icon" /></div>            
                <div id="profile-container" className={themeClasses[props.theme].profileContainer}>
                    <a href={`https://github.com/${userGitInfo.login}`} target='blank'><img id="profile-picture" className={themeClasses[props.theme].profileContainerImages} src={avatar}  alt="Profile Picture" /></a>
                    <h1>{user}</h1>
                    <table>
                        <tbody>
                        <tr>
                            <td><img className={themeClasses[props.theme].profileContainerImages} src={images[17]} alt="Highscore Icon" /><h3>Highest Score</h3><span>{userHighscore}</span></td>
                            <td><img className={themeClasses[props.theme].profileContainerImages} src={images[31]} alt="Streak Icon" /><h3>Highest Streak</h3><span>{userStreak}</span></td>
                        </tr>
                        <tr>
                            <td><img className={themeClasses[props.theme].profileContainerImages} src={images[27]} alt="Multiplier Icon" /><h3>Highest Multiplier</h3><span>{userMultiplier}</span></td>
                            <td><img className={themeClasses[props.theme].profileContainerImages} src={images[20]} alt="Joystick Icon" /><h3>Matches Played</h3><span>{userMatches}</span></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><img className={themeClasses[props.theme].profileContainerImages} src={images[14]} alt="Difficulty Icon" /><h3>Last Played Difficulty</h3><span>{userDifficulty}</span></td>
                        </tr>
                        </tbody>
                    </table>
                    <div id='buttons'>
                        <button id="log-out"><img id="log-out-img" src={images[21 + props.theme]} alt="Log Out Icon" title="Log Out"/><img id="log-out-img-hover" src={images[23 + props.theme]} alt="Log Out Icon" title="Log Out"/></button>
                        <button id="refresh"><img src={images[30]} alt="Refresh Icon" title="Refresh Profile"/></button>
                    </div>
                </div>
            </>
        );
    }
    else {

        useEffect(() => {
            const menuCheckbox = document.getElementById('menu-btn');
            const profileContainer = document.querySelector('#profile-container');

            menuCheckbox.onclick = () => { 
                if(menuCheckbox.checked == true) {
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
        });

        return ( 
            <>  
                <div id='menu'><input id="menu-btn" type='checkbox' /><img id="menu-icon" src={images[25 + props.theme]} alt="Menu Icon" /></div>    
                <div id="profile-container" className={themeClasses[props.theme].profileContainer}>
                    <a href=""><img id="profile-picture" className={themeClasses[props.theme].profilePicture} src={images[13]}  alt="Profile Icon" /></a>
                    <h1>Welcome, Guest!</h1>
                    <div id="game-logo"><img id="profile-logo" src={images[34 + props.theme]} alt="Under Pressure Icon" /></div>
                    <a href="http://localhost:8000/auth">
                        <div id="log-in">
                            <img id="git-logo" src={images[15]} alt="GitHub Icon" />
                            <p>Log in with GitHub</p>
                        </div>
                    </a>
                </div>
            </>
        );
    };   
};

export default Profile