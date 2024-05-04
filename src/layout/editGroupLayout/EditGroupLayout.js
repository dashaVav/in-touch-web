import './EditGroupLayout.css'
import {Component} from "react";
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import CustomTextInput from "../../components/textInput/CustomTextInput.js";
import CustomButton from "../../components/button/CustomButton.js";

export class EditGroupLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameText: this.props.selectedChat.getChatName()
        };
    }

    handleNameTextChange = (text) => {
        this.setState({ nameText: text.target.value });
    }

    prepareGroupToChange() {
        return "data";
    }

    render() {
        const selectedChat = this.props.selectedChat;

        return (
            <div className="main-edit-profile-container">
                <div className="chat-head"/>
                <div className="edit-profile-container">
                    <div className="edit-area">
                        <UserPhoto className="photo" text={selectedChat.getInitials()} size={120}/>
                        <div className="edit-container">
                            <text className="headline">{"Editing group information"}</text>
                            <div className="field-area">
                                <text className="regular-text">{"Group name:"}</text>
                                <CustomTextInput onChange={this.handleNameTextChange} text="Enter group name ..." type="text" value={this.state.nameText}/>
                            </div>
                            <div className="edit-button-container">
                                <CustomButton buttonText="Edit group" onClick={() => this.props.onClicked(this.prepareGroupToChange())}/>
                            </div >
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}