import {Handler} from "./utils/Handler.js";
import {AuthApi} from "./api/AuthApi.js";
import {AuthRequest} from "./dto/AuthRequest.js";
import {AuthResponse} from "./dto/AuthResponse.js";
import {User} from "./dto/User.js";
import {Chat} from "./dto/Chat.js";
import {Message} from "./dto/Message.js";
import {connect} from "./StopmSession.js";
import {ChangePasswordRequest} from "./dto/ChangePasswordRequest.js";


export var user;
export var company;
export var allUsers;
export var allChats;
export var openedChat;

const handler = new Handler();

export async function login(login, password) {
    const authRequest = new AuthRequest(login, password, 1);
    const authApi = new AuthApi(handler, authRequest);
    const response = await authApi.auth();
    const data = await response.json();
    const user1 = User.fromJson(data.user)
    const authResponse = new AuthResponse(data.token, user1, data.company, data.admin);
    company = authResponse.company;
    user = authResponse.user;
    handler.token = authResponse.token;
    handler.setToken();
    // connect();
}

export async function users() {
    const data = await handler.getRequest("/company/" + company.id + "/users");
    const jsonArray = await data.json();
    allUsers = jsonArray.map(data => User.fromJson(data));
}

export async function chats() {
    const data = await handler.getRequest("/users/" + user.id + "/chats");
    const jsonArray = await data.json();
    allChats = jsonArray.map(data => Chat.fromJSON(data))
}

export async function openChat(chatId) {
    openedChat = chatId;
    const data = await handler.getRequest("/chats/" + chatId + "/messages")
    const jsonArray = await data.json();
    return jsonArray.map(data => Message.fromJson(data))
}

export async function changeUserInfo(newUser) {
    const response = await handler.putRequest("/users/" + user.id, newUser);
    user = User.fromJson(await response.json());
    return user;
}

export async function changePassword(changePasswordRequest) {
    await handler.putRequest("/auth/user/password", changePasswordRequest);
}

// (async () => {
//     await login("Egorka", "1111");
//     // console.log(await user )
//     // console.log(await openChat(4));
//     await changeUserInfo(new User(user.id, null, "Егоркb", null, null, "8-915-901-56-51", true, "va", null, null));
//     // await changePassword(new ChangePasswordRequest(new AuthRequest("Egorka", "0000"), "1111"));
//     console.log(user)
// })();