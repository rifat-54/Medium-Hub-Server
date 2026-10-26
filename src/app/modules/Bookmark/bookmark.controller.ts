import { catchAsync } from "../../shared/catchAsync";
import { bookmarkService } from "./bookmark.service";
import { sendResponse } from "../../shared/sendResponse";
import httpStatus from "http-status";
import type { Request, Response } from "express";

const createBookmark = catchAsync(
    async (req: Request, res: Response) => {
        const result = await bookmarkService.createBookmark(req.body, req.user.id)
        sendResponse(res, {
            httpStatusCode: httpStatus.OK,
            success: true,
            message: "Bookmark update successfully",
            data: result
        })
    }
)

const getMyBookmark = catchAsync(
    async (req: Request, res: Response) => {
        const result = await bookmarkService.getMyBookmark(req.user.id)
        sendResponse(res, {
            httpStatusCode: httpStatus.OK,
            success: true,
            message: "Bookmark fetched successfully",
            data: result
        })
    }
)

export const bookmarkController = {
    createBookmark,
    getMyBookmark
};