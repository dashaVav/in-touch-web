import {Component} from "react";
import {ChatCell} from "../../components/chatCell/ChatCell.js";
import './ChatsLayout.css'

export class ChatsLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: []
        };
    }

    async componentDidMount() {
        try {
            const chats = await this.props.getChatList(); // Предполагается, что getChatList передается как prop
            this.setState({ chatList: chats }); // Обновляем состояние с полученными чатами
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
            <div className="chats-container">
                {chatCells}
            </div>
        );
    }
}