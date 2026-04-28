import { NextFunction, Request, Response } from "express";
import { sendError } from "./sendError";
import status from "http-status";

export const notFoundHandler = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    throw sendError({ statusCode: status.NOT_FOUND, message: "Not Found" });
  };
};
