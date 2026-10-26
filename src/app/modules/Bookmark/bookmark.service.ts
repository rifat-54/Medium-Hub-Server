import { prisma } from "../../lib/prisma";
import type { ICreateBookmarkPayload } from "./bookmark.interface";


const createBookmark = async (payload: ICreateBookmarkPayload, userId: string) => {
    const { blogId } = payload;

    const existingBookmark = await prisma.bookmark.findFirst({
        where: {
            blogId,
            userId,
        },
    });

    if (existingBookmark) {
        const data = await prisma.bookmark.delete({
            where: {
                userId_blogId: {
                    blogId,
                    userId,
                }
            }
        })
        return data;
    }

    const bookmark = await prisma.bookmark.create({
        data: {
            blogId,
            userId,
        },
    });

    return bookmark;
}

const getMyBookmark = async (userId: string) => {
    const bookmarks = await prisma.bookmark.findMany({
        where: {
            userId,
        },
        include: {
            blog: {
                include: {
                    author: true,
                }
            }
        }
    });

    return bookmarks;
}


export const bookmarkService = {
    createBookmark,
    getMyBookmark
}