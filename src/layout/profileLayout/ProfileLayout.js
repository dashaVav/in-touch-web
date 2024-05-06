import {Component} from "react";
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import './ProfileLayout.css'
import {CustomTag} from "../../components/tag/CustomTag.js";
import phoneIcon from "../../assets/phone-icon.svg"
import birthdayIcon from "../../assets/birthday-icon.svg"
import companyIcon from "../../assets/company-icon.svg"
import CustomButton from "../../components/button/CustomButton.js";
import {user as mySelf} from "../../services/Model.js";
import backIcon from "../../assets/back-icon.svg";
import IconButton from "../../components/iconButton/IconButton.js";

export class ProfileLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: this.props.selectedUser,
        };
    }
    formatDate(dateString) {
        const date = new Date(dateString);

        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    async componentDidMount() {
        if (this.props.isLoading === true) {
            try {
                const newUser = await this.props.onUpdateUserInfo(this.props.userChanges, this.props.photoToUpload);
                this.setState({selectedUser: newUser});
            } catch (e) {
                console.error("Ошибка при загрузке профиля:", e);
            }
        }
    }

    render() {
        const selectedUser = this.state.selectedUser;

        const button = (selectedUser.id === mySelf.id) ? <CustomButton
            buttonText={(selectedUser.id === mySelf.id) ? "Change pass" : ""}
            onClick={() => this.props.onChangePassClicked(selectedUser)}/> : "";

        const backButton = (this.props.onBackClicked != null) ?
            <div className="back-button">
                <IconButton logoUrl={backIcon} onClick={this.props.onBackClicked}/>
            </div> : null;

        const mainButton = (this.props.goToProfileFrom !== "opened chat") ? <CustomButton
            buttonText={(selectedUser.id === mySelf.id) ? "Edit profile" : "Message"}
            onClick={() => this.props.onClicked(selectedUser)}/> : null;

        return (
            <div className="main-profile-container">
                <div className="head"/>
                <div className="profile-container">
                    <div className="user-info-class">
                        {backButton}
                        <div className="photo">
                            <UserPhoto className="photo" text={selectedUser.getInitials()} size={120} thumbnailPhotoId={selectedUser.thumbnailPhotoId}/>
                        </div>
                        <div className="username-data">
                            <div className="name-text-container">
                                <text className="real-name">{selectedUser.getRealName()}</text>
                                <text className="user-name">
                                    {selectedUser.username != null ? "@" + selectedUser.username : "no data"}
                                </text>
                            </div>
                            <div className="tags-container">
                                <CustomTag icon={phoneIcon} text={selectedUser.phoneNumber != null ? selectedUser.phoneNumber : "no data"}/>
                                <CustomTag icon={birthdayIcon} text={selectedUser.dateOfBirth != null ? this.formatDate(selectedUser.dateOfBirth) : "no data"}/>
                                <CustomTag icon={companyIcon} text={"In Touch"}/>
                            </div>
                            <div className="change-result">
                                <text className={
                                    (this.props.changePasswordResult.toString().substring(0, 8) !== "Password" &&
                                        this.props.changePasswordResult.toString().substring(0, 8) !== "Personal") ? "red-style" : "green-style"}>
                                    {this.props.changePasswordResult}
                                </text>
                            </div>
                        </div>
                    </div>
                    <div className="profile-button">
                        {mainButton}
                        {button}
                    </div>
                </div>
            </div>
        );
    }
}