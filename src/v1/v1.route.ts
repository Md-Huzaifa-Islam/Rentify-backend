import { IRouter, NextFunction, Request, Response, Router } from "express";
import { AuthRoutes } from "./modules/auth/auth.route";
import { catchAsync } from "../handlers/catchAsync";
import { sendResponse } from "../handlers/sendResponse";

const router: IRouter = Router();

router.get(
  "/",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      statusCode: 200,
      message: "Welcome to rentify API v1!",
    });
  }),
);

// auth routes
router.use("/auth", AuthRoutes);

export { router as V1Routes };
