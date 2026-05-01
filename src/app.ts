import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./handlers/errorHandler";
import { notFoundHandler } from "./handlers/notFoundHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envVars } from "./config/envVars";
import { sendResponse } from "./handlers/sendResponse";
import { V1Routes } from "./v1/v1.route";
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [envVars.FRONTEND_URL],
    credentials: true,
  }),
);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Welcome to rentify API!",
  });
});

// v1 routes

app.use("/v1", V1Routes);

// not found handlers
app.use(notFoundHandler());

// error handlers
app.use(errorHandler());

export default app;
