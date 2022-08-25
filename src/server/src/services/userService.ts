import { createConnection } from 'mysql'
import Axios from 'axios'

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
});


export const createUser = (userToken: string, table: string) => {
    
    Axios.get("https://api.github.com/user", {
        headers: {
            Authorization: "token " + userToken
        }
    })
    .then((response) => {
        const userName = response.data.login; 

        connection.query(`SELECT * from ${table}`, function (error, results, fields) {
            if (error) {
                if (error.code == 'ER_NO_SUCH_TABLE') {
                    connection.query(`CREATE TABLE IF NOT EXISTS ${table}(userName varchar(255) PRIMARY KEY, userScore int, userStreak int, userMultiplier int, userMatches int, userDifficulty text)`, function (error, results, fields) {
                        if (error) throw error;
                        else{
                            connection.query(`INSERT IGNORE INTO ${table}(userName, userScore, userStreak, userMultiplier, userMatches, userDifficulty) VALUES ('${userName}', 0, 0, 0, 0, "No Matches Found")`, function (error, results, fields) {
                                if (error) throw error;
                                else { console.log(`User ${userName} Registered`) }
                            })
                        }
                    })
                }
                else {throw error}
            }
            else if(results) {
                connection.query(`SELECT * from ${table} WHERE userName='${userName}'`, function (error, results, fields) {
                    if (error) {throw error}
                    else if(results) {
                        if(results.toString() == '') {
                            connection.query(`INSERT IGNORE INTO ${table}(userName, userScore, userStreak, userMultiplier, userMatches, userDifficulty) VALUES ('${userName}', 0, 0, 0, 0, "No Matches Found")`, function (error, results, fields) {
                                if (error) throw error;
                                else { console.log(`User ${userName} Registered`) }
                            })
                        }
                    }
                })
            }
        })
    })
    .catch(err => console.log(err));

};

export const updateUser = (userToken: string, table: string, score: string, streak: string, multiplier: string, difficulty: string) => {

    Axios.get("https://api.github.com/user", {
        headers: {
            Authorization: "token " + userToken
        }
    })
    .then((response) => {connection.query(`SELECT * from ${table}`, function (error, results, fields) {
        const userName = response.data.login; 

        if (error) {throw error}
        else if(results) {
            connection.query(`SELECT * from ${table} WHERE userName='${userName}'`, function (error, results, fields) {
                if (error) {throw error}
                else if(results) {
                    connection.query(`UPDATE ${table} SET userScore = ${score}, userStreak = ${streak}, userMultiplier = ${multiplier}, userMatches = userMatches + 1, userDifficulty = '${difficulty}' WHERE userName = '${userName}'`, function (error, results, fields) {
                        if(error) {throw error}
                        else { console.log(`${userName}'s Register Updated`) }
                    }) 
                }
            })
        }
    })})
    .catch(err => console.log(err));
    
};

export const getUserData = (userToken: string, table: string, callback: Function) => {

    Axios.get("https://api.github.com/user", {
        headers: {
            Authorization: "token " + userToken
        }
    })
    .then((response) => {
        const userName = response.data.login; 

        connection.query(`SELECT * FROM ${table} WHERE userName='${userName}' && EXISTS (SELECT * from ${table} WHERE userName='${userName}');`, function (error, results, fields) {
            if (error) {
                if (error.code == 'ER_NO_SUCH_TABLE') {
                    console.log(`${table} and ${userName} not yet registered`)
                }
                else {throw error}
            }
            else if(results){
                if(!(results.toString() == '')){
                    return callback({score: results[0].userScore, streak: results[0].userStreak, multiplier: results[0].userMultiplier, matches: results[0].userMatches, difficulty: results[0].userDifficulty})
                }
                else {
                    return callback({score: 0, streak: 0, multiplier: 0, matches: 0, difficulty: 'No Matches Found'})
                }     
            }
        })
    })
    .catch(err => console.log(err));
};

export const getUser = (userToken: string, table: string, callback: Function) => {

    Axios.get("https://api.github.com/user", {
        headers: {
            Authorization: "token " + userToken
        }
    })
    .then((response) => {
        const userName = response.data.login; 

        connection.query(`SELECT * FROM ${table} WHERE userName='${userName}' && EXISTS (SELECT * from ${table} WHERE userName='${userName}');`, function (error, results, fields) {
            if (error) {
                if (error.code == 'ER_NO_SUCH_TABLE') {
                    console.log(`${table} and ${userName} not yet registered`)
                }
                else {throw error}
            }
            else if(results){
                if(!(results.toString() == '')){
                    return callback(`${userName} currently registered`)
                }
                else {
                    return callback(`${userName} not currently registered`)
                }     
            }
        })
    })
    .catch(err => console.log(err));
};