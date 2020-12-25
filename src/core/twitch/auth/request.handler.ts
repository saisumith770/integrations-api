import axios from 'axios'
import { twitch_client_id, twitch_client_secret, twitch_redirect_uri } from "../../../config/environment_variables";
import { Twitch_Invalid_Authorization_Code } from '../../Errors/twitch_auth_code_error';

export async function ValidateToken(token: string) {
    const result = await axios.get('https://id.twitch.tv/oauth2/validate', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return result.data
}

export async function ExchangeAuthCode_AccessToken(code: string) {
    return await axios.post(`https://id.twitch.tv/oauth2/token`, null, {
        params: {
            client_id: twitch_client_id,
            client_secret: twitch_client_secret,
            code,
            grant_type: "authorization_code",
            redirect_uri: twitch_redirect_uri
        }
    })
        .then(data => (data.data))
        .catch(() => new Twitch_Invalid_Authorization_Code())
}

export async function RefreshToken(refresh_token: string) {
    const result = await axios.post(`https://id.twitch.tv/oauth2/token`, null, {
        params: {
            grant_type: "refresh_token",
            refresh_token,
            client_id: twitch_client_id,
            client_secret: twitch_client_secret
        }
    })
    return result.data
}

export async function NeutralizeAccessToken(token: string) {
    const result = await axios.post(`https://id.twitch.tv/oauth2/revoke`, null, {
        params: {
            client_id: twitch_client_id,
            token
        }
    })
    return result.data
}