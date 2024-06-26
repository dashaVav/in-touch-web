import './OpenedChatLayout.css'
import React, {Component} from "react";
import {UserPhoto} from "../../components/userPhoto/UserPhoto.js";
import IconButton from "../../components/iconButton/IconButton.js";
import infoIcon from "../../assets/info-icon.svg"
import backIcon from "../../assets/back-icon.svg"
import {openChat, openedChatMessages, sendMessage, user as mySelf} from "../../services/Model.js";
import {MessageCell} from "../../components/messageCell/MessageCell.js";
import sendIcon from "../../assets/icon-send-message.svg"
import photoIcon from "../../assets/send-photo-icon.svg";
export class OpenedChatLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageValue: '',
            currentChat: this.props.currentChat,
            messageList: [],
            formData: new FormData()
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageSend = this.handleMessageSend.bind(this);
    }
    myRef = React.createRef();

    handleMessageChange(event) {
        this.setState({ messageValue: event.target.value });
    }

    handleMessageSend() {
        if (this.state.formData.has("file")) {
            sendMessage(this.state.currentChat.id, this.state.messageValue.toString(), this.state.formData);
            this.setState({formData: new FormData()});
        }
        else {
            sendMessage(this.state.currentChat.id, this.state.messageValue.toString(), undefined);
        }
        this.setState({messageValue: ""})
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleMessageSend();
        }
    };

    async componentDidMount() {
        window.addEventListener('getNewMessage', this.handleExternalVariableChange);
        window.addEventListener('updateChatInfo', this.handleExternalVariableChange);
        try {
            const messages = await openChat(this.state.currentChat.id);
            this.setState({ messageList: messages });
            const node = this.myRef.current;
            if (node) {
                node.scrollTop = node.scrollHeight;
            }
        } catch (e) {
            console.error("Ошибка при загрузке списка сообщений:", e);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('getNewMessage', this.handleExternalVariableChange);
        window.removeEventListener('updateChatInfo', this.handleExternalVariableChange);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const node = this.myRef.current;
        if (node) {
            node.scrollTop = node.scrollHeight;
        }
    }

    handleExternalVariableChange = () => {
        console.log("update____________________________")
        this.setState({ messageList: openedChatMessages }, () => {
            const node = this.myRef.current;
            if (node) {
                node.scrollTop = node.scrollHeight;
            }
        });
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newFormData = new FormData();
            newFormData.append('file', file, "image.jpeg");
            this.setState({ formData: newFormData });
        }
    };

    render() {
        const currentChat = this.props.currentChat;

        const messageList = this.state.messageList;
        const messageCells = [];

        const rightStyle = {
            'justifyContent': 'flex-end',
        }

        const leftStyle = {
            'justifyContent': 'flex-start',
        }

        const rightContainerStyle = {
            'alignItems': 'flex-end',
        }

        const leftContainerStyle = {
            'alignItems': 'flex-start',
        }

        for (let i = 0; i < messageList.length; i++) {
            const mess = messageList[i];
            if (mess.author === null) {
                messageCells.push(
                    <div className="system-message">
                        <text className="system-text">
                            {mess.text}
                        </text>
                    </div>
                );
            }
            else {
                messageCells.push(
                    (mess.author.id === mySelf.id) ?
                        <MessageCell key={mess.id} message={mess} style={rightStyle}
                                     styleContainer={rightContainerStyle}/>
                        : <MessageCell key={mess.id} message={mess} style={leftStyle}
                                       styleContainer={leftContainerStyle}/>
                );
            }
        }

        const addedPhoto = (this.state.formData.has("file")) ?
            <div className="added-file">
                <text className="status">Added one attachment</text>
            </div>
            : null;

        return (
            <div className="open-chat-container">
                <div className="chat-info-container">
                    <div className="back-button-container">
                        <IconButton logoUrl={backIcon} onClick={this.props.onBackClicked}/>
                        <UserPhoto text={currentChat.getInitials()} size={50} textSize={16} thumbnailPhotoId={currentChat.getUserThumbnailPhotoId()}/>
                    </div>
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
                    {addedPhoto}
                </div>
                <div typeof="rectangle" className="divider"/>
                {/*{addedPhoto}*/}
                <div className="message-input-container" onKeyDown={this.handleKeyDown}>
                    <div className="image-upload-con">
                        <input
                            type="file"
                            id="imageFile"
                            accept="image/*"
                            onChange={this.handleFileChange}
                            className="hidden-input"
                        />
                        <label htmlFor="imageFile" className="icon-button">
                                <span className="icon">
                                    <IconButton logoUrl={photoIcon}/>
                                </span>
                        </label>
                    </div>
                    <input
                        className="message-input"
                        type="text"
                        maxLength="250"
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