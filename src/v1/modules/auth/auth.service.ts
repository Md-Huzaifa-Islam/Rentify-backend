import { Request } from "express";
import { UserRole } from "../../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";
import { getAuth } from "../../../lib/auth";

const login = async (email: string, password: string) => {
  const auth = await getAuth();
  return await auth.api.signInEmail({ body: { email, password } });
};

const logout = async (sessionToken: string, req: Request) => {
  const auth = await getAuth();
  await auth.api.signOut({
    headers: req.headers as HeadersInit,
  });
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
  const auth = await getAuth();
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
  const auth = await getAuth();
  return await auth.api.verifyEmail({ query: { token } });
};

export const AuthServices = {
  login,
  register,
  verifyEmail,
  logout,
};
