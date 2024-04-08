export class User {
    constructor(id, username, realName, surname, dateOfBirth, phoneNumber, isOnline, patronymic, profilePhotoId, thumbnailPhotoId) {
        this._id = id;
        this._username = username;
        this._realName = realName;
        this._surname = surname;
        this._dateOfBirth = dateOfBirth;
        this._phoneNumber = phoneNumber;
        this._isOnline = isOnline;
        this._patronymic = patronymic;
        this._profilePhotoId = profilePhotoId;
        this._thumbnailPhotoId = thumbnailPhotoId;
    }
}