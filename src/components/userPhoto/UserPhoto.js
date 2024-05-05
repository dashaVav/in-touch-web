import './UserPhoto.css'

export const UserPhoto = ({ text, size, textSize, photo }) => {
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

    return (
        <div className="user-photo" style={circleStyles}>
            {!photoImage && <text className="user-photo-text" style={textStyles}>{text}</text>}
            {photoImage && <img className="user-photo-img" src={photoImage} alt="Выбранное изображение" />}
        </div>
    );
};