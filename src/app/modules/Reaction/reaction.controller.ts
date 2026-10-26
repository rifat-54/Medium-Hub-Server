import { catchAsync } from "../../shared/catchAsync";
import type { Request, Response } from "express";
import { reactionService } from "./reaction.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const createReaction = catchAsync(
    async (req: Request, res: Response) => {
        const result = await reactionService.createReaction(req.body, req.user.id)
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Reaction updated successfully",
            data: result
        })
    }
)

export const reactionController = {
    createReaction,
};