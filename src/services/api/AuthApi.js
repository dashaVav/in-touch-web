import {postRequest} from "../utils/Handler.js";

export async function auth(authRequest) {
    return postRequest('/auth/login', authRequest.toJSON());
}
