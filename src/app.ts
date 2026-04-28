import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./handlers/errorHandler";
import { notFoundHandler } from "./handlers/notFoundHandler";
const app = express();
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

// not found handlers
app.use(notFoundHandler());

// error handlers
app.use(errorHandler());

export default app;
