import {user as mySelf} from "../Model.js";
import {User} from "./User.js";
import {GroupChatInfo} from "./GroupChatInfo.js";
import {Message} from "./Message.js";

export class Chat {
    constructor(id, isPrivate, listOfUsers, group, lastMessage, unreadCount) {
        this.id = id;
        this.isPrivate = isPrivate;
        this.members = listOfUsers;
        this.group = group;
        this.lastMessage = lastMessage;
        this.unreadCount = unreadCount;
    }

    getInitials() {
        return (this.isPrivate === false) ? this.group.name.toString().charAt(0).toUpperCase() :
            this.members.filter(u => u.id !== mySelf.id)
                .map(u => u.realName.toString().charAt(0).toUpperCase() + u.surname.toString().charAt(0).toUpperCase())
                .join("");
    }

    getChatName() {
        return (this.isPrivate === false) ? this.group.name.toString() :
            this.members.filter(u => u.id !== mySelf.id)
                .map(u => u.realName.toString() + " " + u.surname.toString()).join("");
    }

    getStatus() {
        return (this.isPrivate) ? this.members.filter(u => u.id !== mySelf.id)
            .map(u => (u.isOnline) ? "online" : "offline") : this.members.length + " members";
    }

    getUserThumbnailPhotoId() {
        return (this.isPrivate) ? this.members.filter(u => u.id !== mySelf.id)
            .map(u => u.thumbnailPhotoId).join("") : this.group.groupPhotoId;
    }

    isUserOnline() {
        return (this.isPrivate) ? (this.members.filter(u => u.id !== mySelf.id).map(u => u.isOnline).join("") === "true") : false;
    }

    static fromJSON(json) {
        return new Chat(
            json.id,
            json.isPrivate,
            json.members.map(data => User.fromJson(data)),
            json.group != null ? GroupChatInfo.fromJson(json.group) : json.group,
            json.lastMessage != null ? Message.fromJson(json.lastMessage) : json.lastMessage,
            json.unreadCount
        );
    }
}