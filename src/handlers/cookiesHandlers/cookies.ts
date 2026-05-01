import { Request, Response } from "express";

export enum CookieName {
  AccessToken = "access_token",
  RefreshToken = "refresh_token",
  SessionToken = "session_token",
}

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number;
  path?: string;
};

const getCookie = (req: Request, cookieName: CookieName) => {
  const cookies = req.cookies;
  return cookies ? cookies[cookieName] : null;
};

const setCookie = (
  res: Response,
  cookieName: CookieName,
  cookieValue: string,
  options: CookieOptions,
) => {
  res.cookie(cookieName, cookieValue, options);
};

const clearCookie = (
  res: Response,
  cookieName: CookieName,
  options: CookieOptions,
) => {
  res.clearCookie(cookieName, options);
};

export const CookiesHandlers = {
  getCookie,
  setCookie,
  clearCookie,
};
