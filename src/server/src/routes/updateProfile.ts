import { Router } from "express";
import { createConnection } from 'mysql'
import { UpdateProfileController } from "../controllers/updateProfileController";
const updateProfileRouter = Router();
const updateProfileController = new UpdateProfileController();

const defaultScore = 0
const defaultStreak = 0
const defaultMultiplier = 0
const defaultMatches = 0
const defaultDifficulty = 'No matches found'

const connection = createConnection({
    host: process.env.SERVER_URL,
    port: process.env.SERVER_PORT as unknown as number,
    user: process.env.SERVER_USER,
    password: process.env.SERVER_PWD,
    database: process.env.SERVER_DATABASE
});

connection.connect(function(err) {
    if (err) console.log(err);
    
    console.log("Connected!");
});


const getUserStats = (userToken: string, table: string, callback: Function) => {
    connection.query(`SELECT * from ${table} WHERE userToken='${userToken}'`, function (error, results, fields) {
        if (error) {throw error}
        else if(results) { 
            if(results.toString() == ''){
                return 'No Results'
            }
            else {
                return callback({score: results[0].userScore, streak: results[0].userStreak, multiplier: results[0].userMultiplier, matches: results[0].userMatches, difficulty: results[0].userDifficulty })
            }
        }
    })
}


updateProfileRouter.post("/", updateProfileController.updateUser)

updateProfileRouter.get("/", async (req, res) => {

    const userToken = req.header('userToken');
    const tableName = process.env.TABLE_NAME;
    getUserStats(userToken as string, tableName as string, function(result: object){
        res.status(200).send(result)
    }) 
});

export { updateProfileRouter };