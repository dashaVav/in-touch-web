import './CreateChatLayout.css'
import React, {Component} from "react";
import {UserCell} from "../../components/userCell/UserCell.js";
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import CustomTextInput from "../../components/textInput/CustomTextInput.js";
import {allUsers} from "../../services/Model.js";
import CustomButton from "../../components/button/CustomButton.js";
import {GroupChatInfo} from "../../services/dto/GroupChatInfo.js";
import {user as mySelf} from "../../services/Model.js"
import {GroupRequest} from "../../services/dto/GroupRequest.js";

export class CreateChatLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatName: '',
            addedUsers: [],
            userList: allUsers
        };
    }

    handleChatNameChange = (text) => {
        this.setState({ chatName: text.target.value });
    }

    onNotAddedUserClicked(user) {
        if (!this.state.addedUsers.includes(user)) {
            this.state.addedUsers.push(user);
            console.log(this.state.addedUsers)
            this.forceUpdate();
        }
    }

    onAddedUserClicked(user) {
        const updatedItems = this.state.addedUsers.filter(item => item.id !== user.id);
        this.setState({addedUsers: updatedItems})
        this.forceUpdate();
    }

    prepareDataForRequest() {
        if (this.state.addedUsers.length !== 0 && this.state.chatName.toString() !== "") {
            console.log(this.state.addedUsers, this.state.chatName)
            const userIds = this.state.addedUsers.map(user => user.id);
            userIds.push(mySelf.id);
            const chatInfo = new GroupChatInfo(this.state.chatName, new Date(), mySelf)
            return new GroupRequest(userIds, chatInfo);
        }
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
        const allUsersCells = [];
        const addedUsersCells = [];
        const userList = this.state.userList;
        const addedUserList = this.state.addedUsers;

        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            allUsersCells.push(
                <UserCell key={user.id} user={user} onClicked={() => this.onNotAddedUserClicked(user)}/>
            );
        }

        for (let i = 0; i < addedUserList.length; i++) {
            const user = addedUserList[i];
            addedUsersCells.push(
                <div className="added-user-container" onClick={() => this.onAddedUserClicked(user)} key={user.id}>
                    <UserPhoto text={user.getInitials()} size={30} textSize={10}/>
                    <text className="header3">{user.realName}</text>
                </div>
            );
        }

        return (
            <div className="container-create-chat">
                <div className="chat-head"/>
                <div className="chat-creation-container">
                    <text className="header">Create new group chat</text>
                    <div className="chat-name-area">
                        <div className="help-container">
                            <text className="header2">Group name</text>
                            <CustomTextInput onChange={this.handleChatNameChange} text="Enter chat name" type="text" maxLength={40}/>
                        </div>
                        <CustomButton buttonText="Create group" onClick={() => this.props.onClicked(this.prepareDataForRequest())}/>
                    </div>
                    <text className="header2">Added users</text>
                    <div className="added-users">
                        {addedUsersCells}
                    </div>
                    <text className="header2">All users</text>
                    <div className="all-users">
                        {allUsersCells}
                    </div>
                </div>
            </div>
        );
    }
}