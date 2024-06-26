import {User} from "./User.js";
import {Parse} from "../utils/Parse.js";

export class Message {
    constructor(id, text, dateTime, author, chatId,isAuxiliary, attachmentId) {
        this.id = id;
        this.text = text;
        this.dateTime = dateTime;
        this.author = author;
        this.chatId = chatId;
        this.isAuxiliary = isAuxiliary;
        this.attachmentId = attachmentId;
    }

    static fromJson(json) {
        return new Message(
            json.id,
            json.text,
            Parse.date(json.dateTime),
            json.author !== null ? User.fromJson(json.author) : null,
            json.chatId,
            json.isAuxiliary,
            json.attachmentId
        )
    }
}