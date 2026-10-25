import { catchAsync } from "../../shared/catchAsync";
import type { Request, Response } from "express"
import { categoryService } from "./category.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const createCategory = catchAsync(
    async (req: Request, res: Response) => {
        const result = await categoryService.createCategory(req.body)
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Category created successfully",
            data: result
        })

    }
)

const updateCategory = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const result = await categoryService.updateCategory(id, req.body)
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Category updated successfully",
            data: result
        })

    }
)

const deleteCategory = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const result = await categoryService.deleteCategory(id)
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Category deleted successfully",
            data: result
        })

    }
)

const getAllCategory = catchAsync(
    async (req: Request, res: Response) => {
        const result = await categoryService.getAllCategory()
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Categories fetched successfully",
            data: result
        })

    }
)


export const categoryController = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory
};