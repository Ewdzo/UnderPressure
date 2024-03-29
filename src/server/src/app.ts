import express from "express";
import cors from "cors";
import { authGithubRouter } from "./routes/authGithub.routes";
import { userRouter } from "./routes/user.routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use("/auth", authGithubRouter);
    this.app.use("/user", userRouter);
  }
}

export default new App().app;
