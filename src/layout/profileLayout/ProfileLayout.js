import {Component} from "react";
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import './ProfileLayout.css'
import {CustomTag} from "../../components/tag/CustomTag.js";
import phoneIcon from "../../assets/phone-icon.svg"
import birthdayIcon from "../../assets/birthday-icon.svg"
import companyIcon from "../../assets/company-icon.svg"

export class ProfileLayout extends Component {
    getInitials = (user) => {
        if (user.realName == null || user.surname == null)
            return "-"
        return user.realName.toString().charAt(0).toUpperCase() + user.surname.toString().charAt(0).toUpperCase();
    }

    getRealName = (user) => {
        return (user.surname != null ? user.surname : "-") + " " +
            (user.realName != null ? user.realName : "-")  + " " +
            (user.patronymic != null ? user.patronymic : "-") ;
    }

    render() {
        const selectedUser = this.props.selectedUser;
        return (
            <div className="profile-container">
                <UserPhoto className="photo" text={this.getInitials(selectedUser)}/>
                <div className="username-data">
                    <div className="name-text-container">
                        <text className="real-name">{this.getRealName(selectedUser)}</text>
                        <text className="user-name">
                            {selectedUser.username != null ? "@" + selectedUser.username : "no data"}
                        </text>
                    </div>
                    <div className="tags-container">
                        <CustomTag icon={phoneIcon} text={selectedUser.phoneNumber != null ? selectedUser.phoneNumber : "no data"}/>
                        <CustomTag icon={birthdayIcon} text={selectedUser.dateOfBirth != null ? selectedUser.dateOfBirth : "no data"}/>
                        <CustomTag icon={companyIcon} text={"In Touch"}/>
                    </div>
                </div>
            </div>
        );
    }
}