import {getRequest, putRequest, setToken} from "./utils/Handler.js"
import {AuthRequest} from "./dto/AuthRequest.js";
import {AuthResponse} from "./dto/AuthResponse.js";
import {User} from "./dto/User.js";
import {Message} from "./dto/Message.js";
import {connect} from "./api/StopmSession.js";
import {fetchChats} from "./repositoty/ChatRepository.js";
import {setCompany, setMyself} from "./repositoty/SelfRepository.js";
import {auth} from "./api/AuthApi.js";
import {getAllUsers} from "./repositoty/UsersRepository.js";

export var user;
export var company;
export var allUsers;
export var allChats;
export var openedChat;
export var openedChatMessages;

export function setAllChats(chats) {
    allChats = chats;
}

export async function login(login, password) {
    const authRequest = new AuthRequest(login, password, 1);
    const data = await auth(authRequest);
    const user1 = User.fromJson(data.user)
    const authResponse = new AuthResponse(data.token, user1, data.company, data.admin);
    company = authResponse.company;
    user = await authResponse.user;
    setToken(authResponse.token);

    await connect();
    setMyself(await user);
    setCompany(await company);

    await chats();
}

export async function users() {
    allUsers = await getAllUsers();
}

export async function chats() {
    allChats = await fetchChats();
    // const data = await handler.getRequest("/users/" + user.id + "/chats");
    // const jsonArray = await data.json();
    // allChats = jsonArray.map(data => Chat.fromJSON(data))
}

export async function openChat(chatId) {
    openedChat = chatId;
    const jsonArray = await getRequest("/chats/" + chatId + "/messages");
    openedChatMessages = jsonArray.map(data => Message.fromJson(data));
    return openedChatMessages;
}

export async function changeUserInfo(newUser) {
    user = User.fromJson(await putRequest("/users/" + user.id, newUser));
    return user;
}

export async function changePassword(changePasswordRequest) {
    await putRequest("/auth/user/password", changePasswordRequest);
}