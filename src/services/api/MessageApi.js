import {getRequest, postRequest} from "../utils/Handler.js";
import {Message} from "../dto/Message.js";

export async function fetchAllUsersOfCompany(chatId) {
    return getRequest("/chats/" + chatId + "/messages")
}

export async function sendMessage(text, chatId, selfId) {
    await postRequest("/users/" + selfId + "/chats/" + chatId + "/message", new Message(null, text, null, null));
}