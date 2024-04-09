// import { AuthRequest } from './dto/AuthRequest.js'
// import { Handler } from './utils/Handler.js'

export class AuthApi {
    constructor(handler, authRequest) {
        this._handler = handler;
        this._authRequest = authRequest;
    }

    async auth() {
        return await this._handler.postRequest('http://195.133.196.67:8881/chat_api/v1/auth/login', this._authRequest.toJSON());
    }
}