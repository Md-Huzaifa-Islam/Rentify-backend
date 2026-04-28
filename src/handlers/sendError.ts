import status from "http-status";
import { AppError } from "../types/AppError";

export const sendError = ({
  statusCode,
  message,
}: {
  statusCode?: number;
  message?: string;
}) => {
  const err = new Error(message ?? "Internal Server Error") as AppError;
  err.statusCode = statusCode ?? status.INTERNAL_SERVER_ERROR;
  return err;
};
