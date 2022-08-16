import { Request, response, Response } from "express";
import { setUserStats } from "../services/createProfileService";


export class CreateProfileController {
    public setUserStats(req: Request, res: Response) {
        const userToken = req.body.data.userToken;
        const tableName = process.env.TABLE_NAME;
        
        try {
            setUserStats(userToken, tableName as string);
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }
}