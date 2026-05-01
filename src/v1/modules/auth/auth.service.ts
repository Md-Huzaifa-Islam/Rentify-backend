import { UserRole } from "../../../../generated/prisma/enums";
import { auth } from "../../../lib/auth";

const login = async (email: string, password: string) => {
  return await auth.api.signInEmail({ body: { email, password } });
};

const register = async ({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) => {
  return await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      role,
      needsPasswordReset: false,
      image: "",
    },
  });
};

const verifyEmail = async (token: string) => {
  return await auth.api.verifyEmail({ query: { token } });
};

export const AuthServices = {
  login,
  register,
  verifyEmail,
};
