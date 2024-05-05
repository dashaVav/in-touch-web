import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {acceptNewChat, acceptNewMessage, user} from "../Model.js";


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

export function sendReadChatSignal(notification) {
    stompClient.send("/app/read_chat",  {}, JSON.stringify(notification));
}

function onMessageReceived(payload) {
    console.log(payload)

}
