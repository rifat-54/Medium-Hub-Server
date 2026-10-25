import status from "http-status";
import AppError from "../../errorHelpers/appError";
import type { ICreateCategoryPayload } from "./category.interface";
import slugify from "slugify";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: ICreateCategoryPayload) => {
    const trimmedName = payload.name.trim();

    if (!trimmedName) {
        throw new AppError(status.BAD_REQUEST, 'Category name is required');
    }

    // generate slug
    const slug = slugify(trimmedName, {
        lower: true,
        strict: true,
        trim: true
    })

    if (!slug) {
        throw new AppError(status.BAD_REQUEST, 'Category name is invalid');
    }

    // check if category is exit
    const existCategory = await prisma.category.findFirst({
        where: {
            OR: [
                {
                    name: {
                        equals: trimmedName,
                        mode: "insensitive"
                    }
                },
                {
                    slug: {
                        equals: slug,
                        mode: "insensitive"
                    }
                }
            ]
        }
    })

    if (existCategory) {
        throw new AppError(status.BAD_REQUEST, 'Category is already exit');
    }

    const category = await prisma.category.create({
        data: {
            name: trimmedName,
            slug
        }
    })

    return category;
}

const updateCategory = async (id: string, payload: ICreateCategoryPayload) => {
    const trimmedName = payload.name.trim();

    if (!trimmedName) {
        throw new AppError(status.BAD_REQUEST, 'Category name is required');
    }

    // generate slug
    const slug = slugify(trimmedName, {
        lower: true,
        strict: true,
        trim: true
    })

    if (!slug) {
        throw new AppError(status.BAD_REQUEST, 'Category name is invalid');
    }

    // check if category is exit
    const existCategory = await prisma.category.findFirst({
        where: {
            OR: [
                {
                    name: {
                        equals: trimmedName,
                        mode: "insensitive"
                    }
                },
                {
                    slug: {
                        equals: slug,
                        mode: "insensitive"
                    }
                }
            ]
        }
    })

    if (!existCategory) {
        throw new AppError(status.BAD_REQUEST, 'Category is not exit');
    }

    const category = await prisma.category.update({
        where: {
            id
        },
        data: {
            name: trimmedName,
            slug
        }
    })

    return category;
}

const deleteCategory = async (id: string) => {
    const existCategory = await prisma.category.findUnique({
        where: {
            id
        }
    })

    if (!existCategory) {
        throw new AppError(status.BAD_REQUEST, 'Category is not exit');
    }

    const category = await prisma.category.delete({
        where: {
            id
        }
    })

    return category;
}

const getAllCategory = async () => {
    const categories = await prisma.category.findMany();
    return categories;
}

export const categoryService = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory
};