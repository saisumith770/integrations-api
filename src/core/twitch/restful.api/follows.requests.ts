import axios from 'axios'
import { twitch_client_id } from '../../../config/environment_variables'

interface CreateFollow {
    from_id: string
    to_id: string
    allow_notifications?: boolean
}

interface UnFollow {
    from_id: string
    to_id: string
}

interface getUser {
    id?: string
    login?: string
}

interface getFollows {
    after?: string
    first?: number
    from_id?: string
    to_id?: string
}

export async function createFollow(params: CreateFollow, access_token: string) {
    var result = await axios.post('https://api.twitch.tv/helix/users/follows', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function removeFollow(params: UnFollow, access_token: string) {
    var result = await axios.delete('https://api.twitch.tv/helix/users/follows', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function getUsers(params: getUser, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/users', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function getUserFollows(params: getFollows, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/users/follows', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}
export async function updateUser(params: { description: string }, access_token: string) {
    var result = await axios.put('https://api.twitch.tv/helix/users', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}