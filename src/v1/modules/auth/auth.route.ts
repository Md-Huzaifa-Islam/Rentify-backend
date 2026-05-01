import { IRouter, Router } from "express";
import { AuthControllers } from "./auth.controller";

const router: IRouter = Router();

// login route
router.post("/login", AuthControllers.login);

// logout route
router.get("/logout", AuthControllers.logout);

// register route
router.post("/register", AuthControllers.register);

// verify email route
router.get("/verify-email", AuthControllers.verifyEmail);

export { router as AuthRoutes };
