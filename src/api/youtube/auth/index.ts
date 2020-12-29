import express from 'express'

export const Router = express.Router()

/*
GET https://accounts.google.com/o/oauth2/v2/auth?
 scope=https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload  https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit&
 access_type=offline&
 include_granted_scopes=true&
 redirect_uri=https://viber-eight.vercel.app/redirects/YoutubeWebhook&
 response_type=code&
 client_id=843182454902-cu5or58j64v27rqlll2dklt3gam008n9.apps.googleusercontent.com
*/