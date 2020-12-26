import axios from 'axios'
import { twitch_client_id } from '../../../config/environment_variables'

interface GetWebhook {
    after?: string
    first?: number
}

export async function getWebhooks(params: GetWebhook, access_token: string) {
    var result = await axios.get(' https://api.twitch.tv/helix/webhooks/subscriptions', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}