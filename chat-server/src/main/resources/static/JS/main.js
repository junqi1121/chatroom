'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var userId = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {
    userId = document.querySelector('#name').value;

    if (userId) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() {
    // Subscribe to the Public Topic
    var room = parseInt(document.getElementById("roomSelector").value.slice(-1));
    stompClient.subscribe('/topic/' + room, onMessageReceived);
    // Tell your username to the server

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/groupMessage/ByRoomId/' + room, false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState===4){
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                responseData.data.forEach(function (message) {
                    var messageElement = document.createElement('li');

                    if (message.type === 'JOIN') {
                        messageElement.classList.add('event-message');
                        message.content = message.userId + ' joined!';
                    } else if (message.type === 'LEAVE') {
                        messageElement.classList.add('event-message');
                        message.content = message.userId + ' left!';
                    } else {
                        messageElement.classList.add('chat-message');

                        var avatarElement = document.createElement('i');
                        var avatarText = document.createTextNode(message.userId);
                        avatarElement.appendChild(avatarText);
                        avatarElement.style['background-color'] = getAvatarColor(message.userId);

                        messageElement.appendChild(avatarElement);

                        var usernameElement = document.createElement('span');
                        var usernameText = document.createTextNode(message.userId);
                        usernameElement.appendChild(usernameText);
                        messageElement.appendChild(usernameElement);
                    }
                    var textElement = document.createElement('p');
                    var messageText = document.createTextNode(message.content);
                    textElement.appendChild(messageText);

                    messageElement.appendChild(textElement);

                    messageArea.appendChild(messageElement);
                    messageArea.scrollTop = messageArea.scrollHeight;

                });
            }
        }
    };
    xhr.send();

    var chatMessage = {
        userId: userId,
        roomId: room,
        content: '',
        type: 'JOIN',
        time: new Date().valueOf()
    };
    stompClient.send("/app/groupMessage", {}, JSON.stringify(chatMessage));
    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    var roomId = parseInt(document.getElementById("roomSelector").value.slice(-1));

    if (messageContent && stompClient) {
        var chatMessage = {
            userId: userId,
            roomId: roomId,
            content: messageInput.value,
            type: 'TEXT',
            time: new Date().valueOf()
        };

        stompClient.send("/app/groupMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if (message.type == 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.userId + ' joined!';
    } else if (message.type == 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.userId + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.userId);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.userId);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.userId);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}

usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)