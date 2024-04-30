import './ChatInfoLayout.css'
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import React, {Component} from "react";
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
                <div className="chat-head"/>
                <div className="chat-information-container">
                    <UserPhoto className="chat-photo" text={selectedChat.getInitials()} size={120} textSize={30}/>
                    <div className="data-container">
                        <text className="chat-name-info">{selectedChat.getChatName()}</text>
                        <text className="chat-status">{selectedChat.getStatus()}</text>
                    </div>
                </div>
                <text className="chat-info-text">Members</text>
                <div>
                    {usersCells}
                </div>
            </div>
        );
    }
}