import express from 'express'
import { connect_Twitch as connect, disconnect_Twitch as disconnect, refresh_Twitch as refresh, ValidateToken } from '../../../index'

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

//check token validation
Router.get('/validation', (req, res) => {
    ValidateToken((req.query.token as string))
        .then(data => {
            if (data.status !== 401) res.json({ status: "the token is valid" })
            else res.status(401).json({ status: "the token is not valid" })
        })
})