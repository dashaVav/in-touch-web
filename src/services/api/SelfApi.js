import {putRequest} from "../utils/Handler.js";

export async function changeUserInfo(userId, newUser) {
    return putRequest("/users/" + userId, newUser)
}

export async function changePassword(changePasswordRequest) {
    return putRequest("/auth/user/password", changePasswordRequest);
}
