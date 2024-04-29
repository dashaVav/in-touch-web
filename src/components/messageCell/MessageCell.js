import './MessageCell.css'
import {UserPhoto} from "../userPhoto/UserPhoto.js";

export const MessageCell = ({ message, style }) => {

    return (
        <div className="message-cell" style={style}>
            <UserPhoto text={message.author.getInitials()} size={30} textSize={10}/>
            <div>
                <div className="message-text">
                    {message.text}
                </div>
                <div className="message-date-time">
                    {message.dateTime}
                </div>
            </div>
        </div>
    );
};