import {Parse} from "../utils/Parse.js";

export class GroupChatInfo {
    constructor(name, creationDate, creator) {
        this.name = name;
        this.creationDate = creationDate;
        this.creator = creator;
    }

    static fromJson(json) {
        return new GroupChatInfo(
            json.name,
            Parse.date(json.creationDate),
            json.creator
        )
    }

}