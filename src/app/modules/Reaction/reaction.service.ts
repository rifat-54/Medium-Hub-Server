import status from "http-status";
import { prisma } from "../../lib/prisma";
import type { ICreateReactionPayload } from "./reaction.interface";
import AppError from "../../errorHelpers/appError";
import { ReactionType } from "../../../../generated/prisma/enums";


const createReaction = async (payload: ICreateReactionPayload, userId: string) => {

    console.log("reaction payload", payload, userId)

    const { blogId, type } = payload

    const blog = await prisma.blog.findUnique({
        where: {
            id: blogId
        }
    })

    if (!blog) {
        throw new AppError(status.BAD_REQUEST, "Blog not found")
    }

    const existingReaction = await prisma.reaction.findFirst({
        where: {
            blogId: blogId,
            userId: userId
        }
    })

    if (existingReaction) {
        if (existingReaction.type === type) {
            const data = await prisma.reaction.update({
                where: {
                    userId_blogId: {
                        blogId,
                        userId,
                    }
                },
                data: {
                    type: ReactionType.NONE
                }
            })
            return data;
        } else {
            const data = await prisma.reaction.update({
                where: {
                    userId_blogId: {
                        blogId,
                        userId,
                    }
                },
                data: {
                    type: type
                }
            })
            return data;
        }
    }

    const data = await prisma.reaction.create({
        data: {
            blogId,
            userId,
            type: type
        }
    })
    return data;

}


export const reactionService = {
    createReaction,
};