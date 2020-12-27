import axios from 'axios'
import { twitch_client_id } from '../../../config/environment_variables'

interface GetWebhook {
    after?: string
    first?: number
}

interface WebhookSubscribeBody {
    "hub.callback": string
    "hub.topic": string
    "hub.lease_seconds": number
    "hub.secret"?: string
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

export async function subscribe(data: WebhookSubscribeBody, access_token: string) {
    var result = await axios.post('https://api.twitch.tv/helix/webhooks/hub', {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        },
        data: { ...data, "hub.mode": "subscribe" }
    })
    return result.data
}

export async function unsubscribe(data: WebhookSubscribeBody, access_token: string) {
    var result = await axios.post('https://api.twitch.tv/helix/webhooks/hub', {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        },
        data: { ...data, "hub.mode": "unsubscribe" }
    })
    return result.data
}