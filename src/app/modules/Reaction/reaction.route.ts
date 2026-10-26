import express from 'express';
import { reactionController } from './reaction.controller';
import { checkAuth } from '../../middleware/checkAuth';
import { UserRole } from '../../../../generated/prisma/enums';
import { validateRequest } from '../../middleware/validateRequest';
import reactionValidation from './reaction.validation';


const router = express.Router();

router.post("/", checkAuth(UserRole.USER, UserRole.ADMIN), validateRequest(reactionValidation.reactionZodSchema), reactionController.createReaction);

export const reactionRoutes = router;
