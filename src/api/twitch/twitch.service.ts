import express from 'express'
import { Router as AuthRouter } from './auth'
import { Router as AppRouter } from './app'

export const Router = express.Router()

Router.use('/auth', AuthRouter)
Router.use('/extension', AppRouter)

/*
GET https://id.twitch.tv/oauth2/authorize
   ?client_id=<your client ID>
    &redirect_uri=<your registered redirect URI>
    &response_type=code
    &scope=analytics:read:extensions analytics:read:games bits:read channel:manage:broadcast channel:manage:extensions channel:manage:redemptions channel:read:hype_train channel:read:redemptions channel:read:subscriptions clips:edit moderation:read user:edit user:edit:follows user:read:broadcast channel:moderate chat:edit chat:read whispers:read
*/

/*
new feature ideas to implement:
add custom video broadcasting to twitch from my platform
use pub sub to listen to chat and much more
enable mobile deep links on the front end
Embed the live stream on the front end
*/