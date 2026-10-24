import type { Response } from "express";

interface IRequestData<T> {
    httpStatusCode: number,
    success?: boolean,
    message?: string,
    data?: T | null,
    meta?: {
        page?: number,
        limit?: number,
        total?: number,
        totalPage?: number
    }
}

export const sendResponse = <T>(res: Response, responseData: IRequestData<T>) => {
    const { httpStatusCode, success, message, data, meta } = responseData

    res.status(httpStatusCode).json({
        success,
        message,
        data,
        meta
    })
}