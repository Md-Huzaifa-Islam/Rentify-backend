import "dotenv/config";
import z from "zod";
import { sendError } from "../handlers/sendError";
import status from "http-status";

const env = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  BETTER_AUTH_URL: z.string().min(1, "Frontend url is required"),
  BETTER_AUTH_SECRET: z.string().min(1, "Better auth secret is required"),
  ACCESS_TOKEN_SECRET: z.string().min(1, "Access token secret is required"),
  REFRESH_TOKEN_SECRET: z.string().min(1, "Refresh token secret is required"),
  ACCESS_TOKEN_EXPIRATION: z
    .string()
    .min(1, "Access token expiration is required")
    .default("30m"),
  REFRESH_TOKEN_EXPIRATION: z
    .string()
    .min(1, "Refresh token expiration is required")
    .default("7d"),
});

const envParsed = env.safeParse(process.env);

if (!envParsed.success) {
  throw sendError({
    statusCode: status.NOT_FOUND,
    message: `Invalid environment variables: ${JSON.stringify(envParsed.error.format())}`,
  });
}

export const envVars = {
  PORT: envParsed.data.PORT,
  NODE_ENV: envParsed.data.NODE_ENV,
  DATABASE_URL: envParsed.data.DATABASE_URL,
  FRONTEND_URL: envParsed.data.BETTER_AUTH_URL,
  BETTER_AUTH_SECRET: envParsed.data.BETTER_AUTH_SECRET,
  ACCESS_TOKEN_SECRET: envParsed.data.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: envParsed.data.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: envParsed.data.ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION: envParsed.data.REFRESH_TOKEN_EXPIRATION,
};
