import status from "http-status";
import { BlogStatus } from "../../../../generated/prisma/enums";
import AppError from "../../errorHelpers/appError";
import { prisma } from "../../lib/prisma";
import type { ICreateBlogPayload, IUpdateBlogPayload } from "./blog.interface";
import { generateSlugFromTitle } from "./blog.utils";

const createBlog = async (payload: ICreateBlogPayload, userId: string) => {
    console.log(payload);

    const category = await prisma.category.findUnique({
        where: {
            id: payload.categoryId
        }
    })

    if (!category) {
        throw new Error("Category not found")
    }

    const slug = await generateSlugFromTitle(payload.title)

    const excerpt = payload.content.length > 150 ?
        payload.content.slice(0, 150).trim() + "..." :
        payload.content.trim() + "..."

    const updateData = {
        ...payload,
        slug,
        excerpt,
        authorId: userId,
    }

    console.log("updateData", updateData)

    const data = await prisma.blog.create({
        data: updateData
    })

    return data;

}


const updateBlog = async (id: string, payload: IUpdateBlogPayload, userId: string) => {

    const blog = await prisma.blog.findUnique({
        where: {
            id,
            authorId: userId
        }
    })

    if (!blog) {
        throw new AppError(status.NOT_FOUND, "Blog not found")
    }

    if (blog.status === BlogStatus.BANNED) {
        throw new AppError(status.BAD_REQUEST, "Blog cannot be updated because it is banned")
    }
    if (blog.status === BlogStatus.REJECTED) {
        throw new AppError(status.BAD_REQUEST, "Blog cannot be updated because it is rejected")
    }

    if (payload.status === BlogStatus.REJECTED || payload.status === BlogStatus.BANNED) {
        throw new AppError(status.BAD_REQUEST, "You cannot update blog status to " + payload.status)
    }

    if (payload.categoryId) {
        const category = await prisma.category.findUnique({
            where: {
                id: payload.categoryId
            }
        })
        if (!category) {
            throw new AppError(status.NOT_FOUND, "Category not found")
        }
    }

    let slug = blog.slug;
    let excerpt = blog.excerpt;


    if (payload.title) {
        slug = await generateSlugFromTitle(payload.title)
    }

    if (payload.content) {
        excerpt = payload.content.length > 150 ?
            payload.content.slice(0, 150).trim() + "..."
            : payload.content.trim() + "...";
    }

    const updateData = {
        ...payload,
        excerpt: excerpt,
        slug: slug,
    }

    const data = await prisma.blog.update({
        where: {
            id,
            authorId: userId
        },
        data: updateData
    })

    return data;

}

const updateStatus = async (id: string, blogStatus: BlogStatus) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id
        }
    })

    if (!blog) {
        throw new AppError(status.NOT_FOUND, "Blog not found")
    }

    if (!blogStatus) {
        throw new AppError(status.BAD_REQUEST, "Blog status is required")
    }

    if (blogStatus === blog.status) {
        throw new AppError(status.BAD_REQUEST, "Blog status is already updated with " + blogStatus)
    }


    const data = await prisma.blog.update({
        where: {
            id
        },
        data: {
            status: blogStatus
        }
    })

    return data;
}

const getAllBlog = async () => {
    const data = await prisma.blog.findMany({
        where: {
            status: BlogStatus.PUBLISHED
        },
        include: {
            category: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
    return data
}

// get all blog for admin with all status

const getAllBlogForAdmin = async () => {
    const data = await prisma.blog.findMany({
        include: {
            category: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
    return data
}

const getBlogById = async (id: string) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id
        },
        include: {
            category: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
    return blog
}

const getBlogBySlug = async (slug: string) => {
    const blog = await prisma.blog.findUnique({
        where: {
            slug
        },
        include: {
            category: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
    return blog
}

const deleteBlog = async (id: string, userId: string) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id
        }
    })
    if (!blog) {
        throw new AppError(status.NOT_FOUND, "Blog not found")
    }
    if (blog.authorId !== userId) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized to delete this blog")
    }

    const deletedBlog = await prisma.blog.delete({
        where: {
            id
        }
    })
    return deletedBlog
}

const getMyBlog = async (userId: string) => {
    const blogs = await prisma.blog.findMany({
        where: {
            authorId: userId
        },
        include: {
            category: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
    return blogs
}

export const blogService = {
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