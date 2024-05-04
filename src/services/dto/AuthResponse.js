import {Company} from "./Company.js";
import {User} from "./User.js";

export class AuthResponse {
    constructor(token, userData, companyData, isAdmin) {
        this.token = token;
        this.user = userData;
        this.company = companyData;
        this.isAdmin = isAdmin;
    }

    static fromJson(json) {
        return new AuthResponse(
            json.token,
            User.fromJson(json.user),
            Company.fromJson(json.company),
            json.isAdmin
        )
    }
}