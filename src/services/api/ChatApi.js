import {getRequest, postRequest, putRequest} from "../utils/Handler.js";

export async function getListOfUnreadCounters(selfId) {
    return getRequest("/users/" + selfId + "/chats/unread");
}

export async function createNewPrivateChat(selfId, userId) {
    return getRequest("/private_chat/" + selfId + "/" + userId);
}

export async function fetchAllChats(userId) {
    return getRequest("/users/" + userId + "/chats");
}

export async function createNewGroupChat(groupRequest) {
    return postRequest("/group_chat", groupRequest);
}

export async function changeGroupName(chatId, changeGroupName) {
    return putRequest("chats/" + chatId + "/group_name", changeGroupName);
}