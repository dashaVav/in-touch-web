import {Component} from "react";
import {ChatCell} from "../../components/chatCell/ChatCell.js";
import './ChatsLayout.css'

export class ChatsLayout extends Component {
    render() {
        const {chatList} = this.props;
        const chatCells = [];

        console.log("ChatsPage", chatList)

        for (let i = 0; i < chatList.length; i++) {
            const chat = chatList[i];
            chatCells.push(
                <ChatCell key={chat.id} chat={chat} onClicked={() => this.props.onChatClicked(chat)}/>
            );
        }

        return (
            <div className="chats-container">
                {chatCells}
            </div>
        );
    }
}