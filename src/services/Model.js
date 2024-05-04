import {setToken} from "./utils/Handler.js"
import {AuthRequest} from "./dto/AuthRequest.js";
import {AuthResponse} from "./dto/AuthResponse.js";
import {Message} from "./dto/Message.js";
import {connect} from "./api/StopmSession.js";
import {fetchChats, getChatById, moveUpChat} from "./repositoty/ChatRepository.js";
import {changeUserInform, changeUserPassword, setCompany, setMyself} from "./repositoty/SelfRepository.js";
import {auth} from "./api/AuthApi.js";
import {getAllUsers} from "./repositoty/UsersRepository.js";
import {acceptNewMessageFromOtherUser, getMessagesOfChat, sendMessageToChat} from "./repositoty/MessageRepository.js";

export var user;
export var company;
export var allUsers;
export var allChats;
export var openedChat;
export var openedChatMessages = [];

export function setAllChats(chats) {
    allChats = chats;
}



export async function login(login, password) {
    const authRequest = new AuthRequest(login, password, 1);
    const data = await auth(authRequest)
    const authResponse = AuthResponse.fromJson(data);
    company = authResponse.company;
    user = authResponse.user;
    setToken(authResponse.token);

    await connect();
    setMyself(user);
    setCompany(company);


    await chats();
    await users();
}

export async function users() {
    allUsers = await getAllUsers();
}


export async function chats() {
    allChats = await fetchChats();
}

export async function openChat(chatId) {
    openedChat = chatId;
    openedChatMessages = await getMessagesOfChat(chatId);
    return openedChatMessages;
}

export async function changeUserInfo(newUser) {
    user = await changeUserInform(newUser);
    return user;
}

//тут статус смены пароля - строка
export async function changePassword(changePasswordRequest) {
    return await changeUserPassword(changePasswordRequest);
}

export function sendMessage(text) {
    sendMessageToChat(text, openedChat);
}

function notifyComponent(typeName) {
    const event = new CustomEvent(typeName);
    window.dispatchEvent(event);
}

export async function acceptNewMessage(payload) {
    const message = Message.fromJson(payloadToJson(payload));
    getChatById(message.chatId).lastMessage = message;
    if (message.chatId === openedChat) {
        await acceptNewMessageFromOtherUser(message);
        openedChatMessages.push(message);
        moveUpChat(getChatById(message.chatId));
    } else {
        const chat = getChatById(message.chatId);
        chat.unreadCount = isNaN(chat.unreadCount) ? 1 : chat.unreadCount + 1;
        moveUpChat(chat);
    }
    notifyComponent("getNewMessage");
}

function payloadToJson(payload) {
    return JSON.parse(payload.body);
}