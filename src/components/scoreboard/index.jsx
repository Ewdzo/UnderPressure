export function Scoreboard(props) {
    return(
        <div style={{display: "flex", justifyContent: "center"} }>
            <strong>Score: {props.score} | Streak: {props.streak} | Time: {props.time}ms | Difficulty: {props.difficulty} | Lifes: {props.life} | Multiplier: {props.multiplier} | Highscore: {props.highscore}</strong>

        </div>
    )
}
