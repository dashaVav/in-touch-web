import {Message} from "../dto/Message.js";
import {fetchMessages, sendMessage} from "../api/MessageApi.js";
import {myself} from "./SelfRepository.js";

const messagesByChatId = new Map();

export async function acceptNewMessageFromOtherUser(message) {
    if (messagesByChatId.has(message.chatId)) {
        messagesByChatId.get(message.chatId).push(message);
    } else {
        await getMessagesOfChat(message.chatId);
    }
}

export async function getMessagesOfChat(chatId) {
    if (!messagesByChatId.has(chatId)) {
        const jsonArray = await fetchMessages(chatId);
        messagesByChatId.set(chatId, await jsonArray.map(data => Message.fromJson(data)));
    }
    return messagesByChatId.get(chatId);
}

export function sendMessageToChat(text, chatId, fileId) {
    sendMessage(text, chatId, myself.id, fileId);
}

export function messageRepositoryClear() {
    messagesByChatId.clear();
}