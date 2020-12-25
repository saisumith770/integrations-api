export interface App {
    platform: string
    accountName: string
    accountURL: string
    showOnProfile: showOnProfile
    access_token: string
    refresh_token: string
}

export enum showOnProfile {
    true = "true",
    false = "false"
}

export interface BatchPayload {
    count: number
}
export interface UpdatePayload {
    access_token: string
    refresh_token: string
}