import {Component} from "react";
import SimpleButton from "../../components/simpleButton/SimpleButton.js";

import chatIcon from "../../assets/chat-icon.svg"
import userIcon from "../../assets/user-icon.svg"
import newChatIcon from "../../assets/new-chat-icon.svg"
import profileIcon from "../../assets/profile-icon.svg"
import logoutIcon from "../../assets/logout-icon.svg"
import "./MessengerLayout.css"
import {ProfileLayout} from "../profileLayout/ProfileLayout.js";
import {allChats, allUsers, chats, user as mySelf} from "../../services/model.js";
import {UsersLayout} from "../usersLayout/UsersLayout.js";
import {ChatsLayout} from "../chatsLayout/ChatsLayout.js";
import {OpenedChatLayout} from "../openedChatLayout/OpenedChatLayout.js";

/**
 * Класс отвечающий за представления главного и самого первого экрана приложения
 */
export class MessengerLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLayout: 'profile',
            selectedUser: mySelf,
            selectedChat: null
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
        console.log("Выбранный пользователь:", user);
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
        console.log("Clicked on chat: ", chat)
        this.setState({ currentLayout: 'open chat' });
        this.setState({ selectedChat: chat})
        //TODO открытие чата из списка чатов
    }

    handleGoToChatButton(user) {
        console.log("Переход на чат с изльзоваталем из списка пользователей", user)
        //TODO открытие чата с пользователем из списка пользователей
    }

    handleChatInfoClicked(chat) {
        console.log("просмотр информации о чате", chat)
    }

    async getChatList () {
        try {
            await chats();
            console.log(await allChats);
            return await allChats;
        } catch (e) {
            console.log("error")
            console.log(e);
        }
    }

    render() {
        const { currentLayout } = this.state;
        console.log(currentLayout)

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
                    {currentLayout === 'profile' && <ProfileLayout selectedUser={this.state.selectedUser}/>}

                    {currentLayout === 'chats' && <ChatsLayout
                        onChatClicked={chat => {
                            this.handleSelectChat(chat)
                        }}
                        getChatList={this.getChatList.bind(this)}
                    />}

                    {currentLayout === 'users' && <UsersLayout
                        userList={allUsers} onUserClicked={user => this.handleProfileButtonClicked(user)}
                        onGoTOChatClicked={user => this.handleGoToChatButton(user)}/>}

                    {currentLayout === 'open chat' && <OpenedChatLayout currentChat={this.state.selectedChat} onChatInfoClicked={chat => this.handleChatInfoClicked(chat)}/>}

                    {/*{currentLayout === 'new chat' && <CreateChatLayout />}*/}

                </div>
            </div>
        );
    }
}