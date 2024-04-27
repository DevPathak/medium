import { Hono } from "hono";
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogObject, updateBlogObject } from "@devpathak_7/mediumcomm"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || ""
    // console.log(header)
    if(!header) {
      c.status(401)
      return c.json({
        error: "Authorization header not found!"
      })
    }

    try{
        // const token = header.split(" ")[1]
        const response = await verify(header, c.env.JWT_SECRET)
        // console.log(response)
        
        if (!response.id) {
        c.status(401)
        return c.json({
            error: "unauthorized"
        })
        } 
        c.set("userId", response.id)
        // console.log(response.id)
        await next()
    } catch(e) {
        console.log(e)
        c.status(403)
        return c.json({
            message: "You are not logged inn"
        })
    }
  })

blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const { success } = createBlogObject.safeParse(body)

    if (!success) {
        c.status(411)
        return c.json({
            message: "Invalid input types"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())

    console.log("teehee", body)
    const userId = c.get("userId")
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    return c.json({
        blog
    })
})
  
blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const { success } = updateBlogObject.safeParse(body)
    
    if(!success) {
        c.status(411)
        return c.json({
            message: "Invalid input types"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: post.id
    })
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        log: ['query'],
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    } catch(e) {
        c.status(500) // Assuming internal server error if something goes wrong
        return c.json({
            message: "Error while fetching posts"
        })
    }
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id')
    console.log(id)
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        log: ['query']
    }).$extends(withAccelerate())

    var finalId = id.replace(":", "")

    // //@ts-ignore
    // prisma.$on('query' as any, (e) => {
    //     console.log('Query: ' + e.query)
    //     console.log('Params: ' + e.params)
    //     console.log('Duration: ' + e.duration + 'ms')
    // });

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: finalId
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if(!post){
            return c.json({
                message: "Blog post not found!"
            })
        }

        return c.json(
            { post }
        )
    } catch(e) {
        c.status(411)
        // console.log(e)
        return c.json({
            message: "Error while fetching post"
        })
    }
})
