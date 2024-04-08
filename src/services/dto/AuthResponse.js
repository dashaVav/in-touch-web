import {User} from "./User.js";
import {Company} from "./Company.js";

export class AuthResponse {
    constructor(token, userData, companyData, isAdmin) {
        this._token = token;
        this.user = new User(
            userData.id,
            userData.username,
            userData.realName,
            userData.surname,
            userData.dateOfBirth,
            userData.phoneNumber,
            userData.isOnline,
            userData.patronymic,
            userData.profilePhotoId,
            userData.thumbnailPhotoId
        );
        this._company = new Company(companyData.id, companyData.name);
        this._isAdmin = isAdmin;
    }
}