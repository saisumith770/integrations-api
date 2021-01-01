import axios from 'axios'

interface params {
    part: "contentDetails" | "fileDetails" | "id" | "liveStreamingDetails" | "localizations" | "player" | "processingDetails" | "recordingDetails" | "snippet" | "statistics" | "status" | "suggestions" | "topicDetails"
    id: string
    maxResults: number
}

export async function get_video_details(params: params, access_token: string) {
    return await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}