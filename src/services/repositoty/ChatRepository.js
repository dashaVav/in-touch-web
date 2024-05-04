import {Chat} from "../dto/Chat.js";
import {setAllChats} from "../Model.js";
import {myself} from "./SelfRepository.js";
import {getRequest} from "../utils/Handler.js";


var chatsById = {}
var orderedChats = []

export async function fetchChats() {
    if (orderedChats.length === 0) {
        const jsonAllChats = await getRequest("/users/" + myself.id + "/chats");
        orderedChats = jsonAllChats.map(data => Chat.fromJSON(data));

    }
    return orderedChats;

}

export function moveUpChat(chat) {
    orderedChats = orderedChats.filter(c => c !== chat);
    orderedChats.unshift(chat);
    setAllChats(orderedChats);
}

export function newChatCreated(chat) {
    setAllChats(orderedChats);
}

export function getChatById(chatId) {
    return orderedChats.filter(c => c.id === chatId)[0];
}