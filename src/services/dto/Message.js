import {User} from "./User.js";
import {Parse} from "../utils/Parse.js";

export class Message {
    constructor(id, text, dateTime, author, chatId) {
        this.id = id;
        this.text = text;
        this.dateTime = dateTime;
        this.author = author;
        this.chatId = chatId;
    }

    static fromJson(json) {
        return new Message(
            json.id,
            json.text,
            Parse.date(json.dateTime),
            User.fromJson(json.author),
            json.chatId
        )
    }
}