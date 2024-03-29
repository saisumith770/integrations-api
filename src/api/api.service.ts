import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimiter from 'express-rate-limit'
import cookieParser from 'cookie-parser'

import { PrismaClient } from '@prisma/client'

import { Router as TwitchRouter } from './twitch/twitch.service'
import { Router as YoutubeRouter } from './youtube/youtube.service'

import { port, access_token_secret, csrf_token_secret } from '../config/environment_variables'
import jwt from 'jsonwebtoken'

// tweaked the index.d.ts for express to accept PrismaClient in req

const app: Express = express()
const portnumber = port
var prisma: PrismaClient = new PrismaClient()

//security related middlewares
app.disable("x-powered-by")
app.use(helmet())   //the helmet library comes along with special middlewares for security
app.use(cors({  //enabling the cors policy to prevent foriegn websites from accessing the api
    origin: 'http://localhost',
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE']
}))
app.use(rateLimiter({   //prevent multiple requests from being sent to api from a single ip
    windowMs: 10,
    max: 10,
    message: {
        status: 429,
        message: "you have exceeded the request limit"
    }
}))

//data mutation middlewares
// app.use(cookieParser())
app.use(express.json()) //convert incoming req into JSON type
app.use(express.urlencoded({ extended: false })) //remove utf-8 enconding
app.use(cookieParser())
app.use((req, _, next) => {   //inject prisma into the req
    req.prisma = prisma
    next()
})

//validators
app.use((req, res, next) => {
    const { access_token } = req.cookies
    jwt.verify(access_token, access_token_secret, (err: any, data: any) => {
        if (!err) {
            req.query.identifier = data.user_id
            next()
        }
        else res.status(400).json({ status: "invalid access token was provided" })
    })
})
app.use((req, res, next) => {
    jwt.verify(req.body.csrf, csrf_token_secret, (err: any, data: any) => {
        if (data.access_token === req.cookies.access_token && !err) next()
        else res.status(400).json({ status: "invalid request" })
    })
})

//all the Routers
app.use('/twitch', TwitchRouter)
app.use('/youtube', YoutubeRouter)

//start the server
app.listen(portnumber, () => console.log(`server started at http://localhost:${portnumber}`))