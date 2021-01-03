import axios from 'axios'

export async function getGuild(access_token: string) {
    return await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(data => (data.data))
}

export async function removeGuild(guild_id: string, access_token: string) {
    return await axios.delete(`https://discord.com/api/users/@me/guilds/${guild_id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(data => (data.data))
}