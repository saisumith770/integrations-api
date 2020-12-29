export class Twitch_Invalid_Token extends Error {
    constructor(...params: Array<any>) {
        super(...params)
        this.name = "Invalid twitch tokens are present"
        this.message = "your twitch tokens stored in the database are invalid. please disconnect and reconnect your account and report this issue."
    }
}