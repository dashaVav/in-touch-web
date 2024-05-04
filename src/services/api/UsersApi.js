import {getRequest} from "../utils/Handler.js";

export async function fetchAllUsersOfCompany(companyId) {
    return getRequest("/company/" + companyId + "/users");
}