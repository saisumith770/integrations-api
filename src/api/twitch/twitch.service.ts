import express from 'express'
import { Router as AuthRouter } from './auth'

export const Router = express.Router()

Router.use('/auth', AuthRouter)

/*
to check if the access token is still valid
https://id.twitch.tv/oauth2/validate    headers="Authorization: OAuth <access token>"

to remove the access token when the user disconnects
POST https://id.twitch.tv/oauth2/revoke
    ?client_id=<your client ID>
    &token=<your OAuth token>

to refresh the access token
POST https://id.twitch.tv/oauth2/token
    --data-urlencode
    ?grant_type=refresh_token
    &refresh_token=<your refresh token>
    &client_id=<your client ID>
    &client_secret=<your client secret>

OAUTH Authorization code flow
GET https://id.twitch.tv/oauth2/authorize
   ?client_id=<your client ID>
    &redirect_uri=<your registered redirect URI>
    &response_type=code
    &scope=analytics:read:extensions analytics:read:games bits:read channel:manage:broadcast channel:manage:extensions channel:manage:redemptions channel:read:hype_train channel:read:redemptions channel:read:subscriptions clips:edit moderation:read user:edit user:edit:follows user:read:broadcast channel:moderate chat:edit chat:read whispers:read

POST https://id.twitch.tv/oauth2/token
    ?client_id=<your client ID>
    &client_secret=<your client secret>
    &code=<authorization code received above>
    &grant_type=authorization_code
    &redirect_uri=<your registered redirect URI>
*/