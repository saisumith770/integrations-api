export interface App {
    platform: string
    accountName: string
    accountURL: string
    showOnProfile: showOnProfile
    access_token: string
    refresh_token: string
    platform_user_id: string
}

export enum showOnProfile {
    true = "true",
    false = "false"
}