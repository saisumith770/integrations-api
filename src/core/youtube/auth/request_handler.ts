import axios from 'axios'
import { youtube_redirect_uri, youtube_client_secret, youtube_client_id } from '../../../config/environment_variables'
import { Youtube_Invalid_Authorization_Code } from '../../Errors/Youtube/youtube_auth_code_error'

export async function ExchangeAuthCode_AccessToken(code: string) {
    return await axios.post(`https://oauth2.googleapis.com/token`, null, {
        params: {
            client_id: youtube_client_id,
            client_secret: youtube_client_secret,
            code,
            grant_type: "authorization_code",
            redirect_uri: youtube_redirect_uri
        }
    })
        .then(data => (data.data))
        .catch(() => new Youtube_Invalid_Authorization_Code())
}

export async function RefreshToken(refresh_token: string) {
    const result = await axios.post(`https://oauth2.googleapis.com/token`, null, {
        params: {
            grant_type: "refresh_token",
            refresh_token,
            client_id: youtube_client_id,
            client_secret: youtube_client_secret
        }
    })
    return result.data
}

export async function NeutralizeAccessToken(token: string) {
    const result = await axios.post(`https://oauth2.googleapis.com/revoke`, null, {
        params: {
            client_id: youtube_client_id,
            token
        }
    })
    return result.data
}