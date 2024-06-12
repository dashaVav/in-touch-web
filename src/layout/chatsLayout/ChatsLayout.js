import React, {Component} from "react";
import {ChatCell} from "../../components/chatCell/ChatCell.js";
import './ChatsLayout.css'
import icon from "../../assets/search-icon.svg"
import {allChats, searchChatsAtViewAllChats} from "../../services/Model.js";

export class ChatsLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: allChats,
            searchValue: ""
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    async handleSearchChange(event) {
        this.setState({searchValue: event.target.value}, () => {
            searchChatsAtViewAllChats(this.state.searchValue.toString());
        });
    }

    componentDidMount() {
        window.addEventListener('getNewMessage', this.handleUserChatChanged);
        window.addEventListener('updateChatList', this.handleUserChatChanged);

        searchChatsAtViewAllChats("");
    }

    componentWillUnmount() {
        window.removeEventListener('getNewMessage', this.handleUserChatChanged);
        window.removeEventListener('updateChatList', this.handleUserChatChanged);
    }

    handleUserChatChanged = () => {
        this.setState({chatList: allChats})
    }

    render() {
        const chatList = allChats;
        const chatCells = [];

        for (let i = 0; i < chatList.length; i++) {
            const chat = chatList[i];
            chatCells.push(
                <ChatCell key={chat.id} chat={chat} onClicked={() => this.props.onChatClicked(chat)}/>
            );
        }

        return (
            <div className="main-chats-container">
                <text className="layoutName">Messages</text>
                <div className="search-container">
                    <img className="search-image" alt="search" src={icon}/>
                    <input
                        className="search-input"
                        type="text"
                        value={this.state.searchValue}
                        onChange={this.handleSearchChange}
                        placeholder="Find chats..."
                    />
                </div>
                <div className="chats-container">
                    {chatCells}
                </div>
            </div>
        );
    }
}