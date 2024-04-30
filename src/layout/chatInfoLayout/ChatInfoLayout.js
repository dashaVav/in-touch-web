import './ChatInfoLayout.css'
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import {Component} from "react";
import {UserCell} from "../../components/userCell/UserCell.js";

export class ChatInfoLayout extends Component {

    render() {
        const selectedChat = this.props.selectedChat;

        const usersCells = [];

        for (let i = 0; i < selectedChat.members.length; i++) {
            const user = selectedChat.members[i];
            usersCells.push(
                <UserCell key={user.id} user={user} onClicked={() => this.props.onUserClicked(user)} onGoToClicked={() => this.props.onGoTOChatClicked(user)}/>
            );
        }

        return (
            <div className="container-all-chat-info">
                <div className="chat-information-container">
                    <UserPhoto className="photo" text={selectedChat.getInitials()} size={60} textSize={24}/>
                    <div className="data-container">
                        <text className="chat-name-info">{selectedChat.getChatName()}</text>
                        <text className="chat-status">{selectedChat.getStatus()}</text>
                    </div>
                </div>
                <div className="list-members-container">
                    {usersCells}
                </div>
            </div>
        );
    }
}