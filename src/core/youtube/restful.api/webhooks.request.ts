import axios from 'axios'

interface pubsubhubbub {
    "hub.callback": string
    "hub.topic": string
    "hub.lease_seconds": number
    "hub.secret"?: string
}

export async function subscribe(data: pubsubhubbub) {
    return await axios.post('https://pubsubhubbub.appspot.com/subscribe', null, {
        data: { ...data, "hub.mode": "subscribe" },
    }).then(data => (data.data))
}

export async function unsubscribe(data: pubsubhubbub) {
    return await axios.post('https://pubsubhubbub.appspot.com/subscribe', null, {
        data: { ...data, "hub.mode": "unsubscribe" },
    }).then(data => (data.data))
}