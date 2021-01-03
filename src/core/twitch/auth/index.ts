import { NeutralizeAccessToken, ExchangeAuthCode_AccessToken, RefreshToken, ValidateToken } from './request.handler'
import { clearIntegrationFromDatabase, createIntegrationInDatabase, updateTokens } from '../../database.mutation'
import { PrismaClient } from '@prisma/client'

import { showOnProfile } from './interface'
import { Twitch_Failed_To_Collect_Account_Information } from '../../Errors/Twitch/twitch_unable_to_accquire_info'
import { Twitch_Invalid_Token } from '../../Errors/Twitch/twitch_invalid_tokens'

export async function disconnect(token: string, user_id: string, prisma: PrismaClient) {
    var twitchApiResponse = NeutralizeAccessToken(token)
    var prismaDatabaseResponse = clearIntegrationFromDatabase('twitch', user_id, prisma)
    return Promise.all([twitchApiResponse, prismaDatabaseResponse])
}

export async function connect(code: string, user_id: string, prisma: PrismaClient) {
    ExchangeAuthCode_AccessToken(code)
        .then(data => {
            ValidateToken(data.access_token)
                .then(accountInfo => {
                    if (!accountInfo.status) {
                        createIntegrationInDatabase({
                            platform: 'twitch',
                            accountName: accountInfo.login,
                            accountURL: `https://twitch.tv/${accountInfo.login}`,
                            showOnProfile: showOnProfile.false,
                            access_token: data.access_token,
                            refresh_token: data.refresh_token,
                            platform_user_id: accountInfo.user_id
                        }, user_id, prisma)
                    } else new Twitch_Failed_To_Collect_Account_Information()
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