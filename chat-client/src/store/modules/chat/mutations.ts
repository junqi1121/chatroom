import Vue from 'vue';
// import * as SockJS from 'sockjs-client';
// import * as Stomp from 'stompjs';
import fetch from '@/api/fetch';
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
  SET_STOMP_CLIENT,
} from './mutation-types';
import { ChatState } from './state';
import { MutationTree } from 'vuex';
import { DEFAULT_GROUP } from '@/const';
import SockJS from 'sockjs-client';

import Stomp from 'stompjs';
import ts from 'typescript';

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
      console.log('----ADD_GROUP_MESSAGE    111-----');
      state.groupGather[payload.groupId].messages!.push(payload);

    } else {
      console.log('----ADD_GROUP_MESSAGE    222-----');

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
  async [SET_ACTIVE_ROOM](state, payload: Friend & Group) {
    console.log('----SET_ACTIVE_ROOM-----');
    console.log(payload);
    state.activeRoom = payload;
    console.log('---当前聊天室---   state.activeRoom', state.activeRoom);

    // http://localhost:8080/groupMessage/ByRoomId/{roomId}
    // 获取历史消息放入state.activeRoom.messages
    // 1. 从服务器获取历史消息
    // 2. 将历史消息放入state.activeRoom.messages
    let res = await fetch.get(`http://localhost:8080/groupMessage/ByRoomId/${payload.groupId}`);
    console.log(res);
    // 将res.data.data 中的消息放入state.activeRoom.messages
    let data = res.data.data;
    console.log(data);
    let messages = data.map((item: any) => {
      return {
        userId: item.userId,
        groupId: item.roomId,
        content: item.content,
        messageType: item.type,
        time: item.time
      }
    }
    );

    console.log(messages);
    // @ts-ignore
    Vue.set(state.activeRoom, 'messages', messages);

    // 将这个群的群成员全部放在state.activeGroupUser中
    let res2 = await fetch.get(`http://localhost:8080/users/ByRoomId/${payload.groupId}`);
    console.log(res2);
    let data2 = res2.data.data;
    console.log('这个聊天室的群成员', data2);
    let activeGroupUser = {
      [payload.groupId]: data2
    };
    console.log(activeGroupUser);
    // @ts-ignore
    Vue.set(state, 'activeGroupUser', activeGroupUser);


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
  [SET_STOMP_CLIENT](state, payload: Stomp.Client) {
    state.stompClient = payload;
    console.log("SET_STOMP_CLIENT    state.stompClient: " + state.stompClient);
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
