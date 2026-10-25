import express from 'express';
import { categoryController } from './category.controller';
import { checkAuth } from '../../middleware/checkAuth';
import { UserRole } from '../../../../generated/prisma/enums';

const router = express.Router();

router.post("/", checkAuth(UserRole.ADMIN, UserRole.USER), categoryController.createCategory)
router.get("/", categoryController.getAllCategory)
router.patch("/:id", checkAuth(UserRole.ADMIN), categoryController.updateCategory)
router.delete("/:id", checkAuth(UserRole.ADMIN), categoryController.deleteCategory)

export const CategoryRoutes = router;
