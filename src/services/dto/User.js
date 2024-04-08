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

    getId() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }

    getRealName() {
        return this.realName;
    }

    getSurname() {
        return this.surname;
    }

    getDateOfBirth() {
        return this.dateOfBirth;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    getIsOnline() {
        return this.isOnline;
    }

    getPatronymic() {
        return this.patronymic;
    }

    getProfilePhotoId() {
        return this.profilePhotoId;
    }

    getThumbnailPhotoId() {
        return this.thumbnailPhotoId;
    }
}