export class Youtube_Failed_To_Collect_Account_Information extends Error {
    constructor(...params: Array<any>) {
        super(...params)
        this.name = "Internal server error"
        this.message = "the youtube connection was successfully enabled. But we couldnt retrieve your information, please report this issue!"
    }
}