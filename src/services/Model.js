import {Handler} from "./utils/Handler.js";
import {AuthApi} from "./api/AuthApi.js";
import {AuthRequest} from "./dto/AuthRequest.js";
import {AuthResponse} from "./dto/AuthResponse.js";
import {User} from "./dto/User.js";
import {Message} from "./dto/Message.js";
import {connect} from "./StopmSession.js";
import {fetchChats} from "./repositoty/ChatRepository.js";
import {setMyself} from "./repositoty/SelfRepository.js";


export var user;
export var company;
export var allUsers;
export var allChats;
export var openedChat;
export var openedChatMessages;

export const handler = new Handler();

export function setAllChats(chats) {
    allChats = chats;
}

export async function login(login, password) {
    const authRequest = new AuthRequest(login, password, 1);
    const authApi = new AuthApi(handler, authRequest);
    const response = await authApi.auth();
    const data = await response.json();
    const user1 = User.fromJson(data.user)
    const authResponse = new AuthResponse(data.token, user1, data.company, data.admin);
    company = authResponse.company;
    user = await authResponse.user;
    handler.token = authResponse.token;
    handler.setToken();

    await connect();
    setMyself(user);

    await chats();
}

export async function users() {
    const data = await handler.getRequest("/company/" + company.id + "/users");
    const jsonArray = await data.json();
    allUsers = jsonArray.map(data => User.fromJson(data));
}

export async function chats() {
    allChats = await fetchChats();
    // const data = await handler.getRequest("/users/" + user.id + "/chats");
    // const jsonArray = await data.json();
    // allChats = jsonArray.map(data => Chat.fromJSON(data))
}

export async function openChat(chatId) {
    openedChat = chatId;
    const data = await handler.getRequest("/chats/" + chatId + "/messages")
    const jsonArray = await data.json();
    openedChatMessages = jsonArray.map(data => Message.fromJson(data));
    return openedChatMessages;
}

export async function changeUserInfo(newUser) {
    const response = await handler.putRequest("/users/" + user.id, newUser);
    user = User.fromJson(await response.json());
    return user;
}

export async function changePassword(changePasswordRequest) {
    await handler.putRequest("/auth/user/password", changePasswordRequest);
}
