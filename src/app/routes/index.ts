import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { CategoryRoutes } from "../modules/Category/category.route";
import { blogRoutes } from "../modules/Blog/blog.route";
import { reactionRoutes } from "../modules/Reaction/reaction.route";
import { bookmarkRoutes } from "../modules/Bookmark/bookmark.route";

const router = Router()

router.use("/auth", authRoutes)
router.use("/category", CategoryRoutes)
router.use("/blog", blogRoutes)
router.use("/reaction", reactionRoutes)
router.use("/bookmark", bookmarkRoutes)

export const IndexRoutes = router