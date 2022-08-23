import { Request, Response } from "express";
import { createUser, updateUser, getUserData } from "../services/userService";


export class UserController {
    public createUser(req: Request, res: Response) {
        const userToken = req.body.data.userToken;
        const tableName = process.env.TABLE_NAME;
        
        try {
            createUser(userToken, tableName as string);
        }
        catch (error) {
            res.status(400).send({ error: error })
        }
    }

    public updateUser(req: Request, res: Response) {
        const userToken = req.body.data.userToken;
        const score = req.body.data.score;
        const streak = req.body.data.streak;
        const multiplier = req.body.data.multiplier;
        const difficulty = req.body.data.difficulty;
        const tableName = process.env.TABLE_NAME;
        
        try {
            updateUser(userToken, tableName as string, score, streak, multiplier as string, difficulty);
        } 
        catch (error) {
            res.status(400).send({ error: error })
        }
    }

    public getUserData(req: Request, res: Response) {
        const userToken = req.get('userToken');
        const tableName = process.env.TABLE_NAME;
        
        try {
            getUserData(userToken as string, tableName as string, (results: any) => {res.status(200).send(results)} )
        } 
        catch (error) {
            console.log(error)
            res.status(400).send({ error: error })
        }
    }
}