import { NeutralizeAccessToken, ExchangeAuthCode_AccessToken, RefreshToken } from './request.handler'
import { clearIntegrationFromDatabase, createIntegrationInDatabase, updateTokens } from '../../database.mutation'
import { PrismaClient } from '@prisma/client'

import { showOnProfile } from './interface'

import axios from 'axios'
import { twitch_client_id } from '../../../config/environment_variables'
import { Twitch_Failed_To_Collect_Account_Information } from '../../Errors/twitch_unable_to_accquire_info'
import { Twitch_Invalid_Token } from '../../Errors/twitch_invalid_tokens'

export async function disconnect(token: string, user_id: string, prisma: PrismaClient) {
    var twitchApiResponse = NeutralizeAccessToken(token)
    var prismaDatabaseResponse = clearIntegrationFromDatabase('twitch', user_id, prisma)
    return Promise.all([twitchApiResponse, prismaDatabaseResponse])
}

export async function connect(code: string, user_id: string, prisma: PrismaClient) {
    ExchangeAuthCode_AccessToken(code)
        .then(data => {
            axios.get(`https://id.twitch.tv/oauth2/userinfo`, {
                headers: {
                    Authorization: `Bearer ${data.access_token}`
                }
            })
                .then(metaInfo => {
                    axios.get('https://api.twitch.tv/helix/users', {
                        params: {
                            id: metaInfo.data.sub
                        },
                        headers: {
                            Authorization: `Bearer ${data.access_token}`,
                            'Client-Id': twitch_client_id
                        }
                    })
                        .then(accountInfo => {
                            createIntegrationInDatabase({
                                platform: 'twitch',
                                accountName: accountInfo.data.preferred_username,
                                accountURL: `https://twitch.tv/${accountInfo.data.preferred_username}`,
                                showOnProfile: showOnProfile.false,
                                access_token: data.access_token,
                                refresh_token: data.refresh_token
                            }, user_id, prisma)
                        })
                        .catch(() => new Twitch_Failed_To_Collect_Account_Information())
                })
                .catch(() => new Twitch_Failed_To_Collect_Account_Information())
        })
}

export async function refresh(user_id: string, prisma: PrismaClient) {
    prisma.integrations.findFirst({
        where: {
            user_id
        },
        select: {
            refresh_token: true
        }
    })
        .then(data => {
            RefreshToken(data!.refresh_token!)
                .then(({ access_token, refresh_token }) => {
                    updateTokens(user_id, 'twitch', { access_token, refresh_token }, prisma)
                })
                .catch(() => new Twitch_Invalid_Token())
        })
        .catch(() => new Twitch_Invalid_Token())
}