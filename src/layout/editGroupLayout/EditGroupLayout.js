import './EditGroupLayout.css'
import {Component} from "react";
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import CustomTextInput from "../../components/textInput/CustomTextInput.js";
import CustomButton from "../../components/button/CustomButton.js";
import {ChangeGroupName} from "../../services/dto/ChangeGroupName.js";
import IconButton from "../../components/iconButton/IconButton.js";
import backIcon from "../../assets/back-icon.svg";
import photoIcon from "../../assets/upload-photo-icon.svg";

export class EditGroupLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameText: this.props.selectedChat.getChatName(),
            imageUrl: '',
            formData: new FormData()
        };
    }

    handleNameTextChange = (text) => {
        this.setState({ nameText: text.target.value });
    }

    prepareGroupToChange() {
        if (this.state.nameText.toString() !== "") {
            const changeGroupName = new ChangeGroupName(this.state.nameText);
            const chatId = this.props.selectedChat.id;
            return [chatId, changeGroupName, this.state.formData];
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
        const selectedChat = this.props.selectedChat;

        return (
            <div className="main-edit-profile-container">
                <div className="chat-head"/>
                <div className="edit-profile-container">
                    <div className="edit-area">
                        <div className="back-button">
                            <IconButton logoUrl={backIcon} onClick={() => this.props.onBackClicked(selectedChat)}/>
                        </div>
                        <UserPhoto className="photo" text={selectedChat.getInitials()} size={120} photo={this.state.imageUrl} thumbnailPhotoId={selectedChat.getUserThumbnailPhotoId()}/>
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