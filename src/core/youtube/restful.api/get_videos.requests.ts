import axios from 'axios'

export async function get_videos_from_user(access_token: string) {
    return await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            part: 'snippet,id',
            forMine: true
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(data => (data))
}

export async function get_videos_from_channel(channelId: string, access_token: string) {
    return await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            part: 'snippet,id',
            channelId
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(data => (data))
}