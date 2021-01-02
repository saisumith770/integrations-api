export class Discord_Invalid_Authorization_Code extends Error {
    constructor(...params: Array<any>) {
        super(...params)
        this.name = "Invalid authorization code"
        this.message = "the authorization code provided is not valid. Try to reconnect your account!"
    }
}