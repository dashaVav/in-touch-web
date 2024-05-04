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
            userChanges: null
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
    handleProfileButtonClicked = (user) => {
        this.setState({ currentLayout: 'profile' });
        this.setState({selectedUser: user});
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
        await this.onChangePassword(request);
    }

    handleChangeUserInfo(user) {
        this.setState({isLoading: true})
        this.setState({userChanges: user})
        this.setState({ currentLayout: 'profile' });
    }

    handleOnEditChatClicked(chat) {
        this.setState({ currentLayout: 'edit chat' });
        this.setState({ selectedChat: chat})
    }

    async updateUser(user) {
        if (this.state.isLoading === true) {
            try {
                await changeUserInfo(user)
                this.setState({isLoading: false})
                this.setState({userChanges: null})
                return await mySelf;
            } catch (e) {
                console.log("error")
                console.log(e);
            }
        }
    }

    async onChangePassword(request) {
        this.setState({ currentLayout: 'profile' });
        try {
            await changePassword(request)
            console.log("Password have been changed!")
        } catch (e) {
            console.log("error")
            console.log(e);
        }
    }

    handleChatInfoClicked(chat) {
        if (chat.isPrivate === true) {
            this.setState({ currentLayout: 'profile' });
            console.log(chat.members.filter(u => u.id !== mySelf.id));
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

    render() {
        const { currentLayout } = this.state;

        return (
            <div>
                <div className="buttons-container">
                    <SimpleButton buttonText="My profile" logoUrl={profileIcon} onClick={() => this.handleProfileButtonClicked(mySelf)}/>
                    <SimpleButton buttonText="View my chats" logoUrl={chatIcon} onClick={this.handleChatButtonClicked}/>
                    <SimpleButton buttonText="Create new chat" logoUrl={newChatIcon} onClick={this.handleNewChatButtonClicked}/>
                    <SimpleButton buttonText="View all users" logoUrl={userIcon} onClick={this.handleUserButtonClicked}/>
                    <SimpleButton buttonText="Logout" logoUrl={logoutIcon} onClick={this.handleLogoutButtonClicked}/>
                </div>
                <div className="content">
                    {currentLayout === 'profile' && this.state.selectedUser.id !== mySelf.id &&
                        <ProfileLayout selectedUser={this.state.selectedUser}
                                       onClicked={user => this.handleGoToChatButton(user)}
                                       onUpdateUserInfo={null}/>}

                    {currentLayout === 'profile' && this.state.selectedUser.id === mySelf.id &&
                        <ProfileLayout selectedUser={this.state.selectedUser}
                                       onClicked={user => this.handleEditProfileButton(user)}
                                       isLoading={this.state.isLoading} userChanges={this.state.userChanges}
                                       onUpdateUserInfo={this.updateUser.bind(this)}
                                       onChangePassClicked={user => this.handleChangePassButton(user)}/>}

                    {currentLayout === 'edit profile' &&
                        <EditProfileLayout selectedUser={this.state.selectedUser}
                                           onClicked={user => this.handleChangeUserInfo(user)}/>}

                    {currentLayout === 'change password' &&
                        <ChangePasswordLayout selectedUser={mySelf} onClicked={req => this.handleChangePasswordRequest(req)}/>}

                    {currentLayout === 'chats' && <ChatsLayout
                        onChatClicked={chat => {
                            this.handleSelectChat(chat)
                        }}
                    />}

                    {currentLayout === 'users' && <UsersLayout
                        userList={allUsers} onUserClicked={user => this.handleProfileButtonClicked(user)}
                        onGoTOChatClicked={user => this.handleGoToChatButton(user)}/>}

                    {currentLayout === 'open chat' &&
                        <OpenedChatLayout currentChat={this.state.selectedChat}
                                          onChatInfoClicked={chat => this.handleChatInfoClicked(chat)}
                        />}

                    {currentLayout === 'chat info' && <ChatInfoLayout
                        selectedChat={this.state.selectedChat}
                        onUserClicked={user => this.handleProfileButtonClicked(user)}
                        onClicked={chat => this.handleOnEditChatClicked(chat)}/>}

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