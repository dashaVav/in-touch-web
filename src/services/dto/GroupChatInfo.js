export class GroupChatInfo {
    constructor(name, creationDate, creator) {
        this.name = name;
        this.creationDate = creationDate;
        this.creator = creator;
    }

    static fromJson(json) {
        return new GroupChatInfo(
            json.name,
            json.creationDate,
            json.creator
        )
    }

}