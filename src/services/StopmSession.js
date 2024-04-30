import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {user} from "./model.js";


var stompClient;

export function connect() {
    const socket = new SockJS("http://195.133.196.67:8881/ws-endpoint");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
}

function onConnected() {
   console.log("Connection is ready, Stomp Session")
    stompClient.subscribe('/topic/connection', onMessageReceived);

    stompClient.send("/app/connect",
        {},
        JSON.stringify({sender: user, type: 'JOIN'})
    );

    stompClient.subscribe("/user/" + user.id + "/queue/messages", message);
}


function onError(error) {
    console.log(error);
}


function sendMessage(event) {
//         stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
}

function message(payload) {
    console.log(payload);
}

function onMessageReceived(payload) {
    console.log(payload)

}

