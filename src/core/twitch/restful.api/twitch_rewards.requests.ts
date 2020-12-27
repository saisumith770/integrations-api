import axios from 'axios'
import { twitch_client_id } from '../../../config/environment_variables'

interface Leaderboards {
    count: number
    period: string
    started_at: string
    user_id: string
}

interface customReward {
    broadcaster_id: string
}

interface Emote {
    id?: string
    only_manageable_rewards?: Boolean
}

interface rewardRedemption {
    reward_id?: string
    status?: string
    sort?: string
    after?: string
    first?: number
}

interface updateCustomRewardBody {
    title: string
    prompt: string
    cost: number
    background_color: string
    is_enabled: Boolean
    is_user_input_required: Boolean
    is_max_per_stream_enabled: Boolean
    max_per_stream: number
    is_max_per_user_per_stream_enabled: Boolean
    max_per_user_per_stream: number
    is_global_cooldown_enabled: Boolean
    global_cooldown_seconds: number
    is_paused: Boolean
    should_redemptions_skip_request_queue: Boolean
}

export async function getBitsLeaderboard(params: Partial<Leaderboards>, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/bits/leaderboard', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}

export async function getCheermotes(params: customReward, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/bits/cheermotes', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}

export async function createCustomRewards(params: customReward, access_token: string) {
    var result = await axios.post('https://api.twitch.tv/helix/channel_points/custom_rewards', null, {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}

export async function removeCustomReward(params: customReward & { id: string }, access_token: string) {
    var result = await axios.delete('https://api.twitch.tv/helix/channel_points/custom_rewards', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}

export async function getCustomReward(params: customReward & Partial<Emote>, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/channel_points/custom_rewards', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}

export async function getCustomRewardRedemption(params: customReward & { reward_id: string } & rewardRedemption, access_token: string) {
    var result = await axios.get('https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id
        }
    })
    return result.data
}

export async function updateCustomReward(params: customReward & { id: string }, data: updateCustomRewardBody, access_token: string) {
    var result = axios.patch('https://api.twitch.tv/helix/channel_points/custom_rewards', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id,
            'Content-Type': 'application/json'
        },
        data
    })
    return result
}

export async function updateRedemptionStatus(params: customReward & { id: string, reward_id: string }, status: string, access_token: string) {
    var result = await axios.patch('https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Client-Id': twitch_client_id,
            'Content-Type': 'application/json'
        },
        data: {
            status
        }
    })
    return result.data
}