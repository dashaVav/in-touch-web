import {getRequest} from "../utils/Handler.js";

export async function getListOfUnreadCounters(selfId) {
    return getRequest("/users/" + selfId + "/chats/unread");
}