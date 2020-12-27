import axios from 'axios'
import { twitch_client_id } from '../../../config/environment_variables'

interface BannedEvents {
    broadcaster_id: string
    user_id?: string
    after?: string
    first?: number
}

interface BannedUsers {
    broadcaster_id: string
    user_id?: string
    first?: number
    after?: string
    before?: string
}

interface getMods {
    broadcaster_id: string
    user_id?: string
    first?: number
    after?: string
}

interface ModEvents {
    broadcaster_id: string
    user_id?: string
    after?: string
    first?: number
}

interface SearchCategories {
    query: string
    first?: number
    after?: string
}

interface SearchChannel {
    query: string
    first?: number
    after?: string
    live_only?: boolean
}

interface ModifyChannel {
    game_id?: string
    broadcaster_language?: string
    title?: string
}

interface BroadcasterSubs {
    broadcaster_id: string
    user_id?: string
    after?: string
    first?: number
}

export async function getBannedEvents(params: BannedEvents, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/moderation/banned/events', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function getBannedUsers(params: BannedUsers, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/moderation/banned', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function getModerators(params: getMods, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/moderation/moderators0', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function getModeratorEvents(params: ModEvents, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/moderation/moderators/events', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function searchCategories(params: SearchCategories, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/search/categories', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function searchChannels(params: SearchChannel, access_token: string) {
    var result = await axios.get('https://api.twitch.tvhelix/search/channels', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function getChannelInformation(params: { broadcaster_id: string }, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/channels', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function modifyChannelInformation(params: { broadcaster_id: string }, data: ModifyChannel, access_token: string) {
    var result = await axios.patch('https://api.twitch.tv/helix/channels', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        },
        data
    })
    return result.data
}
export async function getBroadcasterSubscriptions(params: BroadcasterSubs, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/subscriptions', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}