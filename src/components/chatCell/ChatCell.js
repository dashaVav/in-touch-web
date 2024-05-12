import './ChatCell.css'
import {UserPhoto} from "../userPhoto/UserPhoto.js";

export const ChatCell = ({ chat, onClicked  }) => {

    function formatDate(dateString) {
        if (dateString === "no date") {
            return dateString;
        }

        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const diffInSeconds = Math.floor(diff / 1000);
        const daysPassed = Math.floor(diffInSeconds / (60 * 60 * 24));

        let formattedDate;
        if (daysPassed < 1) {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            formattedDate = `${hours}:${minutes}`;
        } else if (daysPassed < 7) {
            formattedDate = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][date.getDay()];
        } else {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            formattedDate = `${day}.${month}`;
        }

        return formattedDate;
    }

    const curChat = chat;

    const lastMessage = (chat.lastMessage) ?
        (chat.lastMessage.text.toString().length > 40 ? chat.lastMessage.text.toString().substring(0, 40) + " ..."
            : chat.lastMessage.text.toString()) : "no messages";

    const lastMesDate = (chat.lastMessage) ? chat.lastMessage.dateTime.toString() : "no date";

    const unreadCount = (chat.unreadCount) ? chat.unreadCount.toString() : "";

    return (
        <div className="chat-cell" onClick={onClicked}>
            <div className="chat-cell-container">
                <div className="simple-container">
                    <UserPhoto text={curChat.getInitials()} size={60} textSize={16} thumbnailPhotoId={curChat.getUserThumbnailPhotoId()}/>
                    <div className="online-circle" style={(curChat.isUserOnline()) ? {backgroundColor: "#3E46FF"} : {backgroundColor: "transparent"}}></div>
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
                        {formatDate(lastMesDate)}
                    </text>
                    <text className="unread-count-text">
                        {unreadCount}
                    </text>
                </div>
            </div>
            <div typeof="rectangle" className="divider"/>
        </div>
    );
};