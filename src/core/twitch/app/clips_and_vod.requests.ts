import axios from 'axios'
import { twitch_client_id } from '../../../config/environment_variables'

interface createClip {
    broadcaster_id: string
    has_delay?: boolean
}

interface getClips {
    broadcaster_id: string
    id: string
    game_id: string
    after?: string
    before?: string
    ended_at?: string
    first?: number
    started_at?: string
}

interface getVods {
    id: string
    user_id: string
    game_id: string
}

interface getAllStreams {
    after: string
    first: number
    tag_id: string
}

interface replaceTagsBody {
    tag_ids: string[]
}

export async function createClip(params: createClip, access_token: string) {
    var result = await axios.post('https://api.twitch.tv/helix/clips', null, {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function getClips(params: getClips, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/clips', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function getVods(params: getVods, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/videos', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function getStreamTags(params: { broadcaster_id: string }, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/streams/tags', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function getAllStreamTags(params: Partial<getAllStreams>, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/tags/streams', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function replaceStreamTags(params: { broadcaster_id: string }, data: replaceTagsBody, access_token: string) {
    var result = await axios.put('https://api.twitch.tv/helix/streams/tags', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        },
        data
    })
    return result.data
}