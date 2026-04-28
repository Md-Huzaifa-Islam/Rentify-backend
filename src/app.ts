import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma";
const app = express();
app.get("/", async (req: Request, res: Response) => {
  const result = await prisma.user.findMany();
  res.status(200).json({ message: "Hello World!", data: result });
});

export default app;
