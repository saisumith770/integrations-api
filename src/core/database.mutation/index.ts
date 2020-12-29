import { PrismaClient, integrations } from "@prisma/client";
import { App, BatchPayload, UpdatePayload } from '../twitch/auth/interface'

export async function createIntegrationInDatabase(app: App, user_id: string, prisma: PrismaClient): Promise<integrations> {
    var result: integrations = await prisma.integrations.create({
        data: {
            platform: app.platform,
            accountName: app.accountName,
            accountURL: app.accountURL,
            showOnProfile: app.showOnProfile,
            access_token: app.access_token,
            refresh_token: app.refresh_token,
            users: {
                connect: {
                    user_id
                }
            },
            platform_user_id: app.platform_user_id
        }
    })
    return result
}

//disconnect from any platform
export async function clearIntegrationFromDatabase(platform: string, user_id: string, prisma: PrismaClient): Promise<BatchPayload> {
    var result: BatchPayload = await prisma.integrations.deleteMany({
        where: {
            user_id: user_id,
            platform
        }
    })
    return result
}

export async function updateTokens(user_id: string, platform: string, payload: UpdatePayload, prisma: PrismaClient) {
    var result = await prisma.integrations.update({
        where: {
            user_id_platform: {
                user_id,
                platform
            }
        },
        data: {
            access_token: payload.access_token,
            refresh_token: payload.refresh_token
        }
    })
    return result
}