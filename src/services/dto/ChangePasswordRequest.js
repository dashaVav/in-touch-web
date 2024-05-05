export class ChangePasswordRequest {
    constructor(authRequest, newPassword) {
        this.authRequest = authRequest;
        this.newPassword = newPassword;
    }
}