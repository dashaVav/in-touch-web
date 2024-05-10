import './UserCell.css'
import {UserPhoto} from "../userPhoto/UserPhoto.js";

export const UserCell = ({ user, onClicked  }) => {

    return (
        <div className="user-cell">
            <div className="simple-container" onClick={onClicked}>
                <UserPhoto className="user-cell-photo" text={user.getInitials()} size={60} textSize={16} thumbnailPhotoId={user.thumbnailPhotoId}/>
                <div className="online-circle" style={(user.isOnline) ? {backgroundColor: "#3E46FF"} : {backgroundColor: "transparent"}}></div>
                <div className="text-container">
                    <text className="real-user-name">
                        {(user.realName == null ? "- " : user.realName + " ") + (user.surname == null ? "-" : user.surname)}
                    </text>
                    <text className="login-text">
                        {"@" + user.username}
                    </text>
                </div>
            </div>
            <div typeof="rectangle" className="divider"/>
        </div>
    );
};