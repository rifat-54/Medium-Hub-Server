import type { Request, Response, NextFunction } from "express";
import AppError from "../errorHelpers/appError";
import status from "http-status";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { jwtUtils } from "../utils/jwt";
import { envVariables } from "../config/env";
import type { UserRole } from "../../../generated/prisma/enums";

export const checkAuth = (...authRole: UserRole[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sessionToken = req.cookies["better_auth.session_token"]
            console.log("sessionToken", sessionToken)
            if (!sessionToken) {
                throw new AppError(status.UNAUTHORIZED, "Unauthorized")
            }

            const sessionExit = await prisma.session.findFirst({
                where: {
                    token: sessionToken,
                    expiresAt: {
                        gt: new Date()
                    }
                },
                include: {
                    user: true
                }

            })


            console.log("sessionExit", sessionExit)

            if (!sessionExit?.user) {
                throw new AppError(status.UNAUTHORIZED, "Unauthorized")
            }

            req.user = {
                id: sessionExit.userId,
                role: sessionExit.user.role,
                name: sessionExit.user.name,
                email: sessionExit.user.email,
                image: sessionExit.user.image,
                emailVerified: sessionExit.user.emailVerified,
            }

            // check with jwt

            const access_token = req.cookies["access_token"]
            if (!access_token) {
                throw new AppError(status.UNAUTHORIZED, "Invalid access token")
            }

            // const decoded=jwt
            const decoded = jwtUtils.verifyToken(access_token, envVariables.ACCESS_TOKEN_SECRET)

            console.log("decoded: ", decoded)

            if (!decoded.success) {
                throw new AppError(status.UNAUTHORIZED, "Invalid access token")
            }

            // if(decoded.data?.userId !==sessionExit.user.id){
            //     throw new AppError(status.UNAUTHORIZED, "Invalid access token") 
            // }


            if (authRole.length > 0 && !authRole.includes(sessionExit.user.role)) {
                throw new AppError(status.FORBIDDEN, "Forbidden Access")
            }


            next()

        } catch (error) {
            console.log("error from check auth: ", error)
            next(error)
        }
    }
}