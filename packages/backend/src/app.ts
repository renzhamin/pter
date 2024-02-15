import { Env } from "@/config/env"
import "@/config/supertokens"
import cors from "cors"
import "dotenv/config"
import express, { Response } from "express"
import supertokens from "supertokens-node"
import {
    SessionRequest,
    errorHandler as supertokensErrorHandler,
    middleware as supertokensMiddleware
} from "supertokens-node/framework/express"
import { verifySession } from "supertokens-node/recipe/session/framework/express"
import { getDirname } from "./utils/dir"
import path from "path"

const app = express()

const inDev = process.env.NODE_ENV === "development"

const corsOptions: cors.CorsOptions = {
    origin: Env.frontendUrl,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true
}

if (inDev) {
    app.use(cors(corsOptions))
}

app.use(supertokensMiddleware())

app.get("/api/health", (_, res) => {
    return res.status(200).send("Health Ok")
})

app.get(
    "/api/userid",
    verifySession(),
    async (req: SessionRequest, res: Response) => {
        const userId = req.session?.getUserId() as string
        return res.status(200).json({ userId })
    }
)

app.use(supertokensErrorHandler())

if (inDev && process.env.SERVE_STATIC_FILES === "true") {
    app.use(express.static(path.join(getDirname(), "../../frontend/dist")))
    app.get("*", (_, res) => {
        res.sendFile(path.join(getDirname(), "../../frontend/dist/index.html"))
    })
}

export default app
