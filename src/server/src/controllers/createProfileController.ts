import { Request, response, Response } from "express";
import { createUser } from "../services/createProfileService";


export class CreateProfileController {
    public createUser(req: Request, res: Response) {
        const userToken = req.body.data.userToken;
        const tableName = process.env.TABLE_NAME;
        
        try {
            createUser(userToken, tableName as string);
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }
}