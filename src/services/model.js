import {Handler} from "./utils/Handler.js";
import {AuthApi} from "./api/AuthApi.js";
import {AuthRequest} from "./dto/AuthRequest.js";
import {AuthResponse} from "./dto/AuthResponse.js";
import {User} from "./dto/User.js";
import {Chat} from "./dto/Chat.js";
import {Message} from "./dto/Message.js";

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
}

export async function users() {
    const data = await handler.getRequest("/chat_api/v1/company/" + company.id + "/users");
    const jsonArray = await data.json();
    allUsers = jsonArray.map(data => User.fromJson(data));
}

export async function chats() {
    const data = await handler.getRequest("/chat_api/v1/users/" + user.id + "/chats");
    const jsonArray = await data.json();
    allChats = jsonArray.map(data => Chat.fromJSON(data))
}

export async function openChat(chatId) {
    openedChat = chatId;
    const data = await handler.getRequest("/chat_api/v1/chats/" + chatId + "/messages")
    const jsonArray = await data.json();
    return jsonArray.map(data => Message.fromJson(data))
}


// (async () => {
//     await login("Egorka", "1111");
//     await chats();
//     console.log(allChats);
//     console.log(await openChat(15));
// })();