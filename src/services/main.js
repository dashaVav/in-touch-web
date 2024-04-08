
import {Handler} from "./utils/Handler.js";
import {AuthApi} from "./api/AuthApi.js";
import {AuthRequest} from "./dto/AuthRequest.js";
import {AuthResponse} from "./dto/AuthResponse.js";
async function login(login, password) {
    const authRequest = new AuthRequest(login, password, 1);
    const handler = new Handler();
    const authApi = new AuthApi(handler, authRequest);
    const response = await authApi.auth();
    const data = await response.json();
    const authResponse = new AuthResponse(data.token, data.user, data.company, data.admin);
    return authResponse.user;
}

(async () => {
    const user = await login("Egorka", "1111");
    console.log(user);
})();