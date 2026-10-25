import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import type { NextFunction, Request, Response } from "express";

const router = Router()

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)

router.get("/check", checkAuth(), (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Authenticated",
        data: "user"
    })
})

export const authRoutes = router;