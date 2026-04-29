import { NextFunction, Request, Response } from "express";

export const sendResponse = (
  res: Response,
  {
    statusCode = 200,
    message,
    data,
  }: {
    statusCode: number;
    message: string;
    data?: any;
  },
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
  });
};
