import type { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/appError"
import { envVariables } from "../config/env"
import { Prisma } from "../../../generated/prisma/client"
import z from "zod"
import httpStatus, { status } from "http-status"
import { handlePrismaClientKnownRequestError, handlePrismaClientUnknownRequestError, handlePrismaClientValidationError, handlerPrismaClientInitializationError, handlerPrismaClientRustPanicError } from "../errorHelpers/handlePrismaErrors"
import { handleZodError } from "../errorHelpers/handleZodError"


export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

    if (envVariables.NODE_ENV === "development") {
        console.log("Error from global error handler: ", err)
    }

    let statusCode = err.statusCode || 500
    let message = err.message || "Something went wrong!"
    let stack: string | undefined = undefined

    let errorSources = err.errorSource || ""

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const simpliedError = handlePrismaClientKnownRequestError(err)
        statusCode = simpliedError.statusCode as number
        message = simpliedError.message
        errorSources = [...simpliedError.errorSource]
        stack = err.stack
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        const simpliedError = handlePrismaClientUnknownRequestError(err)
        statusCode = simpliedError.statusCode as number
        message = simpliedError.message
        errorSources = [...simpliedError.errorSources]
        stack = err.stack
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        const simplifiedError = handlePrismaClientValidationError(err)
        statusCode = simplifiedError.statusCode as number
        message = simplifiedError.message
        errorSources = [...simplifiedError.errorSources]
        stack = err.stack;
    } else if (err instanceof Prisma.PrismaClientRustPanicError) {
        const simplifiedError = handlerPrismaClientRustPanicError();
        statusCode = simplifiedError.statusCode as number
        message = simplifiedError.message
        errorSources = [...simplifiedError.errorSources!]
        stack = err.stack;
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
        const simplifiedError = handlerPrismaClientInitializationError(err);
        statusCode = simplifiedError.statusCode as number
        message = simplifiedError.message
        errorSources = [...simplifiedError.errorSources!]
        stack = err.stack;
    } else if (err instanceof z.ZodError) {
        const simpliedError = handleZodError(err)
        statusCode = simpliedError.statusCode as number;
        message = simpliedError.message
        errorSources = [...simpliedError.errorSources!]
        stack = err.stack
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        stack = err.stack;
        errorSources = [
            {
                path: "",
                message: err.message
            }
        ]
    } else if (err instanceof Error) {
        statusCode = status.INTERNAL_SERVER_ERROR;
        message = err.message;
        stack = err.stack;
        errorSources = [
            {
                path: "",
                message: err.message
            }
        ]
    }

    // hi it is middle ware.

    const errorResponse = {
        success: false,
        message: message,
        errorSources,
        error: envVariables.NODE_ENV === "development" ? err : undefined,
        stack: envVariables.NODE_ENV === "development" ? stack : undefined
    }

    res.status(statusCode).json(errorResponse)









}