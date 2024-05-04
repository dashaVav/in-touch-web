import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {acceptNewMessage, user} from "../Model.js";
import {newChatCreated} from "../repositoty/ChatRepository.js";
import {Chat} from "../dto/Chat.js";


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

    stompClient.subscribe("/user/" + await user.id + "/queue/messages", acceptNewMessage);
    stompClient.subscribe("/user/" + await user.id + "/queue/chats", acceptNewChat);
}


function onError(error) {
    console.log(error);
}


function sendMessage(event) {
//         stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
}



async function acceptNewChat(payload) {
    const chat = Chat.fromJSON(payloadToJson(payload));
    newChatCreated(chat);
}

function onMessageReceived(payload) {
    console.log(payload)

}

function payloadToJson(payload) {
    return JSON.parse(payload.body);
}
