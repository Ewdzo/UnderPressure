import { createConnection } from 'mysql'

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

export const updateUser = (userToken: string, table: string, score: string, streak: string, multiplier: string, difficulty: string) => {
    connection.query(`SELECT * from ${table}`, function (error, results, fields) {
      if (error) {
        if (error.code == 'ER_NO_SUCH_TABLE') {
            connection.query(`CREATE TABLE ${table}(userToken varchar(255) PRIMARY KEY, userScore int, userStreak int, userMultiplier int, userMatches int, userDifficulty text)`, function (error, results, fields) {
                if (error) throw error;
                else {
                    connection.query(`INSERT INTO ${table}(userToken, userScore, userStreak, userMultiplier, userMatches, userDifficulty) VALUES ('${userToken}', ${defaultScore}, ${defaultStreak}, ${defaultMultiplier}, ${defaultMatches}, '${defaultDifficulty}' )`, function (error, results, fields) {
                        if (error) throw error;
                        else {
                            connection.query(`UPDATE ${table} SET userScore = ${score}, userStreak = ${streak}, userMultiplier = ${multiplier}, userMatches = userMatches + 1, userDifficulty = '${difficulty}' WHERE userToken = '${userToken}'`, function (error, results, fields) {
                                if(error) {throw error}
                                else { console.log('User Register Updated') }
                            }) 
                        }
                    })
                }
            })
        }
        else {throw error}
      }
      else if(results) {
        connection.query(`SELECT * from ${table} WHERE userToken='${userToken}'`, function (error, results, fields) {
                if (error) {throw error}
                else if(results) { 
                    if(results.toString() == '') {
                        connection.query(`INSERT INTO ${table}(userToken, userScore, userStreak, userMultiplier, userMatches, userDifficulty) VALUES ('${userToken}', ${defaultScore}, ${defaultStreak}, ${defaultMultiplier}, ${defaultMatches}, '${defaultDifficulty}' )`, function (error, results, fields) {
                            if (error) throw error;
                            else {
                                connection.query(`UPDATE ${table} SET userScore = ${score}, userStreak = ${streak}, userMultiplier = ${multiplier}, userMatches = userMatches + 1, userDifficulty = '${difficulty}' WHERE userToken = '${userToken}'`, function (error, results, fields) {
                                    if(error) {throw error}
                                    else { console.log('User Register Updated') }
                                })
                            }
                        })
                    }
                    else {
                        connection.query(`UPDATE ${table} SET userScore = ${score}, userStreak = ${streak}, userMultiplier = ${multiplier}, userMatches = userMatches + 1, userDifficulty = '${difficulty}' WHERE userToken = '${userToken}'`, function (error, results, fields) {
                            if(error) {throw error}
                            else { console.log('User Register Updated') }
                        })
                    }
                }
        })
      }
    })
};