import {Chat} from "../dto/Chat.js";
import {setAllChats} from "../Model.js";
import {myself} from "./SelfRepository.js";
import {getRequest} from "../utils/Handler.js";
import {getListOfUnreadCounters} from "../api/ChatApi.js";

let orderedChats = [];

export async function fetchChats() {
    if (orderedChats.length === 0) {
        const unreadCountList = await getListOfUnreadCounters(myself.id);
        const unreadMap = new Map();
        unreadCountList.map(count => {
            unreadMap.set(count.chatId, count.count);
        });
        const jsonAllChats = await getRequest("/users/" + myself.id + "/chats");
        orderedChats = jsonAllChats.map(data => Chat.fromJSON(data));
        for (let i = 0; i < orderedChats.length; i++) {
            if (unreadMap.has(orderedChats[i].id)){
                orderedChats[i].unreadCount = unreadMap.get(orderedChats[i].id);
            }
        }
        console.log(orderedChats);
    }
    return orderedChats;
}

export function moveUpChat(chat) {
    orderedChats = orderedChats.filter(c => c !== chat);
    orderedChats.unshift(chat);
    setAllChats(orderedChats);
}

export function newChatCreated(chat) {
    orderedChats.push(chat);
    setAllChats(orderedChats);
}

export function getChatById(chatId) {
    return orderedChats.filter(c => c.id === chatId)[0];
}