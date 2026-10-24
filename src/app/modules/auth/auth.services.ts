import { auth } from "../../lib/auth";
import type { ILoginUserPayload, IRegisterUserPayload } from "./auth.interface";

const registerUser = async (payload: IRegisterUserPayload) => {
  console.log("Registering user...");
  const { email, password, name } = payload;

  const data=await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  })

  if(!data.user){
    throw new Error("User registration failed");
  }

  return data;
};

const loginUser = async (payload:ILoginUserPayload) => {
    const { email, password } = payload;

    const data=await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if(!data.user){
      throw new Error("User login failed");
    }

    return data;
};

export const authServices = {
    registerUser,
    loginUser,
};