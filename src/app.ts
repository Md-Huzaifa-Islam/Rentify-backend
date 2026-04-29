import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./handlers/errorHandler";
import { notFoundHandler } from "./handlers/notFoundHandler";
import cors from "cors";
import { envVars } from "./config/envVars";
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [envVars.FRONTEND_URL],
  }),
);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

// not found handlers
app.use(notFoundHandler());

// error handlers
app.use(errorHandler());

export default app;
