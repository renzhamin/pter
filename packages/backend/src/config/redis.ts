import { Redis } from "@upstash/redis"
import { Env } from "./env"

export const redis = new Redis({
    url: Env.upstash.url,
    token: Env.upstash.token
})
