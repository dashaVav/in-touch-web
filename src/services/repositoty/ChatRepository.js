import {Chat} from "../dto/Chat.js";
import {setAllChats} from "../Model.js";
import {myself} from "./SelfRepository.js";
import {
    addUser,
    changeGroupName,
    createNewGroupChat,
    createNewPrivateChat,
    fetchAllChats,
    getListOfUnreadCounters,
    removeUser
} from "../api/ChatApi.js";
import {uploadGroupChatPhoto} from "../api/FileApi.js";

let orderedChats = [];

export async function fetchChats() {
    if (orderedChats.length === 0) {
        const unreadCountList = await getListOfUnreadCounters(myself.id);
        const unreadMap = new Map();
        unreadCountList.map(count => {
            unreadMap.set(count.chatId, count.count);
        });
        const jsonAllChats = await fetchAllChats(myself.id);
        orderedChats = jsonAllChats.map(data => Chat.fromJSON(data));
        for (let i = 0; i < orderedChats.length; i++) {
            if (unreadMap.has(orderedChats[i].id)) {
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

export async function createNewDialog(userId) {
    return Chat.fromJSON(await createNewPrivateChat(myself.id, userId));
}

export async function createGroupChat(groupRequest) {
    return Chat.fromJSON(await createNewGroupChat(groupRequest));
}

function updateChat(chat) {
    for (let i = 0; i < orderedChats.length; i++) {
        if (orderedChats[i].id === chat.id) {
            orderedChats[i] = chat;
        }
    }
    setAllChats(orderedChats);
}

export async function changeGroupNameInfo(chatId, changeGroupName1) {
    const chat = Chat.fromJSON(await changeGroupName(chatId, changeGroupName1));
    updateChat(chat);
}

export async function addUserToChat(chatId, userId) {
    const chat = Chat.fromJSON(await addUser(chatId, userId));
    updateChat(chat);
}

export async function removeUserFromChat(chatId, userId) {
    const chat = Chat.fromJSON(await removeUser(chatId, userId));
    updateChat(chat);
}

export async function editPhoto(chatId, formData) {
    const chat = Chat.fromJSON(await (await uploadGroupChatPhoto(chatId, formData)).json());
    updateChat(chat);
}

export function chatRepositoryClear() {
    orderedChats.length = 0;
}