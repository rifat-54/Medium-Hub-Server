import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
 // your prisma client instance

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    emailAndPassword: { 
    enabled: true, 
  },
  user: {
    additionalFields: {
        role: {
            type: "string",
            defaultValue: "USER", // default role for new users
        },
        
    }
  }
});