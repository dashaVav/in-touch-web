import {setToken} from "./utils/Handler.js"
import {AuthRequest} from "./dto/AuthRequest.js";
import {AuthResponse} from "./dto/AuthResponse.js";
import {Message} from "./dto/Message.js";
import {connect, disconnectSocketSession, sendReadChatSignal} from "./api/StopmSession.js";
import {
    addUserToChat,
    changeGroupNameInfo,
    chatRepositoryClear,
    createGroupChat,
    createNewDialog,
    editPhoto,
    fetchChats,
    getChatById,
    moveUpChat,
    newChatCreated,
    removeChat,
    removeUserFromChat,
    searchChats,
    updateConnectStatusForUsersInChats
} from "./repositoty/ChatRepository.js";
import {
    changeUserInform,
    changeUserPassword,
    changeUserProfileProto,
    selfRepositoryClear,
    setCompany,
    setMyself
} from "./repositoty/SelfRepository.js";
import {auth} from "./api/AuthApi.js";
import {
    getAllUsers,
    searchUsers,
    updateConnectStatusForUsers,
    userRepositoryClear
} from "./repositoty/UsersRepository.js";
import {
    acceptNewMessageFromOtherUser,
    getMessagesOfChat,
    messageRepositoryClear,
    sendMessageToChat
} from "./repositoty/MessageRepository.js";
import {Chat} from "./dto/Chat.js";
import {ReadNotification} from "./dto/ReadNotification.js";
import {uploadFile} from "./api/FileApi.js";
import {ConnectEvent} from "./dto/ConnectEvent.js";

export var user;
export var company;
export var allUsers = [];
export var allChats = [];
export var openedChat;
export var openedChatMessages = [];

export function setAllChats(chats) {
    allChats = chats;
    notifyComponent("updateChatList");
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

    chats();
    users();
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
    const chat = await changeGroupNameInfo(chatId, changeGroupName);
    console.log("CHANGING INFO")
    notifyComponent("getNewMessage");
    // notifyComponent("updateChatInfo");
    return chat;
}

export async function changeUserInfo(newUser) {
    user = await changeUserInform(newUser);
    return user;
}

export async function changePassword(changePasswordRequest) {
    return await changeUserPassword(changePasswordRequest);
}

export async function sendMessage(openedChat, text, file) {
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
    await acceptNewMessageFromOtherUser(message);
    const chat = getChatById(message.chatId);
    if (message.chatId === openedChat) {
        sendReadChatSignal(new ReadNotification(user.id, openedChat));
        notifyComponent("getNewMessage");
    } else {
        if (message.author.id !== user.id) {
            chat.unreadCount = isNaN(chat.unreadCount) ? 1 : chat.unreadCount + 1;
        }
    }
    moveUpChat(chat);
    // notifyComponent("updateChatList");
}

export async function acceptNewChat(payload) {
    const chat = Chat.fromJSON(payloadToJson(payload));
    newChatCreated(chat);
}

export function payloadToJson(payload) {
    return JSON.parse(payload.body);
}

export async function editUserPhoto(file) {
    user = await changeUserProfileProto(file);
}

export async function addUserToGroupChat(userId) {
    return await addUserToChat(openedChat, userId);
    // notifyComponent("updateChatInfo");
}

export async function removeUserFromGroupChat(userId) {
    const chat = await removeUserFromChat(openedChat, userId);
    if (userId === user.id) {
        removeChat(openedChat);
    } else {
        // notifyComponent("updateChatInfo");
    }
    return chat;
}

export async function editGroupChatPhoto(formData) {
    // notifyComponent("updateChatInfo");
    return await editPhoto(openedChat, formData);
}

export function logout() {
    chatRepositoryClear();
    messageRepositoryClear();
    selfRepositoryClear();
    userRepositoryClear()
    disconnectSocketSession()
}

export function closeChat() {
    openedChat = undefined;
}

export function acceptNewConnectionEvent(payload) {
    const newConnect = ConnectEvent.fromJson(payloadToJson(payload));
    updateConnectStatusForUsersInChats(newConnect.userId, newConnect.connect);
    notifyComponent("updateChatList");
    updateConnectStatusForUsers(newConnect.userId, newConnect.connect);
    notifyComponent("updateUserList");
}

export async function searchUsersAtViewAllUsers(request) {
    if (request === "" || request === null) {
        await users();
    } else {
        allUsers = searchUsers(request);
    }
    notifyComponent("updateUserList");
}

export async function searchChatsAtViewAllChats(request) {
    if (request === "" || request === null) {
        await chats();
    } else {
        allChats = searchChats(request);
    }
    notifyComponent("updateChatList");
}