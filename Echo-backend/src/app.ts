import express, { Application, Request, Response } from "express";
import { errorHandlerMiddleware } from "./shared/middlewares/error-handler.middleware.js";
import { usersRouter } from "./modules/users/users.module.js";

export function createApp(): Application {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/v1/users", usersRouter);

  app.use(errorHandlerMiddleware);

  return app;
}
