import { PrismaClient } from '@prisma/client'

import { ExchangeAuthCode_AccessToken, NeutralizeAccessToken, RefreshToken, RetrieveChannelInfo } from './request_handler'
import { clearIntegrationFromDatabase, createIntegrationInDatabase, updateTokens } from '../../database.mutation'

import { Youtube_Failed_To_Collect_Account_Information } from '../../Errors/Youtube/youtube_unable_to_accquire_info'
import { Youtube_Invalid_Token } from '../../Errors/Youtube/youtube_invalid_tokens'

import { showOnProfile } from './interface'

import { getToken } from '../../utils'

export async function disconnect(user_id: string, prisma: PrismaClient) {
    return await getToken(user_id, 'youtube', prisma)
        .then(data => {
            var youtubeApiResponse = NeutralizeAccessToken(data?.access_token as string)
            var prismaDatabaseResponse = clearIntegrationFromDatabase('youtube', user_id, prisma)
            return Promise.all([youtubeApiResponse, prismaDatabaseResponse])
        })
}

export async function connect(code: string, user_id: string, prisma: PrismaClient) {
    ExchangeAuthCode_AccessToken(code)
        .then(data => {
            RetrieveChannelInfo(data.access_token)
                .then(accountInfo => {
                    if (!accountInfo.status) {
                        createIntegrationInDatabase({
                            platform: 'youtube',
                            accountName: accountInfo.items.snippet.title,
                            accountURL: `https://www.youtube.com/channel/${accountInfo.items.id}`,
                            showOnProfile: showOnProfile.false,
                            access_token: data.access_token,
                            refresh_token: data.refresh_token,
                            platform_user_id: accountInfo.items.id
                        }, user_id, prisma)
                    } else new Youtube_Failed_To_Collect_Account_Information()
                })
                .catch(() => new Youtube_Failed_To_Collect_Account_Information())
        })
}

export async function refresh(user_id: string, prisma: PrismaClient) {
    prisma.integrations.findFirst({
        where: {
            user_id,
            platform: 'youtube'
        },
        select: {
            refresh_token: true
        }
    })
        .then(data => {
            RefreshToken(data!.refresh_token!)
                .then(({ access_token, refresh_token }) => {
                    updateTokens(user_id, 'youtube', { access_token, refresh_token }, prisma)
                })
                .catch(() => new Youtube_Invalid_Token())
        })
        .catch(() => new Youtube_Invalid_Token())
}