import { Request, response, Response } from "express";
import { updateUser } from "../services/updateProfileService";

export class UpdateProfileController {
    public updateUser(req: Request, res: Response) {
        const userToken = req.body.data.userToken;
        const score = req.body.data.score;
        const streak = req.body.data.streak;
        const multiplier = req.body.data.multiplier;
        const difficulty = req.body.data.difficulty;
        const tableName = process.env.TABLE_NAME;
        
        try {
            updateUser(userToken, tableName as string, score, streak, multiplier as string, difficulty);
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }
}