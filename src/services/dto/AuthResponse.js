import {Company} from "./Company.js";

export class AuthResponse {
    constructor(token, userData, companyData, isAdmin) {
        this.token = token;
        this.user = userData;
        this.company = new Company(companyData.id, companyData.name);
        this.isAdmin = isAdmin;
    }
}