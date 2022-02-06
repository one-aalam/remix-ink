import { z } from "zod"

export const postCreateSchema = z.object({
    title: z.string().max(80).min(5),
    description: z.string().max(240),
    category: z.string().min(3),
    tags: z.array(z.string()).optional(),
    body: z.string().min(240), // Your post's body should at least be the size of a tweet
})

export type PostFieldErrors = {[k: string]: string[]}
