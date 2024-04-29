import {Handler} from "./utils/Handler.js";
import {AuthApi} from "./api/AuthApi.js";
import {AuthRequest} from "./dto/AuthRequest.js";
import {AuthResponse} from "./dto/AuthResponse.js";
import {User} from "./dto/User.js";

export var user;
export var company;
export var allUsers;

const handler = new Handler();

export async function login(login, password) {
    const authRequest = new AuthRequest(login, password, 1);
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
    company = authResponse.company;
    user = authResponse.user;
    handler.token = authResponse.token;
    handler.setToken();
    // return authResponse.user;
}

export async function users() {
    const data = await handler.getRequest("/chat_api/v1/company/" + company.id + "/users");
    const jsonArray = await data.json();
    allUsers = jsonArray.map(data => new User(
        data.id,
        data.username,
        data.realName,
        data.surname,
        data.dateOfBirth,
        data.phoneNumber,
        data.isOnline,
        data.patronymic,
        data.profilePhotoId,
        data.thumbnailPhotoId
    ));
}
//
// (async () => {
//     await login("Egorka", "1111");
//     await users();
//     console.log(allUsers);
// })();