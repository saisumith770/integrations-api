import axios from 'axios'
import { twitch_client_id } from '../../../config/environment_variables'

interface AnalyticsParams {
    after: string
    ended_at: string
    first: number
    game_id: string
    started_at: string
    type: string
}

interface TopGames {
    after: string
    before: string
    first: number
}

interface Games {
    id: string
    name: string
}

export async function getGameAnalytics(params: Partial<AnalyticsParams>, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/analytics/games', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}

export async function getTopGames(params: Partial<TopGames>, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/games/top', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}

export async function getGames(params: Games, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/games', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}