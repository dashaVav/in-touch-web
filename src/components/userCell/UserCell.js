import './UserCell.css'
import {UserPhoto} from "../userPhoto/UserPhoto.js";
import CustomButton from "../button/CustomButton.js";

export const UserCell = ({ user, onClicked, onGoToClicked  }) => {

    return (
        <div className="user-cell">
            <div className="simple-container" onClick={onClicked}>
                <UserPhoto text={user.getInitials()} size={60} textSize={16}/>
                <div className="text-container">
                    <text className="real-user-name">
                        {(user.realName == null ? "- " : user.realName + " ") + (user.surname == null ? "-" : user.surname)}
                    </text>
                    <text className="login-text">
                        {"@" + user.username}
                    </text>
                </div>
            </div>
            <div className="button-area">
                <CustomButton buttonText="Go to chat" onClick={onGoToClicked}/>
            </div>
        </div>
    );
};