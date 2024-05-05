import {Component} from "react";
import SimpleButton from "../../components/simpleButton/SimpleButton.js";

import chatIcon from "../../assets/chat-icon.svg"
import userIcon from "../../assets/user-icon.svg"
import newChatIcon from "../../assets/new-chat-icon.svg"
import profileIcon from "../../assets/profile-icon.svg"
import logoutIcon from "../../assets/logout-icon.svg"
import "./MessengerLayout.css"
import {ProfileLayout} from "../profileLayout/ProfileLayout.js";
import {allUsers, changePassword, changeUserInfo, chats, user as mySelf} from "../../services/Model.js";
import {UsersLayout} from "../usersLayout/UsersLayout.js";
import {ChatsLayout} from "../chatsLayout/ChatsLayout.js";
import {OpenedChatLayout} from "../openedChatLayout/OpenedChatLayout.js";
import {ChatInfoLayout} from "../chatInfoLayout/ChatInfoLayout.js";
import {EditProfileLayout} from "../editProfileLayout/EditProfileLayout.js";
import {ChangePasswordLayout} from "../changePasswordLayout/ChangePasswordLayout.js";
import {CreateChatLayout} from "../createChatLayout/CreateChatLayout.js";
import {EditGroupLayout} from "../editGroupLayout/EditGroupLayout.js";

/**
 * Класс отвечающий за представления главного и самого первого экрана приложения
 */
