import './AddUserToChat.css'
import IconButton from "../../components/iconButton/IconButton.js";
import backIcon from "../../assets/back-icon.svg";
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import {Component} from "react";
import {allUsers} from "../../services/Model.js";
import {UserCell} from "../../components/userCell/UserCell.js";

export class AddUserToChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: allUsers
        };
    }

    componentDidMount() {
        window.addEventListener('updateUserList', this.handleUserListChanged);
    }

    componentWillUnmount() {
        window.removeEventListener('updateUserList', this.handleUserListChanged);
    }

    handleUserListChanged = () => {
        this.setState({userList: allUsers})
        this.forceUpdate()
    }

    render() {
        const selectedChat = this.props.selectedChat;
        const selectedChatMembers = selectedChat.members.map(user => user.id);
        const usersCells = [];

        for (let i = 0; i < allUsers.length; i++) {
            const user = allUsers[i];
            if (!selectedChatMembers.includes(user.id)) {
                usersCells.push(
                    <UserCell key={user.id} user={user} onClicked={() => this.props.onUserClicked(user)}/>
                );
            }
        }

        return (
            <div className="container-all-chat-info">
                <div className="chat-head"/>
                <div className="chat-information-container-add">
                    <div className="back-add">
                        <IconButton logoUrl={backIcon} onClick={() => this.props.onBackClicked(selectedChat)}/>
                    </div>
                    <div className="chat-photo">
                        <UserPhoto text={selectedChat.getInitials()} size={120} textSize={30} thumbnailPhotoId={selectedChat.getUserThumbnailPhotoId()}/>
                    </div>
                    <div className="data-container">
                        <text className="chat-name-info">{selectedChat.getChatName()}</text>
                        <text className="chat-status">{selectedChat.getStatus()}</text>
                    </div>
                </div>
                <text className="chat-info-text">Choose user to add</text>
                <div>
                    {usersCells}
                </div>
            </div>
        );
    }
}