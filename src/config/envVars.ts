import "dotenv/config";
import z from "zod";
import { sendError } from "../handlers/sendError";
import status from "http-status";

const env = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  BETTER_AUTH_URL: z.string().min(1, "Frontend url is required"),
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
};
