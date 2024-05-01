import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";

import './EditProfileLayout.css'
import {Component} from "react";
import CustomTextInput from "../../components/textInput/CustomTextInput.js";
import CustomButton from "../../components/button/CustomButton.js";
import {User} from "../../services/dto/User.js";

export class EditProfileLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameText: this.props.selectedUser.realName,
            surnameText: this.props.selectedUser.surname,
            patronymicText: this.props.selectedUser.patronymic,
            phoneText: this.props.selectedUser.phoneNumber
        };
    }

    handleNameTextChange = (text) => {
        this.setState({ nameText: text.target.value });
    }

    handleSurnameTextChange = (text) => {
        this.setState({ surnameText: text.target.value });
    }

    handlePatronymicTextChange = (text) => {
        this.setState({ patronymicText: text.target.value });
    }

    handlePhoneTextChange = (text) => {
        this.setState({ phoneText: text.target.value });
    }

    prepareUserToChange() {
        console.log("preparing");
        return new User(this.props.selectedUser.id, null, this.state.nameText.toString(),
            this.state.surnameText.toString(), null, this.state.phoneText.toString(), true,
            this.state.patronymicText.toString(), null, null);
    }

    render() {
        const selectedUser = this.props.selectedUser;
        console.log("edit", selectedUser);

        return (
            <div className="main-edit-profile-container">
                <div className="head"/>
                <div className="edit-profile-container">
                    <div className="edit-area">
                        <UserPhoto className="photo" text={selectedUser.getInitials()} size={120}/>
                        <div className="edit-container">
                            <text className="headline">{"Editing personal data"}</text>
                            <div className="field-area">
                                <text className="regular-text">{"Name:"}</text>
                                <CustomTextInput onChange={this.handleNameTextChange} text="Name" type="text" value={this.state.nameText}/>
                            </div>
                            <div className="field-area">
                                <text className="regular-text">{"Surname:"}</text>
                                <CustomTextInput onChange={this.handleSurnameTextChange} text="Surname" type="text" value={this.state.surnameText}/>
                            </div>
                            <div className="field-area">
                                <text className="regular-text">{"Patronymic:"}</text>
                                <CustomTextInput onChange={this.handlePatronymicTextChange} text="Patronymic" type="text" value={this.state.patronymicText}/>
                            </div>
                            <div className="field-area">
                                <text className="regular-text">{"Phone:"}</text>
                                <CustomTextInput onChange={this.handlePhoneTextChange} text="Phone" type="text" value={this.state.phoneText}/>
                            </div>
                            <div className="edit-button-container">
                                <CustomButton buttonText="Edit profile" onClick={() => this.props.onClicked(this.prepareUserToChange())}/>
                            </div >
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}