export class AuthRequest {
    constructor(login, password, companyId = 1) {
        this._login = login;
        this._password = password;
        this._companyId = companyId;
    }
    get getLogin() {
        return this._login
    }

    toJSON() {
        return {
            login: this._login,
            password: this._password,
            companyId: this._companyId
        };
    }
}
