import { IRouter, Router } from "express";
import { AuthControllers } from "./auth.controller";

const router: IRouter = Router();

// login route
router.post("/login", AuthControllers.login);

// register route
router.post("/register", AuthControllers.register);

// refresh token route
router.post("/refresh-token", AuthControllers.refreshToken);

// verify email route
router.get("/verify-email", AuthControllers.verifyEmail);

export { router as AuthRoutes };
