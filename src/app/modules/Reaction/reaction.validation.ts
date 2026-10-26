import z from "zod"
import { ReactionType } from "../../../../generated/prisma/enums";

const reactionZodSchema = z.object({
    blogId: z.string().min(1, "Blog ID is required"),
    type: z.enum(ReactionType),
})

const reactionValidation = {
    reactionZodSchema,
};

export default reactionValidation;