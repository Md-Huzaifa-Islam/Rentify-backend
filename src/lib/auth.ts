import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { UserRole } from "../../generated/prisma/enums";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
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
