import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {openedChat, openedChatMessages, user} from "./Model.js";
import {Message} from "./dto/Message.js";
import {getChatById, moveUpChat} from "./repositoty/ChatRepository.js";


var stompClient;

export function connect() {
    const socket = new SockJS("http://195.133.196.67:8881/ws-endpoint");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
}

async function onConnected() {
    console.log("Connection is ready, Stomp Session")
    stompClient.subscribe('/topic/connection', onMessageReceived);

    stompClient.send("/app/connect",
        {},
        JSON.stringify({sender: user, type: 'JOIN'})
    );

    stompClient.subscribe("/user/" + await user.id + "/queue/messages", getNewMessage);
}


function onError(error) {
    console.log(error);
}


function sendMessage(event) {
//         stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
}

async function getNewMessage(payload) {
    const message = Message.fromJson(JSON.parse(payload.body));
    moveUpChat(getChatById(message.chatId));
    console.log("get");
    if (message.chatId === openedChat) {
        //todo в
        openedChatMessages.push(message);
    } else {
        console.log(getChatById(message.chatId));
        getChatById(message.chatId).lastMessage = message;
    }
    console.log("end")
    console.log(getChatById(message.chatId));
    // console.log(await allChats);
}

function onMessageReceived(payload) {
    console.log(payload)

}
