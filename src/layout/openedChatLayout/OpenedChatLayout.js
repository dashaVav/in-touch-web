import './OpenedChatLayout.css'
import React, {Component} from "react";
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import IconButton from "../../components/iconButton/IconButton.js";
import infoIcon from "../../assets/info-icon.svg"
import {openChat, user as mySelf} from "../../services/Model.js";
import {MessageCell} from "../../components/messageCell/MessageCell.js";
import sendIcon from "../../assets/icon-send-message.svg"
export class OpenedChatLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageValue: '',
            messageList: []
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageSend = this.handleMessageSend.bind(this);
    }
    myRef = React.createRef();

    handleMessageChange(event) {
        this.setState({ messageValue: event.target.value });
    }

    handleMessageSend() {
        // отправить this.state.messageValue
        console.log("Send message: ", this.state.messageValue)
    }

    async componentDidMount() {
        try {
            const messages = await openChat(this.props.currentChat.id);
            this.setState({ messageList: messages });
            const node = this.myRef.current;
            if (node) {
                node.scrollTop = node.scrollHeight;
            }
        } catch (e) {
            console.error("Ошибка при загрузке списка сообщений:", e);
        }
    }


    render() {
        const {currentChat} = this.props;

        const messageList = this.state.messageList;
        const messageCells = [];

        const rightStyle = {
            'justify-content': 'flex-end',
        }

        const leftStyle = {
            'justify-content': 'flex-start',
        }

        const rightContainerStyle = {
            'align-items': 'flex-end',
        }

        const leftContainerStyle = {
            'align-items': 'flex-start',
        }

        for (let i = 0; i < messageList.length; i++) {
            const mess = messageList[i];
            messageCells.push(
                 (mess.author.id === mySelf.id) ?
                     <MessageCell key={mess.id} message={mess} style={rightStyle}  styleContainer={rightContainerStyle}/>
                     : <MessageCell key={mess.id} message={mess} style={leftStyle} styleContainer={leftContainerStyle}/>
            );
        }

        console.log("Open chat with ", currentChat)

        return (
            <div className="open-chat-container">
                <div className="chat-info-container">
                    <UserPhoto text={currentChat.getInitials()} size={50} textSize={16}/>
                    <div className="text-info-container">
                        <text className="chat-name">
                            {currentChat.getChatName()}
                        </text>
                        <text className="status">
                            {currentChat.getStatus()}
                        </text>
                    </div>
                    <IconButton logoUrl={infoIcon} onClick={() => this.props.onChatInfoClicked(currentChat)}/>
                </div>
                <div typeof="rectangle" className="divider"/>
                <div className="message-list-container" ref={this.myRef}>
                    {messageCells}
                </div>
                <div typeof="rectangle" className="divider"/>
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