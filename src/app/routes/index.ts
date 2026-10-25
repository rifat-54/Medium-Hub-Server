import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { CategoryRoutes } from "../modules/Category/category.route";

const router = Router()

router.use("/auth", authRoutes)
router.use("/category", CategoryRoutes)

export const IndexRoutes = router