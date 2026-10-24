import type { Request, Response } from "express";
import { authServices } from "./auth.services";
import { tokenUtils } from "../../utils/cookie";

const registerUser = async (req: Request, res: Response) => {
  try {
    console.log("Registering user...");
    const result = await authServices.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
      data: null,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUser(req.body)

    const { access_token, refresh_token, token, ...rest } = result

    tokenUtils.setAccessTokenInCookie(res, access_token)
    tokenUtils.setRefreshTokenInCookie(res, refresh_token)
    tokenUtils.setBetterAuthSessionCookie(res, token)

    console.log("login result: ", result)

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        access_token,
        refresh_token,
        ...rest
      }
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in user",
      data: null,
    });
  }
}

export const authController = {
  registerUser,
  loginUser
};
