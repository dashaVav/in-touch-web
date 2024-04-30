export class AuthApi {
    constructor(handler, authRequest) {
        this._handler = handler;
        this._authRequest = authRequest;
    }

    async auth() {
        return await this._handler.postRequest('/auth/login', this._authRequest.toJSON());
    }
}