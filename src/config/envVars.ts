import "dotenv/config";
import z from "zod";

const env = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string().default("development"),
});

const envParsed = env.safeParse(process.env);

if (!envParsed.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(envParsed.error.format())}`,
  );
}

export const envVars = {
  PORT: envParsed.data.PORT,
  NODE_ENV: envParsed.data.NODE_ENV,
};
