import {User} from "./User.js";

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
            json.dateTime,
            new User(json.author),
            json.chatId
        )
    }

    getAuthor() {
        //TODO костыль, возвращает автора
        return this.author.id;
    }
}