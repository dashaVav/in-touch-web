import './MessageCell.css'
import {UserPhoto} from "../userPhoto/UserPhoto.js";
import {user as mySelf} from "../../services/model.js";

export const MessageCell = ({ message, style, styleContainer }) => {

    const author = message.getAuthor();
    //TODO костыль, внизу в UserPhoto олучаем инициалы тут, а не через User, из-за ошибки в маппинге
    return (
        <div className="message-cell" style={style}>
            {(author.id !== mySelf.id)  &&
                <UserPhoto text={(author.realName == null || author.surname == null) ? "-" :
                author.realName.toString().charAt(0).toUpperCase() +
                author.surname.toString().charAt(0).toUpperCase()} size={30} textSize={10}/>
            }

            <div className="container-mes" style={styleContainer}>
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