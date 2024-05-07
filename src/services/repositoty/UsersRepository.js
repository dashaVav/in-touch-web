import {User} from "../dto/User.js";
import {myCompany, myself} from "./SelfRepository.js";
import {fetchAllUsersOfCompany} from "../api/UsersApi.js";

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



