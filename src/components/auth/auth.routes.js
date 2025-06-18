import Router from "express";
import authController from "./auth.controller.js";
import { verifyRefreshToken } from "../../middleware/middelware.auth.js";


const router = Router();

router.post("/login", authController.login);
router.post("/logout",verifyRefreshToken, authController.logout);
router.post("/register", authController.register);
router.get("/refresh-token", verifyRefreshToken, authController.refreshToken);

export default router;
