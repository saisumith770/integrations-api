import express from 'express'
import { connect_Twitch as connect, disconnect_Twitch as disconnect, refresh_Twitch as refresh, ValidateToken } from '../../../index'

import { getToken } from '../../../core/utils'

export const Router = express.Router()

//connect to a new platform
Router.post('/connect', (req, res) => {
    connect(req.body.authorization_code, req.query.identifier as string, req.prisma)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json(err))
})

//disconnect an integration
Router.delete('/disconnect', (req, res) => {
    disconnect((req.query.identifier as string), req.prisma)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json(err))
})

//update tokens
Router.put('/update', (req, res) => {
    refresh(req.query.identifier as string, req.prisma)
        .then(() => res.json({ status: "successfully refreshed the token" }))
        .catch(() => res.status(404).json({ status: "unable to refresh token" }))
})

//check token validation
Router.get('/validation', (req, res) => {
    getToken(req.query.identifier as string, 'twitch', req.prisma)
        .then(data => {
            ValidateToken((data?.access_token as string))
                .then(data => {
                    if (data.status !== 401) res.json({ status: "the token is valid" })
                    else res.status(401).json({ status: "the token is not valid" })
                })
        })
})