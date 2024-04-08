import {Component} from "react";
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import './ProfileLayout.css'
import {CustomTag} from "../../components/tag/CustomTag.js";
import phoneIcon from "../../assets/phone-icon.svg"
import birthdayIcon from "../../assets/birthday-icon.svg"
import companyIcon from "../../assets/company-icon.svg"

export class ProfileLayout extends Component {
    getInitials = () => {
        // TODO получание инициалов, user взять из модели???
        return "ED";
    }

    getRealName = () => {
        // TODO получение имени пользователя, user взять из модели???
        return "Dementev Egor Vasilievich";
    }

    getUserName = () => {
        // TODO получение login пользователя, взять из модели???
        return "Egorka_2003";
    }

    getPhoneNumber = () => {
        // TODO получение phone пользователя, взять из модели???
        return "8-915-901-56-51";
    }

    getBirthday = () => {
        // TODO получение birthday пользователя, взять из модели???
        return "23.06.2003";
    }

    getCompany = () => {
        // TODO получение company пользователя, взять из модели???
        return "In Touch";
    }

    render() {
        return (
            <div className="profile-container">
                <UserPhoto className="photo" text={this.getInitials()}/>
                <div className="username-data">
                    <div className="name-text-container">
                        <text className="real-name">{this.getRealName()}</text>
                        <text className="user-name">{this.getUserName()}</text>
                    </div>
                    <div className="tags-container">
                        <CustomTag icon={phoneIcon} text={this.getPhoneNumber()}/>
                        <CustomTag icon={birthdayIcon} text={this.getBirthday()}/>
                        <CustomTag icon={companyIcon} text={this.getCompany()}/>
                    </div>
                </div>
            </div>
        );
    }
}