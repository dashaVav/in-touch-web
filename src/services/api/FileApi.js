import {postResourceRequest} from "../utils/Handler.js";
import {myself} from "../repositoty/SelfRepository.js";

export async function uploadUserProfilePhoto(formData) {
    return postResourceRequest("/users/" + myself.id + "/profile_photo", formData);
}

export async function uploadFile(formData) {
    return postResourceRequest("/upload", formData);
}

export async function uploadGroupChatPhoto(chatId, formData) {
    return postResourceRequest("/chats/" + chatId + "/group_photo", formData);
}
