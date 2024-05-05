import {getRequest} from "../utils/Handler.js";

export async function getListOfUnreadCounters(selfId) {
    return getRequest("/users/" + selfId + "/chats/unread");
}

export async function createNewPrivateChat(selfId, userId) {
    return getRequest("/private_chat/" + selfId + "/" + userId);
}