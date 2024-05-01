import React, {Component} from "react";
import {ChatCell} from "../../components/chatCell/ChatCell.js";
import './ChatsLayout.css'
import icon from "../../assets/search-icon.svg"

export class ChatsLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: [],
            searchValue: ""
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(event) {
        this.setState({ searchValue: event.target.value });
        console.log(this.state.searchValue)
    }

    async componentDidMount() {
        console.log("mounting")
        try {
            const chats = await this.props.getChatList();
            this.setState({ chatList: chats });
        } catch (e) {
            console.error("Ошибка при загрузке чатов:", e);
        }
    }

    render() {
        const {chatList} = this.state;
        const chatCells = [];

        console.log("ChatsPage", chatList)

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