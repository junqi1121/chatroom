import Vue from 'vue';
// import * as SockJS from 'sockjs-client';
// import * as Stomp from 'stompjs';

import {
  SET_SOCKET,
  SET_DROPPED,
  SET_ACTIVE_GROUP_USER,
  ADD_GROUP_MESSAGE,
  SET_GROUP_MESSAGES,
  ADD_FRIEND_MESSAGE,
  SET_FRIEND_MESSAGES,
  SET_ACTIVE_ROOM,
  SET_GROUP_GATHER,
  SET_FRIEND_GATHER,
  SET_USER_GATHER,
  DEL_GROUP,
  DEL_FRIEND,
  ADD_UNREAD_GATHER,
  LOSE_UNREAD_GATHER,
} from './mutation-types';
import { ChatState } from './state';
import { MutationTree } from 'vuex';
import { DEFAULT_GROUP } from '@/const';


const mutations: MutationTree<ChatState> = {
  // 保存socket
  [SET_SOCKET](state, payload: SocketIOClient.Socket) {
    state.socket = payload;
  },

  // 设置用户是否处于掉线重连状态
  [SET_DROPPED](state, payload: boolean) {
    state.dropped = payload;
  },

  // 设置群在线人数
  [SET_ACTIVE_GROUP_USER](state, payload: ActiveGroupUser) {
    state.activeGroupUser = payload;
    let userGather = state.userGather;
    for (let user of Object.values(payload[DEFAULT_GROUP])) {
      // 如果当前userGather没有该在线用户, 应该马上存储, 不然该在线用户发消息, 就看不见他的信息
      // 向userGather中添加一个属性（在线用户） 属性名为该用户的id，属性值为该用户的信息
      Vue.set(userGather, user.userId, user);
    }
  },

  // 新增一条群消息
  [ADD_GROUP_MESSAGE](state, payload: GroupMessage) {
    if (state.groupGather[payload.groupId].messages) {
      // 如果群消息的列表已经存在, 直接push
      // 这里的‘！’是告诉ts, 这个属性（payload)一定存在, 不然会报错
      state.groupGather[payload.groupId].messages!.push(payload);
    } else {
      // vuex对象数组中对象改变不更新问题
      Vue.set(state.groupGather[payload.groupId], 'messages', [payload]);
    }
  },

  // 设置群消息
  [SET_GROUP_MESSAGES](state, payload: GroupMessage[]) {
    if (payload && payload.length) {
      Vue.set(state.groupGather[payload[0].groupId], 'messages', payload);
    }
  },

  // 新增一条私聊消息
  [ADD_FRIEND_MESSAGE](state, payload: FriendMessage) {
    // @ts-ignore
    let userId = this.getters['app/user'].userId;
    if (payload.friendId === userId) {
      if (state.friendGather[payload.userId].messages) {
        state.friendGather[payload.userId].messages!.push(payload);
      } else {
        Vue.set(state.friendGather[payload.userId], 'messages', [payload]);
      }
    } else {
      if (state.friendGather[payload.friendId].messages) {
        state.friendGather[payload.friendId].messages!.push(payload);
      } else {
        Vue.set(state.friendGather[payload.friendId], 'messages', [payload]);
      }
    }
  },

  // 设置私聊记录
  [SET_FRIEND_MESSAGES](state, payload: FriendMessage[]) {
    // @ts-ignore
    let userId = this.getters['app/user'].userId;
    if (payload && payload.length) {
      if (payload[0].friendId === userId) {
        Vue.set(state.friendGather[payload[0].userId], 'messages', payload);
      } else {
        Vue.set(state.friendGather[payload[0].friendId], 'messages', payload);
      }
    }
  },

  // 设置当前聊天对象(群或好友)
  [SET_ACTIVE_ROOM](state, payload: Friend & Group) {
    console.log('----SET_ACTIVE_ROOM-----');
    console.log(payload);
    state.activeRoom = payload;
    console.log('---当前聊天室---   state.activeRoom', state.activeRoom);

    // 设置好了当前的聊天室，需要建立与这个聊天室的websoccket连接  需要把这个设置成全局的，以便其他的组件也能使用
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    console.log("stompClient: " + stompClient);
    // 连接，并且控制台输出连接成功与否
    stompClient.connect({}, function () {
      console.log('Connected: ' + stompClient.connected);
    });
    //  连接上之后，订阅服务器的消息 todo！！！  回调函数为监听到服务器的消息之后的处理函数
    stompClient.subscribe('/topic/' + payload.groupId, onMessageReceived);

  },

  // 设置所有的群的群详细信息(头像,群名字等)
  // [SET_GROUP_GATHER](state, payload: Group) {
  //   Vue.set(state.groupGather, payload.groupId, payload);
  // },

  [SET_GROUP_GATHER](state, payload: GroupGather) {
    state.groupGather = payload;
  },


  // 设置所有的用户的用户详细信息(头像,昵称等)
  [SET_USER_GATHER](state, payload: User) {
    Vue.set(state.userGather, payload.userId, payload);
  },

  // 设置所有的好友的用户详细信息(头像,昵称等)
  [SET_FRIEND_GATHER](state, payload: User) {
    Vue.set(state.friendGather, payload.userId, payload);
  },

  // 退群
  [DEL_GROUP](state, payload: GroupMap) {
    Vue.delete(state.groupGather, payload.groupId);
  },

  // 删好友
  [DEL_FRIEND](state, payload: UserMap) {
    Vue.delete(state.friendGather, payload.friendId);
  },

  // 给某个聊天组添加未读消息
  [ADD_UNREAD_GATHER](state, payload: string) {
    if (!state.unReadGather[payload]) {
      Vue.set(state.unReadGather, payload, 1);
    } else {
      ++state.unReadGather[payload];
    }
  },

  // 给某个聊天组清空未读消息
  [LOSE_UNREAD_GATHER](state, payload: string) {
    Vue.set(state.unReadGather, payload, 0);
  },
};



//payload是服务器返回的消息 需要解决下报错Parameter 'payload' implicitly has an 'any' type.




function onMessageReceived(payload: any) {
  var message = JSON.parse(payload.body);
  console.log("message: " + message);
  //   var messageElement = document.createElement('li');

  //   if (message.type == 'JOIN') {
  //     messageElement.classList.add('event-message');
  //     message.content = message.userId + ' joined!';
  //   } else if (message.type == 'LEAVE') {
  //     messageElement.classList.add('event-message');
  //     message.content = message.userId + ' left!';
  //   } else {
  //     messageElement.classList.add('chat-message');

  //     var avatarElement = document.createElement('i');
  //     var avatarText = document.createTextNode(message.userId);
  //     avatarElement.appendChild(avatarText);
  //     avatarElement.style['background-color'] = getAvatarColor(message.userId);

  //     messageElement.appendChild(avatarElement);

  //     var usernameElement = document.createElement('span');
  //     var usernameText = document.createTextNode(message.userId);
  //     usernameElement.appendChild(usernameText);
  //     messageElement.appendChild(usernameElement);
  //   }

  //   var textElement = document.createElement('p');
  //   var messageText = document.createTextNode(message.content);
  //   textElement.appendChild(messageText);

  //   messageElement.appendChild(textElement);

  //   messageArea.appendChild(messageElement);
  //   messageArea.scrollTop = messageArea.scrollHeight;
  // }
}



export default mutations;
