export class ConnectEvent {
    constructor(userId, connect) {
        this.userId = userId;
        this.connect = connect;
    }

    static fromJson(json) {
        return new ConnectEvent(
            json.userId,
            json.connect
        )
    }
}