import express from 'express'
import { subscribe, unsubscribe } from '../../../core/youtube/restful.api'
import { twitch_redirect_uri } from '../../../config/environment_variables'

export const Router = express.Router()

Router.put('/subscribe', (req, res) => {
    subscribe({
        "hub.callback": twitch_redirect_uri,
        "hub.topic": req.body.topic,
        "hub.lease_seconds": req.body.lease_seconds
    })
    res.json({ status: "proceed with regular activity" })
})

Router.delete('/unsubscribe', (req, res) => {
    unsubscribe({
        "hub.callback": twitch_redirect_uri,
        "hub.topic": req.body.topic,
        "hub.lease_seconds": req.body.lease_seconds
    })
    res.json({ status: "proceed with regular activity" })
})