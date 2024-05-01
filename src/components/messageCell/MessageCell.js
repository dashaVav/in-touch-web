import './MessageCell.css'
import {UserPhoto} from "../userPhoto/UserPhoto.js";
import {user as mySelf} from "../../services/model.js";

export const MessageCell = ({ message, style, styleContainer }) => {

    function formatDate(dateString) {
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

    return (
        <div className="message-cell" style={style}>
            {(message.author.id !== mySelf.id)  &&
                <UserPhoto text={message.author.getInitials()} size={30} textSize={10}/>
            }

            <div className="container-mes" style={styleContainer}>
                <div className="message-text">
                    {message.text}
                </div>
                <div className="message-date-time">
                    {formatDate(message.dateTime)}
                </div>
            </div>
        </div>
    );
};