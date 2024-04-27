import { PrismaClient } from '@prisma/client/edge'
import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { inputSignupObject, inputSigninObject } from "@devpathak_7/mediumcomm"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const body = await c.req.json()
    const { success } = inputSignupObject.safeParse(body)

    if(!success){
      c.status(411)
      return c.json({
        message: "Inputs are incorrect"
      })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    try {
      const user = await prisma.user.create({
        data: {
          email: body.username,
          password: body.password,
          name: body.name
        }
      })
  
      const token = await sign({
        id: user.id
      }, c.env.JWT_SECRET)
  
      return c.json({
        jwt: token
      })
    } catch(e) {
      c.status(403);
      console.log(e)
      return c.json({ error: "error while signing up" })
    }
  })
  
userRouter.post('/signin', async (c) => {
  const body = await c.req.json()
  console.log(body.username)
  console.log(body.password)
  const { success } = inputSigninObject.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json({
      message: "Inputs are incorrect"
    })
  }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    try{
    var user = await prisma.user.findFirst({
      where: {
        email: body.username,
        password: body.password
      }
    })
    } catch(e) {
      c.status(403)
      return c.json({
        message: e
      })
    }
  
    if(!user) {
      return c.json({
        message: "email/password is incorrent"
      })
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt })
  
  })