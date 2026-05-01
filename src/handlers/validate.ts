import { z } from "zod";
import { sendError } from "./sendError";
import status from "http-status";

export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const formattedMessage = result.error.issues
      .map((issue) => {
        const field = issue.path.length ? issue.path.join(".") : "request";
        return `${field}: ${issue.message}`;
      })
      .join(", ");

    throw sendError({
      statusCode: status.BAD_REQUEST,
      message: formattedMessage ? `${formattedMessage}` : "Validation failed",
    });
  }
  return result.data;
};
