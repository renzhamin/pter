import express from "express"
import { userRouter } from "./user"
import { testRouter } from "./test"

export const router = express.Router()

router.use(testRouter)
router.use("/user", userRouter)
