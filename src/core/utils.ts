import { PrismaClient } from '@prisma/client'

export async function getToken(user_id: string, platform: string, prisma: PrismaClient) {
    return await prisma.integrations.findFirst({
        where: {
            user_id,
            platform
        },
        select: {
            access_token: true
        }
    })
}