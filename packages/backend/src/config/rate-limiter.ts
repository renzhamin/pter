import { redis } from "@/config/redis"
import { Ratelimit } from "@upstash/ratelimit"
import { Env } from "./env"

export const rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
        Env.upstash.ratelimit.tokens,
        // @ts-ignore
        Env.upstash.ratelimit.window
    ),
    analytics: true,
    ephemeralCache: new Map()
})
