import { z } from "zod"

const envSchema = z.object({
    frontendUrl: z.string().url(),
    backendUrl: z.string().url(),
    upstash: z.object({
        token: z.string(),
        url: z.string().url(),
        ratelimit: z.object({
            tokens: z.number(),
            window: z.string()
        })
    }),
    supertokens: z.object({
        appName: z.string(),
        uri: z.string().url(),
        key: z.string()
    }),
    google: z.object({
        clientId: z.string(),
        clientSecret: z.string()
    }),
    github: z.object({
        clientId: z.string(),
        clientSecret: z.string()
    })
})

const env = {
    frontendUrl: process.env.FRONTEND_URL,
    backendUrl: process.env.BACKEND_URL,
    upstash: {
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
        ratelimit: {
            tokens: Number(process.env.RATE_LIMIT_TOKENS),
            window: process.env.RATE_LIMIT_WINDOW
        }
    },
    supertokens: {
        appName: process.env.SUPERTOKENS_APP_NAME,
        uri: process.env.SUPERTOKENS_URI,
        key: process.env.SUPERTOKENS_KEY
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
}

export const Env = envSchema.parse(env)
