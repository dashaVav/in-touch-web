import {User} from "../dto/User.js";
import {myCompany, myself} from "./SelfRepository.js";
import {fetchAllUsersOfCompany} from "../api/UsersApi.js";

let allUsers = [];

export async function getAllUsers() {
    if (allUsers.length === 0) {
        const jsonArray = await fetchAllUsersOfCompany(myCompany.id);
        allUsers = jsonArray.map(data => User.fromJson(data)).filter(user => JSON.stringify(user) !== JSON.stringify(myself));
    }
    return allUsers;
}

function map(classT, json) {

}



