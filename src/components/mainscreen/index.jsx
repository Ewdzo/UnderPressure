import './main.css'

function MainScreen() {


    return (
        <div id="main">
            <div id='menu'><a href=""><i className="fa fa-bars"></i></a></div>
            <div id='profile'><a href=""><img src="src/images/default_icon.png" alt="" /></a></div>
            <div id='title'><h1>Under Pressure</h1></div>
            <div id='prompt'>
                <button id="start">Play</button>
                <form id="difficulty-selector" action="">
                    <label htmlFor="easy">Easy</label>
                    <label htmlFor="medium">Medium</label>
                    <label htmlFor="hard">Hard</label>
                    <label htmlFor="insane">Insane</label><br />
                    <input type="radio" id="easy" name="difficulty" value="Easy" />
                    <input type="radio" id="medium" name="difficulty" value="Medium" />
                    <input type="radio" id="hard" name="difficulty" value="Hard" />  
                    <input type="radio" id="insane" name="difficulty" value="Insane" />    
                </form> 
            </div> 
        </div>    
    )
};

export default MainScreen