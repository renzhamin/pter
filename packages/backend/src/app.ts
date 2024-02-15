import "dotenv/config"
import "@/config/supertokens"
import { corsConfig } from "@/config/cors"
import cors from "cors"
import express from "express"
import {
    errorHandler as supertokensErrorHandler,
    middleware as supertokensMiddleware
} from "supertokens-node/framework/express"
import { router } from "@/routes"
import { frontendFilesRouter } from "@/routes/frontend-files"

const app = express()

const inDev = process.env.NODE_ENV === "development"

if (inDev) {
    app.use(cors(corsConfig))
}

app.use(supertokensMiddleware())

app.use("/api", router)

app.use(supertokensErrorHandler())

if (process.env.SERVE_FRONTEND_FILES === "true") {
    app.use(frontendFilesRouter)
}

export default app
