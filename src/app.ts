import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import type { Request, Response } from "express"
import { envVariables } from "./app/config/env"
import { notFound } from "./app/middleware/notFound"
import { IndexRoutes } from "./app/routes"
import { auth } from "./app/lib/auth"
import { toNodeHandler } from "better-auth/node"
import { globalErrorHandler } from "./app/middleware/globalErrorHandler"


const app = express()

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: [envVariables.FRONTEND_URL, envVariables.BETTER_AUTH_URL],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "UPDATE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
console.log("api called")
app.use("/api/auth", toNodeHandler(auth)) // Use the Better Auth middleware for authentication routes

app.use("/api/v1/", IndexRoutes) // Use the index routes for API version 1

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running")
})



app.use(notFound) // Handle 404 errors for undefined routes
app.use(globalErrorHandler)

export default app;

