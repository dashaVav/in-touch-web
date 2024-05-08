import {setToken} from "./utils/Handler.js"
import {AuthRequest} from "./dto/AuthRequest.js";
import {AuthResponse} from "./dto/AuthResponse.js";
import {Message} from "./dto/Message.js";
import {connect, sendReadChatSignal} from "./api/StopmSession.js";
import {
    addUserToChat,
    changeGroupNameInfo, chatRepositoryClear,
    createGroupChat,
    createNewDialog, editPhoto,
    fetchChats,
    getChatById,
    moveUpChat,
    newChatCreated, removeUserFromChat
} from "./repositoty/ChatRepository.js";
import {
    changeUserInform,
    changeUserPassword,
    changeUserProfileProto, selfRepositoryClear,
    setCompany,
    setMyself
} from "./repositoty/SelfRepository.js";
import {auth} from "./api/AuthApi.js";
import {getAllUsers, userRepositoryClear} from "./repositoty/UsersRepository.js";
import {
    acceptNewMessageFromOtherUser,
    getMessagesOfChat,
    messageRepositoryClear,
    sendMessageToChat
} from "./repositoty/MessageRepository.js";
import {Chat} from "./dto/Chat.js";
import {ReadNotification} from "./dto/ReadNotification.js";
import {uploadFile} from "./api/FileApi.js";

export var user;
export var company;
export var allUsers;
export var allChats;
export var openedChat;
export var openedChatMessages = [];

export function setAllChats(chats) {
    allChats = chats;
    notifyComponent("getNewMessage");
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
    sendReadChatSignal(new ReadNotification(user.id, openedChat));
    getChatById(chatId).unreadCount = 0;
    openedChatMessages = await getMessagesOfChat(chatId);
    return openedChatMessages;
}

export async function createDialogFromAllUsers(userId) {
    return await createNewDialog(userId);
}

export async function createNewGroupChat(groupRequest) {
    return await createGroupChat(groupRequest);
}

export async function editGroupChatName(chatId, changeGroupName) {
    await changeGroupNameInfo(chatId, changeGroupName)
}

export async function changeUserInfo(newUser) {
    user = await changeUserInform(newUser);
    return user;
}

export async function changePassword(changePasswordRequest) {
    return await changeUserPassword(changePasswordRequest);
}

export async function sendMessage(text, file) {
    let fileId;
    if (file !== undefined) {
        fileId = await (await uploadFile(file)).text();
    }
    sendMessageToChat(text, openedChat, await fileId);
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

export async function acceptNewChat(payload) {
    const chat = Chat.fromJSON(payloadToJson(payload));
    newChatCreated(chat);
}

export function payloadToJson(payload) {
    return JSON.parse(payload.body);
}

export async function editUserPhoto(file) {
    await changeUserProfileProto(file);
}

export async function addUserToGroupChat(userId) {
    await addUserToChat(openedChat, userId);
}

export async function removeUserFromGroupChat(userId) {
    await removeUserFromChat(openedChat, userId);
}

export async function editGroupChatPhoto(formData) {
    await editPhoto(openedChat, formData);
    notifyComponent("getNewMessage");
}

export function logout() {
    chatRepositoryClear();
    messageRepositoryClear();
    selfRepositoryClear();
    userRepositoryClear()
}