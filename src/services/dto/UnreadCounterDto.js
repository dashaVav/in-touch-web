export class UnreadCounterDto {
    constructor(chatId, count) {
        this.chatId = chatId;
        this.count = count;
    }

    static fromJson(json) {
        return new UnreadCounterDto(
            json.chatId,
            json.count
        )
    }
}