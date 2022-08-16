import { Router } from "express";
import { CreateProfileController } from "../controllers/createProfileController";

const createProfileRouter = Router();
const createProfileController = new CreateProfileController();

createProfileRouter.post("/", createProfileController.setUserStats)


export { createProfileRouter };