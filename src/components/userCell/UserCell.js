import './UserCell.css'
import {UserPhoto} from "../userPhoto/UserPhoto.js";

export const UserCell = ({ user, onClicked  }) => {

    const initials = (user.realName == null || user.surname == null) ? "-" :
        user.realName.toString().charAt(0).toUpperCase() + user.surname.toString().charAt(0).toUpperCase()

    return (
        <div className="user-cell" onClick={onClicked}>
            <UserPhoto text={initials} size={70} textSize={20}/>
            <div className="text-container">
                <text className="real-user-name">
                    {(user.realName == null ? "- " : user.realName + " ") + (user.surname == null ? "-" : user.surname)}
                </text>
                <text className="login-text">
                    {"@" + user.username}
                </text>
            </div>
        </div>
    );
};