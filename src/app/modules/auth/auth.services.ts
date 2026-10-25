import { auth } from "../../lib/auth";
import { tokenUtils } from "../../utils/cookie";
import type { ILoginUserPayload, IRegisterUserPayload } from "./auth.interface";

const registerUser = async (payload: IRegisterUserPayload) => {
  console.log("Registering user...");
  const { email, password, name } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  })

  if (!data.user) {
    throw new Error("User registration failed");
  }

  const access_token = tokenUtils.createAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    image: data.user.image,
    emailVerified: data.user.emailVerified,
  })

  const refresh_token = tokenUtils.createRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    image: data.user.image,
    emailVerified: data.user.emailVerified,
  })

  return {
    ...data,
    access_token,
    refresh_token,
    token: data.token
  }
};

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!data.user) {
    throw new Error("User login failed");
  }

  const access_token = tokenUtils.createAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    image: data.user.image,
    emailVerified: data.user.emailVerified,
  })

  const refresh_token = tokenUtils.createRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    image: data.user.image,
    emailVerified: data.user.emailVerified,
  })



  return {
    ...data,
    access_token,
    refresh_token,
    token: data.token
  };
};



export const authServices = {
  registerUser,
  loginUser,
};