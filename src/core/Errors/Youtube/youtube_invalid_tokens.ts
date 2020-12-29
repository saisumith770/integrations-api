export class Youtube_Invalid_Token extends Error {
    constructor(...params: Array<any>) {
        super(...params)
        this.name = "Invalid youtube tokens are present"
        this.message = "your youtube tokens stored in the database are invalid. please disconnect and reconnect your account and report this issue."
    }
}