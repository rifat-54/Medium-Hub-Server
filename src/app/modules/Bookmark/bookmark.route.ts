import express from 'express';
import { bookmarkController } from './bookmark.controller';
import { checkAuth } from '../../middleware/checkAuth';
import { UserRole } from '../../../../generated/prisma/enums';


const router = express.Router();

router.get("/", checkAuth(UserRole.USER, UserRole.ADMIN), bookmarkController.getMyBookmark)
router.post("/", checkAuth(UserRole.USER), bookmarkController.createBookmark)


export const bookmarkRoutes = router;
