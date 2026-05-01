import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../handlers/catchAsync";
import { validate } from "../../../handlers/validate";
import { loginSchema, registerSchema } from "./auth.validate";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../../handlers/sendResponse";
import status from "http-status";
import { sendError } from "../../../handlers/sendError";
import {
  CookieName,
  CookiesHandlers,
} from "../../../handlers/cookiesHandlers/cookies";
import { envVars } from "../../../config/envVars";
import ms, { StringValue } from "ms";
import { JwtHandlers } from "../../../handlers/cookiesHandlers/jwt";

const isProduction = envVars.NODE_ENV === "production";
const refreshExpiry =
  typeof ms("7d" as StringValue) === "number"
    ? ms("7d" as StringValue)
    : 604800000;

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = validate(loginSchema, req.body);
    const result = await AuthServices.login(email, password);
    CookiesHandlers.setCookie(res, CookieName.SessionToken, result.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: refreshExpiry,
      path: "/",
    });

    sendResponse(res, {
      statusCode: status.OK,
      message: "Login successful",
      data: result,
    });
  },
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sessionToken = CookiesHandlers.getCookie(
      req,
      CookieName.SessionToken,
    );
    if (!sessionToken) {
      throw sendError({
        statusCode: status.BAD_REQUEST,
        message: "Session token is required",
      });
    }

    await AuthServices.logout(sessionToken, req);

    CookiesHandlers.clearCookie(res, CookieName.SessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    sendResponse(res, {
      statusCode: status.OK,
      message: "Logout successful",
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
  verifyEmail,
  logout,
};
