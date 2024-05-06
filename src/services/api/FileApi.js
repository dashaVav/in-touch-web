import {postResourceRequest} from "../utils/Handler.js";
import {myself} from "../repositoty/SelfRepository.js";

export async function uploadUserProfilePhoto(formData) {
    await postResourceRequest("/users/" + myself.id + "/profile_photo", formData);
}