import type { Request, Response } from "express";
import { authServices } from "./auth.services";
import { tokenUtils } from "../../utils/cookie";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const registerUser = catchAsync(
  async (req: Request, res: Response) => {
    console.log("Registering user...");
    const result = await authServices.registerUser(req.body);
    const { access_token, refresh_token, token, ...rest } = result

    tokenUtils.setAccessTokenInCookie(res, access_token)
    tokenUtils.setRefreshTokenInCookie(res, refresh_token)
    tokenUtils.setBetterAuthSessionCookie(res, token!)

    sendResponse(res, {
      httpStatusCode: 201,
      success: true,
      message: "User registered successfully",
      data: {
        token,
        access_token,
        refresh_token,
        ...rest
      }
    });
  }
)

const loginUser = catchAsync(
  async (req: Request, res: Response) => {

    const result = await authServices.loginUser(req.body)

    const { access_token, refresh_token, token, ...rest } = result

    tokenUtils.setAccessTokenInCookie(res, access_token)
    tokenUtils.setRefreshTokenInCookie(res, refresh_token)
    tokenUtils.setBetterAuthSessionCookie(res, token)

    console.log("login result: ", result)

    sendResponse(res, {
      httpStatusCode: 201,
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        access_token,
        refresh_token,
        ...rest
      }
    })

  }
)


export const authController = {
  registerUser,
  loginUser
};
