import './UserPhoto.css'
import {baseUrlForFiles} from "../../services/utils/Handler.js";

export const UserPhoto = ({ text, size, textSize, photo, thumbnailPhotoId}) => {
    const circleSize = size || 100;
    const sizeOfText = textSize || 30;
    const circleStyles = {
        width: circleSize + 'px',
        height: circleSize + 'px',
    };
    const textStyles = {
        fontSize: sizeOfText + 'px',
    };

    const photoImage = (photo) ? photo : null

    const imageUrl = (thumbnailPhotoId) ? baseUrlForFiles + thumbnailPhotoId.toString() : null;

    return (
        <div className="user-photo" style={circleStyles}>
            {!photoImage && !imageUrl && <text className="user-photo-text" style={textStyles}>{text}</text>}
            {imageUrl && !photoImage && <img className="user-photo-img" src={imageUrl} alt="Выбранное изображение" />}
            {photoImage && imageUrl && <img className="user-photo-img" src={photoImage} alt="Выбранное изображение" />}
            {photoImage && !imageUrl && <img className="user-photo-img" src={photoImage} alt="Выбранное изображение" />}
        </div>
    );
};