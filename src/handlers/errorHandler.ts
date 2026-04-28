import { NextFunction, Request, Response } from "express";
import { AppError } from "../types/AppError";
import status from "http-status";

export const errorHandler = () => {
  return (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;
    const message = err.message || "Internal Server Error";
    console.error(err);
    return res.status(statusCode).json({ success: false, message });
  };
};
