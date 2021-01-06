import express from 'express'
import { Router as WebhookRouter } from './webhooks'
import { PrismaClient } from '@prisma/client'

export const Router = express.Router()

Router.use((req, res, next) => {
    get_access_token((req.query.identifier as string), req.prisma)
        .then(data => {
            if (data?.access_token) {
                req.query.access_token = data.access_token
                req.query.twitch_user_id = data.platform_user_id!
                next()
            }
            else res.status(401).json({ status: "youtube connection was not established" })
        })
})
Router.use('/webhook', WebhookRouter)

async function get_access_token(user_id: string, prisma: PrismaClient) {
    var result = prisma.integrations.findFirst({
        where: {
            user_id
        },
        select: {
            access_token: true,
            platform_user_id: true
        }
    })
    return result
} 