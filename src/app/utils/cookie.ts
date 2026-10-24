import type { JWTPayload } from "better-auth";
import type { Response } from "express";
import { jwtUtils } from "./jwt";
import { envVariables } from "../config/env";
import type { SignOptions } from "jsonwebtoken";

const createAccessToken=(payload:JWTPayload):string=>{
    const accessToken=jwtUtils.createToken(payload,envVariables.ACCESS_TOKEN_SECRET,{
      expiresIn: envVariables.ACCESS_TOKEN_EXPIRE_IN
    } as SignOptions
    )
    return accessToken;
}




const setAccessTokenInCookie =(res:Response,token:string)=>{
    res.cookie("access_token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        path:"/",
        maxAge:1000*60*60*24*7 // 7 days
    })
}

const setRefreshTokenInCookie =(res:Response,token:string)=>{
    res.cookie("refresh_token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        path:"/",
        maxAge:1000*60*60*24*7 // 7 days
    })
}