export class MessengerLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLayout: 'profile',
            selectedUser: mySelf,
            selectedChat: null,
            isLoading: false,
            userChanges: null,
            changePasswordResult: "",
            goToProfileFrom: "",
            photoToUpload: null
        };
    }

    /**
     * Метод обрабатывает события перехода ко всем доступным чатам
     */
    handleChatButtonClicked = () => {
        this.setState({ currentLayout: 'chats' });
    }

    /**
     * Метод обрабатывает события перехода ко всем доступным пользователям
     */
    handleUserButtonClicked = () => {
        this.setState({ currentLayout: 'users' });
    }

    /**
     * Метод обрабатывает события создания нового группового чата
     */
    handleNewChatButtonClicked = () => {
        this.setState({ currentLayout: 'new chat' });
    }

    /**
     * Метод обрабатывает события перехода к профилю пользователя
     */
    handleProfileButtonClicked = (user, from) => {
        this.setState({ currentLayout: 'profile' });
        this.setState({selectedUser: user});
        this.setState({goToProfileFrom: from})
    }

    /**
     * Метод обрабатывает события выхода из аккаунта
     */
    handleLogoutButtonClicked = () => {
        //TODO если нужно что-то обрабатывать после выхода из аккаунта
        this.props.onLogout();
    }

    handleSelectChat(chat) {
        this.setState({ currentLayout: 'open chat' });
        this.setState({ selectedChat: chat})
    }

    handleGoToChatButton(user) {
        console.log("Переход на чат с изльзоваталем из списка пользователей", user)
        //TODO открытие чата с пользователем из списка пользователей
    }

    handleEditProfileButton(user) {
        this.setState({ currentLayout: 'edit profile' });
    }

    handleChangePassButton(user) {
        this.setState({ currentLayout: 'change password' });
    }

    async handleChangePasswordRequest(request) {
        this.setState({ currentLayout: 'profile' });
        const res = await this.onChangePassword(request);
        this.setState({changePasswordResult: res})
    }

    handleChangeUserInfo(user, photo) {
        this.setState({isLoading: true})
        this.setState({userChanges: user})
        this.setState({photoToUpload: photo})
        this.setState({ currentLayout: 'profile' });
    }

    handleOnEditChatClicked(chat) {
        this.setState({ currentLayout: 'edit chat' });
        this.setState({ selectedChat: chat})
    }

    async updateUser(user, photo) {
        if (this.state.isLoading === true) {
            try {
                await changeUserInfo(user)
                //TODO await updatePhoto(photo)
                console.log("Got photo to upload:", photo);
                this.setState({isLoading: false})
                this.setState({userChanges: null})
                this.setState({photoToUpload: null})
                this.setState({changePasswordResult: "Personal data was updated successfully!"})
                return await mySelf;
            } catch (e) {
                console.log("error")
                console.log(e);
                this.setState({changePasswordResult: "Error while updating personal data ..."})
            }
        }
    }

    async onChangePassword(request) {
        this.setState({ currentLayout: 'profile' });
        try {
            const res = await changePassword(request);
            if (res === "Ok!")
                return "Password have been changed!";
            else {
                return "Error while changing password";
            }
        } catch (e) {
            console.log("error")
            console.log(e);
            return "Error while changing password";
        }
    }

    handleChatInfoClicked(chat) {
        if (chat.isPrivate === true) {
            this.setState({ currentLayout: 'profile' });
            this.setState({goToProfileFrom: "opened chat"})
            this.setState({selectedUser: chat.members.filter(u => u.id !== mySelf.id)[0]});
        }
        else {
            this.setState({ currentLayout: 'chat info' });
        }
    }

    handleCreateNewChat(data) {
        console.log("Создание новгого чата!!!", data);
    }

    handleEditGroupInformation(data) {
        console.log("Editing group request", data)
    }

    getLayoutBeforeProfile() {
        return (this.state.goToProfileFrom === "users") ? () => this.handleUserButtonClicked :
                (this.state.goToProfileFrom === "opened chat") ? () => this.handleSelectChat(this.state.selectedChat) :
                (this.state.goToProfileFrom === "chat info") ? () => this.handleChatInfoClicked(this.state.selectedChat) : null
    }

    render() {
        const { currentLayout } = this.state;

        return (
            <div>
                <div className="buttons-container">
                    <SimpleButton buttonText="My profile" logoUrl={profileIcon} onClick={() => this.handleProfileButtonClicked(mySelf, "menu")}/>
                    <SimpleButton buttonText="View my chats" logoUrl={chatIcon} onClick={this.handleChatButtonClicked}/>
                    <SimpleButton buttonText="Create new chat" logoUrl={newChatIcon} onClick={this.handleNewChatButtonClicked}/>
                    <SimpleButton buttonText="View all users" logoUrl={userIcon} onClick={this.handleUserButtonClicked}/>
                    <SimpleButton buttonText="Logout" logoUrl={logoutIcon} onClick={this.handleLogoutButtonClicked}/>
                </div>
                <div className="content">
                    {currentLayout === 'profile' && this.state.selectedUser.id !== mySelf.id &&
                        <ProfileLayout selectedUser={this.state.selectedUser}
                                       onClicked={user => this.handleGoToChatButton(user)}
                                       onUpdateUserInfo={null} changePasswordResult={""}
                                       onBackClicked={(this.state.goToProfileFrom === "users") ? this.handleUserButtonClicked :
                                           (this.state.goToProfileFrom === "opened chat") ? () => this.handleSelectChat(this.state.selectedChat) :
                                               (this.state.goToProfileFrom === "chat info") ? () => this.handleChatInfoClicked(this.state.selectedChat) : null}/>}

                    {currentLayout === 'profile' && this.state.selectedUser.id === mySelf.id &&
                        <ProfileLayout selectedUser={this.state.selectedUser}
                                       onClicked={user => this.handleEditProfileButton(user)}
                                       isLoading={this.state.isLoading} userChanges={this.state.userChanges}
                                       photoToUpload={this.state.photoToUpload}
                                       onUpdateUserInfo={this.updateUser.bind(this)}
                                       onChangePassClicked={user => this.handleChangePassButton(user)}
                                       changePasswordResult={this.state.changePasswordResult}
                                       onBackClicked={(this.state.goToProfileFrom === "users") ? this.handleUserButtonClicked :
                                           (this.state.goToProfileFrom === "opened chat") ? () => this.handleSelectChat(this.state.selectedChat) :
                                               (this.state.goToProfileFrom === "chat info") ? () => this.handleChatInfoClicked(this.state.selectedChat) : null}/>}

                    {currentLayout === 'edit profile' &&
                        <EditProfileLayout selectedUser={this.state.selectedUser}
                                           onClicked={(user, photo) => this.handleChangeUserInfo(user, photo)}/>}

                    {currentLayout === 'change password' &&
                        <ChangePasswordLayout selectedUser={mySelf} onClicked={req => this.handleChangePasswordRequest(req)}/>}

                    {currentLayout === 'chats' && <ChatsLayout
                        onChatClicked={chat => {
                            this.handleSelectChat(chat)
                        }}
                    />}

                    {currentLayout === 'users' && <UsersLayout
                        userList={allUsers} onUserClicked={user => this.handleProfileButtonClicked(user, "users")}
                        onGoTOChatClicked={user => this.handleGoToChatButton(user)}/>}

                    {currentLayout === 'open chat' &&
                        <OpenedChatLayout currentChat={this.state.selectedChat}
                                          onChatInfoClicked={chat => this.handleChatInfoClicked(chat)}
                                          onBackClicked={this.handleChatButtonClicked}
                        />}

                    {currentLayout === 'chat info' && <ChatInfoLayout
                        selectedChat={this.state.selectedChat}
                        onUserClicked={user => this.handleProfileButtonClicked(user, "chat info")}
                        onClicked={chat => this.handleOnEditChatClicked(chat)}
                        onBackClicked={chat => this.handleSelectChat(chat)}/>}

                    {currentLayout === 'new chat' &&
                        <CreateChatLayout onClicked={data => this.handleCreateNewChat(data)}/>}

                    {currentLayout === 'edit chat' &&
                        <EditGroupLayout selectedChat={this.state.selectedChat}
                                         onClicked={data => this.handleEditGroupInformation(data)}/>}

                </div>
            </div>
        );
    }
}