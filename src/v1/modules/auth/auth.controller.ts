import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../handlers/catchAsync";
import { validate } from "../../../handlers/validate";
import { loginSchema, registerSchema } from "./auth.validate";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../../handlers/sendResponse";
import status from "http-status";
import { sendError } from "../../../handlers/sendError";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = validate(loginSchema, req.body);
    const result = await AuthServices.login(email, password);
    sendResponse(res, {
      statusCode: status.OK,
      message: "Login successful",
      data: result,
    });
  },
);

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = validate(registerSchema, req.body);
    const result = await AuthServices.register({ name, email, password, role });
    sendResponse(res, {
      statusCode: status.CREATED,
      message: "User registered successfully",
      data: result,
    });
  },
);

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const verifyEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
      throw sendError({
        statusCode: status.BAD_REQUEST,
        message: "Token is required",
      });
    }

    const result = await AuthServices.verifyEmail(token);
    sendResponse(res, {
      statusCode: status.OK,
      message: "Email verified successfully",
      data: result,
    });
  },
);

export const AuthControllers = {
  login,
  register,
  refreshToken,
  verifyEmail,
};
