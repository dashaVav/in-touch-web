import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";

import './EditProfileLayout.css'
import React, {Component} from "react";
import CustomTextInput from "../../components/textInput/CustomTextInput.js";
import CustomButton from "../../components/button/CustomButton.js";
import {User} from "../../services/dto/User.js";
import {user} from "../../services/Model.js";
import photoIcon from "../../assets/upload-photo-icon.svg";
import IconButton from "../../components/iconButton/IconButton.js";
import backIcon from "../../assets/back-icon.svg";

export class EditProfileLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameText: (user.realName) ? user.realName : "",
            surnameText: (user.surname) ? (user.surname) : "",
            patronymicText: (user.patronymic) ? (user.patronymic) : "",
            phoneText: (user.phoneNumber) ? (user.phoneNumber) : "",
            imageUrl: '',
            formData: new FormData()
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
        return new User(this.props.selectedUser.id, null, this.state.nameText.toString(),
            this.state.surnameText.toString(), null, this.state.phoneText.toString(), true,
            this.state.patronymicText.toString(), null, null);
    }

    componentDidUpdate(prevProps, prevState, s) {
        if (prevState.formData!== this.state.formData) {
            for (let [key, value] of this.state.formData.entries()) {
                console.log(key, value);
                console.log('smth');
            }
        }
    }


    handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newFormData = new FormData();
            newFormData.append('file', file, "image.jpeg");
            this.setState({ formData: newFormData });

            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Data = e.target.result;
                this.setState({imageUrl: base64Data});
            };
            reader.readAsDataURL(file);
        }
    };

    render() {
        const selectedUser = this.props.selectedUser;

        return (
            <div className="main-edit-profile-container">
                <div className="head-profile"/>
                <div className="edit-profile-container">
                    <div className="edit-area">
                        <div className="back-button-edit">
                            <IconButton logoUrl={backIcon} onClick={this.props.onBackClicked}/>
                        </div>
                        <UserPhoto className="photo" text={selectedUser.getInitials()} size={120} photo={this.state.imageUrl} thumbnailPhotoId={selectedUser.thumbnailPhotoId}/>
                        <div className="edit-container">
                            <text className="headline-profile">{"Editing personal data"}</text>
                            <div className="field-area">
                                <text className="regular-text">{"Name:"}</text>
                                <CustomTextInput onChange={this.handleNameTextChange} text="Name" type="text" value={this.state.nameText} maxLength={40}/>
                            </div>
                            <div className="field-area">
                                <text className="regular-text">{"Surname:"}</text>
                                <CustomTextInput onChange={this.handleSurnameTextChange} text="Surname" type="text" value={this.state.surnameText} maxLength={40}/>
                            </div>
                            <div className="field-area">
                                <text className="regular-text">{"Patronymic:"}</text>
                                <CustomTextInput onChange={this.handlePatronymicTextChange} text="Patronymic" type="text" value={this.state.patronymicText} maxLength={40}/>
                            </div>
                            <div className="field-area">
                                <text className="regular-text">{"Phone:"}</text>
                                <CustomTextInput onChange={this.handlePhoneTextChange} text="Phone" type="text" value={this.state.phoneText} maxLength={40}/>
                            </div>
                            <div className="edit-button-container">
                                <CustomButton buttonText="Edit profile" onClick={() => this.props.onClicked(this.prepareUserToChange(), this.state.formData)}/>
                            </div >
                        </div>
                    </div>
                </div>

                <div className="image-upload-container">
                        <input
                            type="file"
                            id="imageFile"
                            accept="image/*"
                            onChange={this.handleFileChange}
                            className="hidden-input"
                        />
                        <label htmlFor="imageFile" className="icon-button">
                            <span className="icon">
                                <IconButton logoUrl={photoIcon} blue={true}/>
                            </span>
                        </label>
                </div>

            </div>
        );
    }
}