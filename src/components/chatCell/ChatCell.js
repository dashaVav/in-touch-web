import './ChatCell.css'
import {UserPhoto} from "../userPhoto/UserPhoto.js";
import {user as mySelf} from "../../services/main.js";

export const ChatCell = ({ chat, onClicked  }) => {

    const initials = (chat.isPrivate === false) ? chat.group.name.toString().charAt(0).toUpperCase() :
            chat.members.filter(u => u.id !== mySelf.id)
                .map(u => u.realName.toString().charAt(0).toUpperCase() + u.surname.toString().charAt(0).toUpperCase())
                .join("")

    const chatName = (chat.isPrivate === false) ? chat.group.name.toString() :
            chat.members.filter(u => u.id !== mySelf.id)
                .map(u => u.realName.toString() + " " + u.surname.toString()).join("")

    const lastMessage = (chat.lastMessage) ? chat.lastMessage.text.toString() : "no messages";

    const lastMesDate = (chat.lastMessage) ? chat.lastMessage.dateTime.toString() : "no date";

    const unreadCount = chat.unreadCount.toString();

    return (
        <div className="chat-cell" onClick={onClicked}>
            <div className="simple-container">
                <UserPhoto text={initials} size={70} textSize={20}/>
                <div className="text-container">
                    <text className="chat-name">
                        {chatName}
                    </text>
                    <text className="last-message-text">
                        {lastMessage}
                    </text>
                </div>
            </div>
            <div className="chat-data-container">
                <text className="date">
                    {lastMesDate}
                </text>
                <text className="unread-count-text">
                    {unreadCount}
                </text>
            </div>
        </div>
    );
};