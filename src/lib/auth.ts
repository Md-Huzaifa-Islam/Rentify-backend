import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { UserRole } from "../../generated/prisma/enums";
import { envVars } from "../config/envVars";
import ms, { StringValue } from "ms";

const refreshExpiry = ms("7d" as StringValue);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  session: {
    expiresIn:
      typeof refreshExpiry === "number" ? refreshExpiry / 1000 : 604800,
  },
  emailVerification: {
    sendOnSignUp: true,
    async sendVerificationEmail({ user, url }) {
      // TODO: replace with real mail provider (Resend/SendGrid/SMTP)
      console.log(`Verification email for ${user.email}: ${url}`);
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        enum: UserRole,
        default: UserRole.tenant,
      },

      needsPasswordReset: {
        type: "boolean",
        default: false,
      },
      image: {
        type: "string",
        nullable: true,
      },
    },
  },
});
