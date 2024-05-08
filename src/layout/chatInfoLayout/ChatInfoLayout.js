import './ChatInfoLayout.css'
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import React, {Component} from "react";
import {UserCell} from "../../components/userCell/UserCell.js";
import CustomButton from "../../components/button/CustomButton.js";
import backIcon from "../../assets/back-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import IconButton from "../../components/iconButton/IconButton.js";
import {user as mySelf} from "../../services/Model.js"

export class ChatInfoLayout extends Component {

    componentDidMount() {
        window.addEventListener('updateChatInfo', this.force);
    }

    componentWillUnmount() {
        window.removeEventListener('updateChatInfo', this.force);
    }

    force() {
        this.forceUpdate()
    }

    render() {
        const selectedChat = this.props.selectedChat;

        const usersCells = [];

        for (let i = 0; i < selectedChat.members.length; i++) {
            const user = selectedChat.members[i];
            if (mySelf.id !== selectedChat.group.creator.id) {
                usersCells.push(
                    <UserCell key={user.id} user={user} onClicked={() => this.props.onUserClicked(user)}/>
                );
            }
            else {
                usersCells.push(
                    <div className="user-modified-cell">
                        <div className="user-cell-modified">
                            <UserCell key={user.id} user={user} onClicked={() => this.props.onUserClicked(user)}/>
                        </div>
                        <div className="del-button">
                            <IconButton logoUrl={deleteIcon} onClick={() => this.props.onRemoveUser(user)}/>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="container-all-chat-info">
                <div className="chat-head"/>
                <div className="chat-information-container">
                    <div className="back">
                        <IconButton logoUrl={backIcon} onClick={() => this.props.onBackClicked(selectedChat)}/>
                    </div>
                    <div className="chat-photo">
                        <UserPhoto text={selectedChat.getInitials()} size={120} textSize={30} thumbnailPhotoId={selectedChat.getUserThumbnailPhotoId()}/>
                    </div>
                    <div className="data-container">
                        <text className="chat-name-info">{selectedChat.getChatName()}</text>
                        <text className="chat-status">{selectedChat.getStatus()}</text>
                    </div>
                    <div className="edit-chat-button">
                        <CustomButton buttonText="Edit group" onClick={() => this.props.onClicked(selectedChat)}/>
                        <CustomButton buttonText="Add user" onClick={() => this.props.onAddUserClicked(selectedChat)}/>
                        <CustomButton buttonText="Leave group" onClick={() => this.props.onRemoveUser(mySelf)}/>
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