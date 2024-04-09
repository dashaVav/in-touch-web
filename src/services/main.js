import {Handler} from "./utils/Handler.js";
import {AuthApi} from "./api/AuthApi.js";
import {AuthRequest} from "./dto/AuthRequest.js";
import {AuthResponse} from "./dto/AuthResponse.js";
import {User} from "./dto/User.js";

export var user = new User();
export var resp;
export var id = 1;
export async function login(login, password) {
    const authRequest = new AuthRequest(login, password, 1);
    const handler = new Handler();
    const authApi = new AuthApi(handler, authRequest);
    const response = await authApi.auth();
    const data = await response.json();
    const user1 = new User(
        data.user.id,
        data.user.username,
        data.user.realName,
        data.user.surname,
        data.user.dateOfBirth,
        data.user.phoneNumber,
        data.user.isOnline,
        data.user.patronymic,
        data.user.profilePhotoId,
        data.user.thumbnailPhotoId
    );
    const authResponse = new AuthResponse(data.token, user1, data.company, data.admin);
    resp = authResponse;
    console.log(authResponse);
    user = authResponse.user;
    // return authResponse.user;
}

// (async () => {
//     const user = await login("Egorka", "1111");
//     console.log(user);
// })();