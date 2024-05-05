import './UserPhoto.css'

export const UserPhoto = ({ text, size, textSize }) => {
    const circleSize = size || 100;
    const sizeOfText = textSize || 30;
    const circleStyles = {
        width: circleSize + 'px',
        height: circleSize + 'px',
    };
    const textStyles = {
        fontSize: sizeOfText + 'px',
    };
    return (
        <div className="user-photo" style={circleStyles}>
            <text className="user-photo-text" style={textStyles}>{text}</text>
        </div>
    );
};