import ms, { StringValue } from "ms";
import { UserRole } from "../../generated/prisma/enums";
import { prisma } from "./prisma";

const refreshExpiry = ms("7d" as StringValue);
const importEsm = new Function("modulePath", "return import(modulePath);") as (
  modulePath: string,
) => Promise<any>;

let auth: any;

export async function getAuth() {
  if (!auth) {
    // Hint the deployment tracer to bundle these ESM packages.
    require.resolve("better-auth/package.json");
    require.resolve("better-auth/adapters/prisma");

    const [{ betterAuth }, { prismaAdapter }] = await Promise.all([
      importEsm("better-auth"),
      importEsm("better-auth/adapters/prisma"),
    ]);
    auth = betterAuth({
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
        async sendVerificationEmail({
          user,
          url,
        }: {
          user: { email: string };
          url: string;
        }) {
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
  }
  return auth;
}
