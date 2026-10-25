import type { BlogStatus } from "../../../../generated/prisma/enums";

export interface ICreateBlogPayload {
    title: string;
    content: string;
    categoryId: string;
    coverImage?: string;
    status?: BlogStatus
}

export interface IUpdateBlogPayload {
    id: string;
    title?: string;
    content?: string;
    categoryId?: string;
    coverImage?: string;
    status?: BlogStatus
}