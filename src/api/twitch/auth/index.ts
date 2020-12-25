import express from 'express'
import { connect, disconnect, refresh } from '../../../index'

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
Router.post('/disconnect', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        disconnect(req.params.platform, req.body.user_id, req.prisma)
            .then(data => res.status(200).json({
                data
            }))
            .catch(err => res.status(400).json(err))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//update tokens
Router.post('/update', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        refresh(req.body.user_id, req.prisma)
            .then(() => res.json({ status: "successfully refreshed the token" }))
            .catch(err => res.status(404).json({ status: "unable to refresh token" }))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})