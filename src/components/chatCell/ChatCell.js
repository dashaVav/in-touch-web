import './ChatCell.css'
import {UserPhoto} from "../userPhoto/UserPhoto.js";

export const ChatCell = ({ chat, onClicked  }) => {

    const curChat = chat;

    const lastMessage = (chat.lastMessage) ? chat.lastMessage.text.toString() : "no messages";

    const lastMesDate = (chat.lastMessage) ? chat.lastMessage.dateTime.toString() : "no date";

    const unreadCount = (chat.unreadCount) ? chat.unreadCount.toString() : "";

    return (
        <div className="chat-cell" onClick={onClicked}>
            <div className="simple-container">
                <UserPhoto text={curChat.getInitials()} size={60} textSize={16}/>
                <div className="text-container">
                    <text className="chat-name">
                        {curChat.getChatName()}
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