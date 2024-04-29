import './OpenedChatLayout.css'
import {Component} from "react";
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import IconButton from "../../components/iconButton/IconButton.js";
import infoIcon from "../../assets/info-icon.svg"
import {user as mySelf} from "../../services/model.js";
import {Message} from "../../services/dto/Message.js";
import {User} from "../../services/dto/User.js";
import {MessageCell} from "../../components/messageCell/MessageCell.js";
import sendIcon from "../../assets/icon-send-message.svg"
export class OpenedChatLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageValue: ''
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageSend = this.handleMessageSend.bind(this);
    }

    handleMessageChange(event) {
        this.setState({ messageValue: event.target.value });
    }

    handleMessageSend() {
        // отправить this.state.messageValue
        console.log("Send message: ", this.state.messageValue)
    }

    render() {
        const {currentChat} = this.props;

        const status = (currentChat.isPrivate) ? currentChat.members.filter(u => u.id !== mySelf.id)
            .map(u => (u.isOnline) ? "online" : "offline") : currentChat.members.size + " members";

        const messageList = [
            new Message(1, "Hello!", "23-05-2024",
                new User(234, "Dasha", "Dasha", "vavilova", "23-06-2003", "8888", true, "Vasilievich", null, null),
                1),
            new Message(2, "Привет! Как у тебя дела????", "23-05-2024",
                new User(4, "Egorka", "Egor", "Dementev", "23-06-2003", "8888", true, "Vasilievich", null, null),
                1),
            new Message(3, "Пока не родила)))))", "23-05-2024",
                new User(234, "Dasha", "Dasha", "vavilova", "23-06-2003", "8888", true, "Vasilievich", null, null),
                1),
            new Message(4, "ппхпхпххп", "23-05-2024",
                new User(4, "Egorka", "Egor", "Dementev", "23-06-2003", "8888", true, "Vasilievich", null, null),
                1),
            new Message(5, "что там с курсовой, когда кнопочки будут готовы, аааа asdjkghjf sdfjkhsdfkhksdf sdfkhsdfhskdhf sdfkjhsdjkfh dfsdfgdfgdf edgdfgdf dfghfhfghfgh rhhfghfgh ??", "23-05-2024",
                new User(234, "Dasha", "Dasha", "vavilova", "23-06-2003", "8888", true, "Vasilievich", null, null),
                1),
            new Message(6, "в процессе", "23-05-2024",
                new User(4, "Egorka", "Egor", "Dementev", "23-06-2003", "8888", true, "Vasilievich", null, null),
                1),
            new Message(7, "тээээш", "23-05-2024",
                new User(234, "Dasha", "Dasha", "vavilova", "23-06-2003", "8888", true, "Vasilievich", null, null),
                1),
            new Message(8, "мда", "23-05-2024",
                new User(4, "Egorka", "Egor", "Dementev", "23-06-2003", "8888", true, "Vasilievich", null, null),
                1)
        ]

        const messageCells = [];

        const rightStyle = {
            'justify-content': 'flex-end',
        }

        const leftStyle = {
            'justify-content': 'flex-start',
        }

        for (let i = 0; i < messageList.length; i++) {
            const mess = messageList[i];
            console.log(mess.author.id, mySelf.id)
            messageCells.push(
                 (mess.author.id.toString() === mySelf.id.toString()) ?
                     <MessageCell key={mess.id} message={mess} style={rightStyle}/>
                     : <MessageCell key={mess.id} message={mess} style={leftStyle}/>
            );
        }

        console.log("Open chat with ", currentChat)

        return (
            <div className="open-chat-container">
                <div className="chat-info-container">
                    <UserPhoto text={currentChat.getInitials()} size={60} textSize={16}/>
                    <div className="text-info-container">
                        <text className="chat-name">
                            {currentChat.getChatName()}
                        </text>
                        <text className="status">
                            {status}
                        </text>
                    </div>
                    <IconButton logoUrl={infoIcon} onClick={() => this.props.onChatInfoClicked(currentChat)}/>
                </div>
                <div className="message-list-container">
                    {messageCells}
                </div>
                <div className="message-input-container">
                    <input
                        className="message-input"
                        type="text"
                        value={this.state.messageValue}
                        onChange={this.handleMessageChange}
                        placeholder="Write a message..."
                    />
                    <IconButton onClick={this.handleMessageSend} logoUrl={sendIcon}/>
                </div>
            </div>
        );
    }
}