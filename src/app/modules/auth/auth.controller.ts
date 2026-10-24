import type { Request, Response } from "express";
import { authServices } from "./auth.services";

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

export const authController = {
  registerUser,
};
