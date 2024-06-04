import './MessageCell.css'
import {UserPhoto} from "../userPhoto/UserPhoto.js";
import {user as mySelf} from "../../services/Model.js";
import {baseUrlForFiles} from "../../services/utils/Handler.js";
import {useEffect, useState} from "react";

export const MessageCell = ({ message, style, styleContainer }) => {

    const [scaledWidth, setScaledWidth] = useState(0);
    const [scaledHeight, setScaledHeight] = useState(0);
    const [imgSrc] = useState(baseUrlForFiles + message.attachmentId);

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
            formattedDate = ['sun ', 'mon ', 'tue ', 'wed ', 'thu ', 'fri ', 'sat '][date.getDay()];
        } else {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            formattedDate = `${day}.${month}`;
        }

        return formattedDate;
    }

    useEffect(() => {
        if (message.attachmentId) {
            const img = new Image();
            img.src = baseUrlForFiles + message.attachmentId;

            img.onload = () => {
                const ratioX = 350 / img.width;
                const ratioY = 300 / img.height;
                const ratio = Math.min(ratioX, ratioY);

                const newWidth = Math.round(img.width * ratio);
                const newHeight = Math.round(img.height * ratio);

                setScaledWidth(newWidth);
                setScaledHeight(newHeight);
            };

            return () => {
                // Очистка ресурсов, если необходимо
            };

        }}, [imgSrc]);

    const photo = (message.attachmentId) ?
        <img src={imgSrc} alt="картинка" style={{ width: `${scaledWidth}px`, height: `${scaledHeight}px` }}/> : null

    return (
        <div className="message-cell" style={style}>
            {(message.author.id !== mySelf.id)  &&
                <UserPhoto text={message.author.getInitials()} size={30} textSize={10} thumbnailPhotoId={message.author.thumbnailPhotoId}/>
            }

            <div className="container-mes" style={styleContainer}>
                {photo &&
                    <div className="image-container">
                        {photo}
                    </div>
                }

                <div className="message-text">
                    {message.text}
                </div>

            </div>
            <div className="message-date-time">
                {formatDate(message.dateTime)}
            </div>
        </div>

    );
};