import {Component} from "react";
import SimpleButton from "../../components/simpleButton/SimpleButton.js";

import chatIcon from "../../assets/chat-icon.svg"
import userIcon from "../../assets/user-icon.svg"
import newChatIcon from "../../assets/new-chat-icon.svg"
import profileIcon from "../../assets/profile-icon.svg"
import logoutIcon from "../../assets/logout-icon.svg"
import "./MessengerLayout.css"
import {ProfileLayout} from "../profileLayout/ProfileLayout.js";

/**
 * Класс отвечающий за представления главного и самого первого экрана приложения
 */
export class MessengerLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLayout: 'profile'
        };
    }

    /**
     * Метод обрабатывает события перехода ко всем доступным чатам
     */
    handleChatButtonClicked = () => {
        this.setState({ currentScreen: 'chats' });
    }

    /**
     * Метод обрабатывает события перехода ко всем доступным пользователям
     */
    handleUserButtonClicked = () => {
        this.setState({ currentScreen: 'users' });
    }

    /**
     * Метод обрабатывает события создания нового группового чата
     */
    handleNewChatButtonClicked = () => {
        this.setState({ currentScreen: 'new chat' });
    }

    /**
     * Метод обрабатывает события перехода к профилю пользователя
     */
    handleProfileButtonClicked = () => {
        this.setState({ currentScreen: 'profile' });
    }

    /**
     * Метод обрабатывает события выхода из аккаунта
     */
    handleLogoutButtonClicked = () => {
        //TODO если нужно что-то обрабатывать после выхода из аккаунта
        this.props.onLogout();
    }

    render() {
        const { currentLayout } = this.state;

        return (
            <div>
                <div className="buttons-container">
                    <SimpleButton buttonText="My profile" logoUrl={profileIcon} onClick={this.handleProfileButtonClicked}/>
                    <SimpleButton buttonText="View my chats" logoUrl={chatIcon} onClick={this.handleChatButtonClicked}/>
                    <SimpleButton buttonText="Create new chat" logoUrl={newChatIcon} onClick={this.handleNewChatButtonClicked}/>
                    <SimpleButton buttonText="View all users" logoUrl={userIcon} onClick={this.handleUserButtonClicked}/>
                    <SimpleButton buttonText="Logout" logoUrl={logoutIcon} onClick={this.handleLogoutButtonClicked}/>
                </div>
                <div className="content">
                    {currentLayout === 'profile' && <ProfileLayout />}
                    {/*{currentLayout === 'chats' && <ChatsLayout />}*/}
                    {/*{currentLayout === 'users' && <UsersLayout />}*/}
                    {/*{currentLayout === 'new chat' && <CreateChatLayout />}*/}
                </div>
            </div>
        );
    }
}