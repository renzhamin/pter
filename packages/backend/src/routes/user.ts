import express, { Response } from "express"
import { SessionRequest } from "supertokens-node/framework/express"
import { verifySession } from "supertokens-node/recipe/session/framework/express"

export const userRouter = express.Router()

userRouter.use(verifySession())

userRouter.get("/id", async (req: SessionRequest, res: Response) => {
    const userId = req.session?.getUserId() as string
    return res.status(200).json({ userId })
})
