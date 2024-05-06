import './UserPhoto.css'

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

    const imageUrl = (thumbnailPhotoId) ? "http://195.133.196.67:8881/chat_api/v1/download/" + thumbnailPhotoId.toString() : null;

    return (
        <div className="user-photo" style={circleStyles}>
            {!photoImage && !imageUrl && <text className="user-photo-text" style={textStyles}>{text}</text>}
            {imageUrl && !photoImage && <img className="user-photo-img" src={imageUrl} alt="Выбранное изображение" />}
            {photoImage && imageUrl && <img className="user-photo-img" src={photoImage} alt="Выбранное изображение" />}
            {photoImage && !imageUrl && <img className="user-photo-img" src={photoImage} alt="Выбранное изображение" />}
        </div>
    );
};