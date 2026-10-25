import express from 'express';

import { blogController } from './blog.controller';
import { checkAuth } from '../../middleware/checkAuth';
import { UserRole } from '../../../../generated/prisma/enums';
import { validateRequest } from '../../middleware/validateRequest';
import { blogValidationSchema } from './blog.validation';

const router = express.Router();


router.get('/', blogController.getAllBlog)

// admin routes
router.get("/all-blogs", checkAuth(UserRole.ADMIN), blogController.getAllBlogForAdmin)

// user routes
router.get('/my-blogs', checkAuth(UserRole.USER, UserRole.ADMIN), blogController.getMyBlog)

router.get('/id/:id', blogController.getBlogById)
router.get('/slug/:slug', blogController.getBlogBySlug)

router.post('/create', checkAuth(UserRole.USER, UserRole.ADMIN), validateRequest(blogValidationSchema.createBlogZodSchema), blogController.createBlog)

router.patch('/update/:id', checkAuth(UserRole.USER, UserRole.ADMIN), validateRequest(blogValidationSchema.updateBlogZodSchema), blogController.updateBlog)

router.patch('/update-status/:id', checkAuth(UserRole.ADMIN), validateRequest(blogValidationSchema.updateBlogStatusZodSchema), blogController.updateStatus)

router.delete('/delete/:id', checkAuth(UserRole.ADMIN), blogController.deleteBlog)


export const blogRoutes = router;
