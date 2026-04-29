import { NextFunction, Request, Response } from "express";

export const sendResponse = ({
  statusCode = 200,
  message,
  data,
}: {
  statusCode: number;
  message: string;
  data?: any;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data: data ?? null,
    });
  };
};
