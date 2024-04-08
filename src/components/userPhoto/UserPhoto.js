import './UserPhoto.css'

export const UserPhoto = ({ text }) => {
    return (
        <div className="user-photo">
            <text className="user-photo-text">{text}</text>
        </div>
    );
};