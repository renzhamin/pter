import express from "express"
import path from "path"
import { getDirname } from "@/utils/dir"

export const frontendFilesRouter = express.Router()

frontendFilesRouter.use(
    express.static(path.join(getDirname(), "../../frontend/dist"))
)
frontendFilesRouter.get("*", (_, res) => {
    res.sendFile(path.join(getDirname(), "../../frontend/dist/index.html"))
})
