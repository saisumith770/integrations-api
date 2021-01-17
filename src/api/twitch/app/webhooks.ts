import express from 'express'
import { subscribe, unsubscribe } from '../../../core/twitch/restful.api'

import { getToken } from '../../../core/utils'

export const Router = express.Router()

enum Topics {
    STREAMS = `https://api.twitch.tv/helix/streams?user_id=`,
    USER = `https://api.twitch.tv/helix/users?id=`
}

Router.put('/subscribe', (req, res) => {
    getToken(req.query.identifier as string, 'twitch', req.prisma)
        .then(data => {
            subscribe({
                "hub.callback": "https://viber.io/webhooks/twitch",
                "hub.lease_seconds": 864000,
                "hub.topic": req.body.hub_topic === "streams" ? Topics.STREAMS + req.body.twitch_user_id : Topics.USER + req.body.twitch_user_id
            }, (data?.access_token as string))
        })
    res.json({ status: "proceed with regular activity" })
})

Router.delete('/unsubscribe', (req, res) => {
    getToken(req.query.identifier as string, 'twitch', req.prisma)
        .then(data => {
            unsubscribe({
                "hub.callback": "https://viber.io/webhooks/twitch",
                "hub.lease_seconds": 864000,
                "hub.topic": req.query.hub_topic === "streams" ? Topics.STREAMS + req.query.twitch_user_id : Topics.USER + req.query.twitch_user_id
            }, (data?.access_token as string))
        })
    res.json({ status: "proceed with regular activity" })
})