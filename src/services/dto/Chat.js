import {user as mySelf} from "../main.js";

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
}