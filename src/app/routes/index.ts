import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { CategoryRoutes } from "../modules/Category/category.route";
import { blogRoutes } from "../modules/Blog/blog.route";

const router = Router()

router.use("/auth", authRoutes)
router.use("/category", CategoryRoutes)
router.use("/blog", blogRoutes)

export const IndexRoutes = router