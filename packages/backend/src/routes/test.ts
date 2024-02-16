import { rateLimiter } from "@/config/rate-limiter"
import express from "express"

export const testRouter = express.Router()

testRouter.get("/health", (_, res) => {
    return res.status(200).send("Health Ok")
})

testRouter.get("/rate-limited", async (req, res) => {
    const limiterId = req.ip!
    const { success } = await rateLimiter.limit(limiterId)
    if (success) {
        return res.status(200).send("OK")
    } else {
        return res.status(429).send("Rate limited")
    }
})
