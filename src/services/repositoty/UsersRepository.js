import {User} from "../dto/User.js";
import {myCompany, myself} from "./SelfRepository.js";
import {fetchAllUsersOfCompany} from "../api/UsersApi.js";
import {byUserName, processingSearchString} from "../utils/Search.js";

let allUsers = [];

export async function getAllUsers() {
    if (allUsers.length === 0) {
        const jsonArray = await fetchAllUsersOfCompany(myCompany.id);
        allUsers = jsonArray.map(data => User.fromJson(data)).filter(user => user.id !== myself.id);
    }
    return allUsers;
}

export function userRepositoryClear() {
    allUsers.length = 0;
}

export function updateConnectStatusForUsers(userId, status) {
    allUsers.forEach(user => {
        if (user.id === userId) {
            user.isOnline = status;
        }
    });
}

export function searchUsers(request) {
    return allUsers.filter(user => byUserName(user, processingSearchString(request)));
}
