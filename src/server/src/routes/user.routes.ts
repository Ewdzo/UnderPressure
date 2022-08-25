import { Router } from "express";
import { UserController } from "../controllers/userController";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/create", userController.createUser)
userRouter.post("/update", userController.updateUser)
userRouter.get("/data", userController.getUserData)
userRouter.get("/", userController.getUser)


export { userRouter };