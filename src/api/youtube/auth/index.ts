import express from 'express'

import { connect_Youtube as connect, refresh_Youtube as refresh, disconnect_Youtube as disconnect, RetrieveChannelInfo } from '../../../index'

export const Router = express.Router()

//connect to a new platform
Router.post('/connect', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        connect(req.body.authorization_code, req.body.user_id, req.prisma)
            .then(data => res.status(200).json({
                data
            }))
            .catch(err => res.status(400).json(err))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//disconnect an integration
Router.delete('/disconnect', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        disconnect((req.query.token as string), (req.query.user_id as string), req.prisma)
            .then(data => res.status(200).json({
                data
            }))
            .catch(err => res.status(400).json(err))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//update tokens
Router.put('/update', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        refresh(req.body.user_id, req.prisma)
            .then(() => res.json({ status: "successfully refreshed the token" }))
            .catch(() => res.status(404).json({ status: "unable to refresh token" }))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//get the channel information
Router.get('/channel_info', (req, res) => {
    RetrieveChannelInfo((req.query.token as string))
        .then(data => {
            if (data.status !== 401) res.json({ status: "the token is valid" })
            else res.status(401).json({ status: "the token is not valid" })
        })
})

/*
GET https://accounts.google.com/o/oauth2/v2/auth?
 scope=https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload  https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit&
 access_type=offline&
 include_granted_scopes=true&
 redirect_uri=https://viber-eight.vercel.app/redirects/YoutubeWebhook&
 response_type=code&
 client_id=<client_id>
*/