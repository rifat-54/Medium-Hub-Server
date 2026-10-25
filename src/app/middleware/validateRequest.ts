import type { NextFunction, Request, Response } from "express";
import z from "zod"

export const validateRequest = (schema: z.ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data)
        }

        const safeParseResult = schema.safeParse(req.body)

        if (!safeParseResult.success) {
            next(new Error("Validation error"))
            return;
        }

        req.body = safeParseResult.data;

        next()
    }

}