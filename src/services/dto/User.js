import {Parse} from "../utils/Parse.js";

export class User {
    constructor(id, username, realName, surname, dateOfBirth, phoneNumber, isOnline, patronymic, profilePhotoId, thumbnailPhotoId) {
        this.id = id;
        this.username = username;
        this.realName = realName;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.isOnline = isOnline;
        this.patronymic = patronymic;
        this.profilePhotoId = profilePhotoId;
        this.thumbnailPhotoId = thumbnailPhotoId;
    }

    getInitials() {
        return (this.realName == null || this.surname == null) ? "-" :
            this.realName.toString().charAt(0).toUpperCase() + this.surname.toString().charAt(0).toUpperCase();
    }

    getRealName = () => {
        return (this.surname != null ? this.surname : "-") + " " +
            (this.realName != null ? this.realName : "-")  + " " +
            (this.patronymic != null ? this.patronymic : "-") ;
    }

    static fromJson(json) {
        return new User(
            json.id,
            json.username,
            json.realName,
            json.surname,
            Parse.dateOfBirth(json.dateOfBirth),
            json.phoneNumber,
            json.isOnline,
            json.patronymic,
            json.profilePhotoId,
            json.thumbnailPhotoId
        )
    }
}