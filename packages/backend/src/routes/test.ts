import express from "express"

export const testRouter = express.Router()

testRouter.get("/health", (_, res) => {
    return res.status(200).send("Health Ok")
})
