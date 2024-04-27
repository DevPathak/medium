import z from "zod"

export const inputSignupObject = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const inputSigninObject = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const createBlogObject = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogObject = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type InputSignupObject = z.infer<typeof inputSignupObject>
export type InputSigninObject = z.infer<typeof inputSigninObject>
export type CreateBlogObject = z.infer<typeof createBlogObject>
export type BlogObUpdateject = z.infer<typeof updateBlogObject>