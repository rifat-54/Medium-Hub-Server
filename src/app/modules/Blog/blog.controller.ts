import { catchAsync } from "../../shared/catchAsync";
import type { Request, Response } from "express";
import { blogService } from "./blog.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import type { BlogStatus } from "../../../../generated/prisma/enums";

const createBlog = catchAsync(
    async (req: Request, res: Response) => {
        const result = await blogService.createBlog(req.body, req.user.id)

        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Blog created successfully",
            data: result
        })
    }
)

const updateBlog = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id as string
        const result = await blogService.updateBlog(id, req.body, req.user.id)

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Blog updated successfully",
            data: result
        })
    }
)

const updateStatus = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id as string
        const blogStatus = req.body.status as BlogStatus
        const result = await blogService.updateStatus(id, blogStatus)
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Blog status updated successfully",
            data: result
        })
    }
)

const getAllBlog = catchAsync(
    async (req: Request, res: Response) => {
        const result = await blogService.getAllBlog()
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Blogs fetched successfully",
            data: result
        })
    }
)

const getBlogById = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id as string
        const result = await blogService.getBlogById(id)
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Blog fetched successfully",
            data: result
        })
    }
)

const getBlogBySlug = catchAsync(
    async (req: Request, res: Response) => {
        const slug = req.params.slug as string
        const result = await blogService.getBlogBySlug(slug)
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Blog fetched successfully",
            data: result
        })
    }
)

const deleteBlog = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id as string
        const result = await blogService.deleteBlog(id, req.user.id)
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Blog deleted successfully",
            data: result
        })
    }
)

const getMyBlog = catchAsync(
    async (req: Request, res: Response) => {
        const result = await blogService.getMyBlog(req.user.id)
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "My blogs fetched successfully",
            data: result
        })
    }
)

const getAllBlogForAdmin = catchAsync(
    async (req: Request, res: Response) => {
        const result = await blogService.getAllBlogForAdmin()
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Blogs fetched successfully",
            data: result
        })
    }
)

export const blogController = {
    createBlog,
    updateBlog,
    updateStatus,
    getAllBlog,
    getBlogById,
    getBlogBySlug,
    deleteBlog,
    getMyBlog,
    getAllBlogForAdmin
};