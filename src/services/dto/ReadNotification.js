export class ReadNotification {
    constructor(userId, chatId) {
        this.userId = userId;
        this.chatId = chatId;
    }

    static fromJson(json) {
        return new ReadNotification(
            json.userId,
            json.chatId
        )
    }
}