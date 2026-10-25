
import z from "zod"
import { BlogStatus } from "../../../../generated/prisma/enums";

const createBlogZodSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title cannot exceed 200 characters"),

    content: z
        .string()
        .trim()
        .min(1, "Content is required"),

    categoryId: z
        .string()
        .trim()
        .min(1, "Category is required"),

    coverImage: z
        .url("Please provide a valid image URL")
        .optional(),
    status: z.enum(BlogStatus).optional()
});

const updateBlogZodSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title cannot exceed 200 characters")
        .optional(),

    content: z
        .string()
        .trim()
        .min(1, "Content is required")
        .optional(),

    categoryId: z
        .string()
        .trim()
        .min(1, "Category is required")
        .optional(),

    coverImage: z
        .url("Please provide a valid image URL")
        .optional(),
    status: z.enum(BlogStatus).optional()
});

const updateBlogStatusZodSchema = z.object({
    status: z.enum(BlogStatus)
});

export const blogValidationSchema = {
    createBlogZodSchema,
    updateBlogZodSchema,
    updateBlogStatusZodSchema
}