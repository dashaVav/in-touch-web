import {User} from "../dto/User.js";
import {changePassword, changeUserInfo} from "../api/SelfApi.js";
import {AuthResponse} from "../dto/AuthResponse.js";
import {uploadUserProfilePhoto} from "../api/FileApi.js";


export var myself;
export var myCompany;

export function setMyself(user) {
    myself = user;
}

export function setCompany(company) {
    myCompany = company;
}

export async function changeUserInform(newUser) {
    const newMyself = User.fromJson(await changeUserInfo(myself.id, newUser));
    setMyself(newMyself);
    return newMyself;
}

export async function changeUserPassword(changePasswordRequest) {
    try {
        await AuthResponse.fromJson(await changePassword(changePasswordRequest));
        return "Ok!"
    } catch (e) {
        return "Error!"
    }
}

export async function changeUserProfileProto(formData) {
    await uploadUserProfilePhoto(formData);
}

export function selfRepositoryClear() {
    myself = null;
    myCompany = null;
}