import type { JWTPayload, number } from "better-auth";
import jwt, { type SignOptions } from "jsonwebtoken";


const createToken=(payload:JWTPayload, secret:string, {expiresIn}:SignOptions):string=>{
    if (!expiresIn) {
        throw new Error("expiresIn is required");
    }
    
    const token=jwt.sign(payload,secret,{expiresIn})
    return token;


}

const verifyToken=(token:string, secret:string):JWTPayload=>{
    try {
        const decoded=jwt.verify(token,secret) as JWTPayload
        return{
            success:true,
            data:decoded
        }
    } catch (error:any) {
        return{
            success:false,
            message:error.message,
            data:null
        }
    }
}

const decodeToken=(token:string)=>{
    try {
        const decoded=jwt.decode(token) as JWTPayload
        return decoded
    } catch (error:any) {
        return null
    }
}

export const jwtUtils={
    createToken,
    verifyToken,
    decodeToken
}   


