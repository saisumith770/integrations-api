export class Discord_Invalid_Token extends Error {
    constructor(...params: Array<any>) {
        super(...params)
        this.name = "Invalid discord tokens are present"
        this.message = "your discord tokens stored in the database are invalid. please disconnect and reconnect your account and report this issue."
    }
}