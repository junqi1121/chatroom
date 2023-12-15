import { ActionTree } from 'vuex';
import { ChatState } from './state';
import { RootState } from '../../index';
import io from 'socket.io-client';
import Vue from 'vue';

// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
import {
  SET_SOCKET,
  SET_DROPPED,
  SET_ACTIVE_GROUP_USER,
  ADD_GROUP_MESSAGE,
  ADD_FRIEND_MESSAGE,
  SET_FRIEND_MESSAGES,
  SET_GROUP_GATHER,
  SET_FRIEND_GATHER,
  SET_USER_GATHER,
  SET_ACTIVE_ROOM,
  DEL_GROUP,
  DEL_FRIEND,
  ADD_UNREAD_GATHER,
  SET_STOMP_CLIENT,
} from './mutation-types';

import { DEFAULT_GROUP } from '@/const/index';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const actions: ActionTree<ChatState, RootState> = {
  // 初始化socket连接和监听socket事件
  async connectSocket({ commit, state, dispatch, rootState }, callback) {

    let stompClient = Stomp.over(new SockJS('http://localhost:8080/ws'));
    stompClient.connect({}, success => {
      console.log('websocket连接成功 回调函数', success);
      // 订阅群消息
      stompClient.subscribe('/topic/', msg => {
        console.log('收到消息', msg);
        let groupMessage = JSON.parse(msg.body);
        console.log('收到消息', groupMessage);
        // commit(ADD_GROUP_MESSAGE, groupMessage);
      });
    });
    console.log('刚才建立连接的stompClient', stompClient);
    // 保存 Stomp 客户端实例到 Vuex

    commit(SET_STOMP_CLIENT, stompClient);
    console.log('保存之后的state.stompClient', state.stompClient);


  },

  async handleChatData({ commit, dispatch, state, rootState }, payload) {

    // commit: vue的commit方法，用于触发mutations
    // dispatch: vue的dispatch方法，用于触发actions
    // state：当前模块的state
    // rootState: 根模块的state
    // payload: 从服务器获取的聊天室所需的所有数据

    let user = rootState.app.user;
    let socket = state.socket;
    let groupGather = state.groupGather;

    let groupArr = payload.groupData;
    let friendArr = payload.friendData;
    let userArr = payload.userData;
    if (groupArr.length) {
      for (let group of groupArr) {
        socket.emit('joinGroupSocket', {
          groupId: group.groupId,
          userId: user.userId,
        });
        commit(SET_GROUP_GATHER, group);
      }
    }
    if (friendArr.length) {
      for (let friend of friendArr) {
        socket.emit('joinFriendSocket', {
          userId: user.userId,
          friendId: friend.userId,
        });
        commit(SET_FRIEND_GATHER, friend);
      }
    }
    if (userArr.length) {
      for (let user of userArr) {
        commit(SET_USER_GATHER, user);
      }
    }


    /**
     * 由于groupgather和userGather都更新了, 但是activeGather依旧是老对象,
     * 这里需要根据老的activeGather找到最新的gather对象,这样才能使得vue的watch监听新gather
     */


    let activeRoom = state.activeRoom;
    let groupGather2 = state.groupGather;
    let friendGather2 = state.friendGather;
    if (!activeRoom) {
      // 更新完数据没有默认activeRoom设置群为'在线聊天室'
      return commit(SET_ACTIVE_ROOM, groupGather[DEFAULT_GROUP]);
    }
    commit(SET_ACTIVE_ROOM, groupGather2[activeRoom.groupId] || friendGather2[activeRoom.userId]);
  },
};

export default actions;
