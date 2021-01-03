import { PrismaClient } from '@prisma/client'

import { ExchangeAuthCode_AccessToken, NeutralizeAccessToken, RefreshToken, RetrieveChannelInfo } from './request_handler'
import { clearIntegrationFromDatabase, createIntegrationInDatabase, updateTokens } from '../../database.mutation'

import { Discord_Failed_To_Collect_Account_Information } from '../../Errors/Discord/discord_unable_to_accquire_info'
import { Discord_Invalid_Token } from '../../Errors/Discord/discord_invalid_tokens'

enum showOnProfile {
    true = "true",
    false = "false"
}

export async function disconnect(token: string, user_id: string, prisma: PrismaClient) {
    var twitchApiResponse = NeutralizeAccessToken(token)
    var prismaDatabaseResponse = clearIntegrationFromDatabase('discord', user_id, prisma)
    return Promise.all([twitchApiResponse, prismaDatabaseResponse])
}

export async function connect(code: string, user_id: string, prisma: PrismaClient) {
    ExchangeAuthCode_AccessToken(code)
        .then(data => {
            RetrieveChannelInfo(data.access_token)
                .then(accountInfo => {
                    if (!accountInfo.status) {
                        createIntegrationInDatabase({
                            platform: 'discord',
                            accountName: accountInfo.username,
                            accountURL: `https://discord.com`,
                            showOnProfile: showOnProfile.false,
                            access_token: data.access_token,
                            refresh_token: data.refresh_token,
                            platform_user_id: accountInfo.id
                        }, user_id, prisma)
                    } else new Discord_Failed_To_Collect_Account_Information()
                })
                .catch(() => new Discord_Failed_To_Collect_Account_Information())
        })
}

export async function refresh(user_id: string, scope: string, prisma: PrismaClient) {
    prisma.integrations.findFirst({
        where: {
            user_id
        },
        select: {
            refresh_token: true
        }
    })
        .then(data => {
            RefreshToken(data!.refresh_token!, scope)
                .then(({ access_token, refresh_token }) => {
                    updateTokens(user_id, 'discord', { access_token, refresh_token }, prisma)
                })
                .catch(() => new Discord_Invalid_Token())
        })
        .catch(() => new Discord_Invalid_Token())
}