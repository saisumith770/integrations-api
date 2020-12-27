import axios from 'axios'
import { twitch_client_id } from '../../../config/environment_variables'

interface AnalyticsParams {
    after: string
    ended_at: string
    extension_id: string
    first: number
    started_at: string
    type: string
}

interface Transactions {
    extension_id: string
    id: string
    after: string
    first: number
}

export async function getExtensionAnalytics(params: Partial<AnalyticsParams>, access_token: string) {
    const result = await axios.get('https://api.twitch.tv/helix/analytics/extensions', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}

export async function getAllExtensions(access_token: string) {
    const result = await axios.get('https://api.twitch.tv/helix/users/extensions/list', {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}

export async function getExtensionTransactions(params: Transactions, access_token: string) {
    const result = await axios.get('https://api.twitch.tv/helix/extensions/transactions', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result
}

export async function updateExtensionAnalytics(access_token: string) {
    var result = await axios.put('https://api.twitch.tv/helix/users/extensions', {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id,
            "Content-Type": "application/json"
        }
    })
    return result
}