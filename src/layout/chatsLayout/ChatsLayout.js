import React, {Component} from "react";
import {ChatCell} from "../../components/chatCell/ChatCell.js";
import './ChatsLayout.css'
import icon from "../../assets/search-icon.svg"
import {allChats} from "../../services/Model.js";

export class ChatsLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: allChats,
            searchValue: ""
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(event) {
        this.setState({ searchValue: event.target.value });
        console.log(this.state.searchValue)
    }

    // async componentDidMount() {
    //     console.log("mounting")
    //     try {
    //         const chats = await allChats;
    //         this.setState({ chatList: chats });
    //     } catch (e) {
    //         console.error("Ошибка при загрузке чатов:", e);
    //     }
    // }

    // updateVariable = () => {
    //     // Здесь вы можете изменить значение переменной
    //     this.setState({ chatList: allChats });
    //     this.forceUpdate();
    //     console.log('Переменная изменена:', this.state.chatList);
    // };

    // Жизненный цикл, который вызывается после обновления компонента
    // componentDidUpdate(prevProps, prevState, s) {
    //     if (allChats !== this.state.chatList) {
    //         console.log('Переменная изменена:', allChats);
    //         this.setState({chatList: allChats});
    //         this.forceUpdate();
    //     }
    // }



    render() {
        const {chatList} = this.state;
        const chatCells = [];

        console.log("ChatsPage", chatList, allChats)

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