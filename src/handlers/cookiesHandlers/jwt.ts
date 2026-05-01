import jwt from "jsonwebtoken";
const createJwt = (payload: object, secret: string, expiresIn: number) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

const verifyJwt = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const JwtHandlers = {
  createJwt,
  verifyJwt,
};
