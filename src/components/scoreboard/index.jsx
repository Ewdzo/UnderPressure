import './scoreboard.css'

function Scoreboard(props) {
    return(
        <div id='scoreboard' style={{display: 'block'}}>
            <div id='scoremulti'>
                <div id='score'>Score: {props.score}</div>
                <div id='multiplier'>{props.multiplier}x</div>
            </div>
            <div id='streak'>Streak: {props.streak}</div>
            <div id='difficulty'>Difficulty: {props.difficulty}</div>
            <div id='lifes'>Lifes: {props.lifes}</div>
            <div id='highscore'>Highscore: {props.highscore}</div> 
        </div>
    )
}

export default Scoreboard