import './ChangePasswordLayout.css'
import {Component} from "react";
import CustomTextInput from "../../components/textInput/CustomTextInput.js";
import CustomButton from "../../components/button/CustomButton.js";
import {AuthRequest} from "../../services/dto/AuthRequest.js";
import {ChangePasswordRequest} from "../../services/dto/ChangePasswordRequest.js";
import IconButton from "../../components/iconButton/IconButton.js";
import backIcon from "../../assets/back-icon.svg";

export class ChangePasswordLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: ''
        };
    }

    handleOldPasswordChange = (text) => {
        this.setState({ oldPassword: text.target.value });
    }

    handleNewPasswordChange = (text) => {
        this.setState({ newPassword: text.target.value });
    }

    prepareRequest() {
        return new ChangePasswordRequest(new AuthRequest(this.props.selectedUser.username, this.state.oldPassword), this.state.newPassword);
    }

    render() {
        return (
            <div className="main-change-password-container">
                <div className="head"/>
                <text className="headline">{"Change your password"}</text>
                <div className="change-password-container">
                    <CustomTextInput onChange={this.handleOldPasswordChange} text="Enter old password ..." type="password"/>
                    <CustomTextInput onChange={this.handleNewPasswordChange} text="Enter new password ..." type="password"/>
                    <CustomButton buttonText="Change password" onClick={() => this.props.onClicked(this.prepareRequest())}/>
                </div>
                <div className="back-button-pass">
                    <IconButton logoUrl={backIcon} onClick={this.props.onBackClicked}/>
                </div>
            </div>
        );
    }
}