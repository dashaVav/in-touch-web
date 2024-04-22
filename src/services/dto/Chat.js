export class Chat {
    constructor(id, isPrivate, listOfUsers, group, lastMessage, unreadCount) {
        this.id = id;
        this.isPrivate = isPrivate;
        this.members = listOfUsers;
        this.group = group;
        this.lastMessage = lastMessage;
        this.unreadCount = unreadCount;
    }
}