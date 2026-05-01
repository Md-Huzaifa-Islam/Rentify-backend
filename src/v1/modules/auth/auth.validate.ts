// here will be schema for zod for auth
import { z } from "zod";
import { UserRole } from "../../../../generated/prisma/enums";

// login schema
export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required and must be at least 2 characters long",
  }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum([UserRole.landlord, UserRole.tenant]).default(UserRole.tenant),
});
