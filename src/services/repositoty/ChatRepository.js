import {Chat} from "../dto/Chat.js";
import {handler, setAllChats} from "../Model.js";
import {myself} from "./SelfRepository.js";


var chatsById = {}
var orderedChats = []

export async function fetchChats() {
    if (orderedChats.length === 0) {
        const jsonAllChats = await (await handler.getRequest("/users/" + myself.id + "/chats")).json();
        orderedChats = jsonAllChats.map(data => Chat.fromJSON(data));
        return orderedChats;
    } else {
        return orderedChats;
    }
}

export function moveUpChat(chat) {
    orderedChats = orderedChats.filter(c => c !== chat);
    orderedChats.unshift(chat);
    setAllChats(chat);
}

export function getChatById(chatId) {
    return orderedChats.filter(c => c.id === chatId)[0];
}