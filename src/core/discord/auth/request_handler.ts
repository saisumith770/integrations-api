import axios from 'axios'
import { discord_redirect_uri, discord_client_secret, discord_client_id } from '../../../config/environment_variables'
import { Discord_Invalid_Authorization_Code } from '../../Errors/Discord/discord_auth_code_error'
import { Discord_Invalid_Token } from '../../Errors/Discord/discord_invalid_tokens'

/*
GET https://discord.com/api/oauth2/authorize?
    response_type=code&
    client_id=<client id>&
    scope=identify%20guilds.join&
    state=15773059ghq9183habn&
    redirect_uri=https://viber-eight.vercel.app/redirects/DiscordWebhook&
    prompt=consent
*/

export async function RetrieveChannelInfo(access_token: string) {
    return await axios.get('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(data => (data.data))
}

export async function ExchangeAuthCode_AccessToken(code: string) {
    return await axios.post(`https://discord.com/api/oauth2/token`, null, {
        data: {
            client_id: discord_client_id,
            client_secret: discord_client_secret,
            code,
            grant_type: "authorization_code",
            redirect_uri: discord_redirect_uri
        }
    })
        .then(data => (data.data))
        .catch(() => new Discord_Invalid_Authorization_Code())
}

export async function RefreshToken(refresh_token: string, scope: string) {
    return await axios.post(`https://discord.com/api/oauth2/token`, null, {
        data: {
            client_id: discord_client_id,
            client_secret: discord_client_secret,
            refresh_token,
            grant_type: "refresh_token",
            redirect_uri: discord_redirect_uri,
            scope
        }
    })
        .then(data => (data.data))
        .catch(() => new Discord_Invalid_Token())
}

export async function NeutralizeAccessToken(token: string) {
    const result = await axios.post(`https://discord.com/api/oauth2/token/revoke`, null, {
        params: {
            client_id: discord_client_id,
            token
        }
    })
    return result.data
}