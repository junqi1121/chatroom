<template>
  <div
    class="chat"
    :style="{
      '--bg-image': `url('${background}')`,
    }"
  >
    <genal-music></genal-music>
    <div class="chat-part1" v-if="visibleTool">
      <genal-tool @logout="logout"></genal-tool>
    </div>
    
    <div class="chat-part2">
      <genal-search @addGroup="addGroup" @joinGroup="joinGroup" @addFriend="addFriend" @setActiveRoom="setActiveRoom"> </genal-search>
      <genal-room @setActiveRoom="setActiveRoom"></genal-room>
                      </div>
    <div class="chat-part3">
      <a-icon class="chat-team" type="message" @click="toggleDrawer" />
      <div class="chat-tool">
        <a-icon type="menu-fold" @click="toggleTool" v-if="visibleTool" />
        <a-icon type="menu-unfold" @click="toggleTool" v-else />
      </div>
      <genal-message v-if="activeRoom"></genal-message>
    </div>
    
        <!-- 一个基于 Ant Design Vue 组件库提供的抽屉组件 -->
    <a-drawer placement="left" :closable="false" :visible="visibleDrawer" @close="toggleDrawer" style="height:100%">
      <div class="chat-drawer">
        <genal-search @addGroup="addGroup" @joinGroup="joinGroup" @addFriend="addFriend" @setActiveRoom="setActiveRoom"> </genal-search>
        <genal-room @setActiveRoom="setActiveRoom"></genal-room>
      </div>
    </a-drawer>
    <genal-join @register="handleRegister" @login="handleLogin" :showModal="showModal"></genal-join>
  </div>
</template>

<script lang="ts">
import fetch from '@/api/fetch';
import { Component, Vue } from 'vue-property-decorator';
import GenalTool from '@/components/GenalTool.vue';
import GenalJoin from '@/components/GenalJoin.vue';
import GenalRoom from '@/components/GenalRoom.vue';
import GenalMessage from '@/components/GenalMessage.vue';
import GenalSearch from '@/components/GenalSearch.vue';
import GenalMusic from '@/components/GenalMusic.vue';
import { namespace } from 'vuex-class';
const appModule = namespace('app');
const chatModule = namespace('chat');
import SockJs from 'sockjs-client';

import { processReturn } from '@/utils/common.ts';
import SockJS from 'sockjs-client';

import Stomp from 'stompjs';
import { now } from 'moment';
import { message } from 'ant-design-vue';

@Component({
  components: {
    GenalTool,
    GenalJoin,
    GenalRoom,
    GenalMessage,
    GenalSearch,
    GenalMusic,
  },
})
export default class GenalChat extends Vue {
  @appModule.Getter('user') user: User;
  @appModule.Mutation('clear_user') clearUser: Function;
  @appModule.Action('login') login: Function;
  @appModule.Action('register') register: Function;
  @appModule.Getter('background') background: string;




  @chatModule.Getter('socket') socket: SocketIOClient.Socket;
  @chatModule.Getter('userGather') userGather: FriendGather;
  @chatModule.Getter('groupGather') groupGather: GroupGather;
  @chatModule.Getter('activeRoom') activeRoom: Friend & Group;
  @chatModule.Mutation('set_active_room') _setActiveRoom: Function;
  @chatModule.Action('connectSocket') connectSocket: Function;



  showModal: boolean = false;
  visibleDrawer: boolean = false;
  visibleTool: boolean = true;

  //挂载时，建立websocket连接
  mounted() {
    console.log('GenalChat mounted');
    // this.connectSocket();
    this.$store.dispatch('chat/connectSocket');
  }




  created() {
    console.log('GenalChat created');
    this.showModal = true;
    if (!this.user.userId) {
      // 未登录,弹出登录框
      this.showModal = true;
    } else {
      // 已登录,进入系统
      this.handleJoin();
    }
  }

  // 登录
  async handleLogin(user: User) {
    let res = await this.login(user);
    console.log('res', res.code);
    if (res) {
      console.log('登录成功');
      // 进入系统事件
      this.handleJoin();
    }
  }

  // 注册
  async handleRegister(user: User) {
    let res = await this.register(user);
    console.log('res', res);
    if (res) {
      console.log('注册成功');
      // 进入系统事件
      this.handleJoin();
    }
  }

  // 进入系统初始化事件
  async handleJoin() {

    console.log('进入系统初始化事件');
    this.showModal = false;
    // this.connectSocket();
    // 获取加入的群组列表
    let userId = this.user.userId;
    let res = await fetch.get(`http://localhost:8080/chatrooms/ByUserId/${userId}`);
    console.log('获取群组列表  ------  res', res);
    // let data = processReturn(res);
    let data = res.data.data;
    // 依据datae的数据结构，将data转换为groupGather

    let groupGather: GroupGather = {};
    console.log('handle Join  ----data', data);

    for (let i = 0; i < data.length; i++) {
      let group: Group = {
        groupId: data[i].roomId,
        userId: data[i].creatorId,
        groupName: data[i].roomName,
      }
      groupGather[group.groupId] = group;
    }

    console.log('groupGather 初始化处理！！！', groupGather);
    this.$store.commit('chat/set_group_gather', groupGather);
    //输出一下state中的groupGather，看看是否正确
    console.log('this.$store.state.chat.groupGather  groupGather设置好了吗？', this.$store.state.chat.groupGather);

    // 输出一下 state中的 groupGather[1]
    // console.log('this.$store.state.chat.groupGather[1]  groupGather设置好了吗？', this.$store.state.chat.groupGather[1]);



  }


  // 创建群组
  async addGroup(groupName: string) {
    // 发送创建群组事件
    // 服务器处理

    // this.socket.emit('addGroup', {
    //   userId: this.user.userId,
    //   groupName: groupName,
    //   createTime: new Date().valueOf(),
    // });
    let res = await fetch.post('http://localhost:8080/chatrooms', {
      roomId: null,
      creatorId: this.user.userId,
      roomName: groupName,

    });
    processReturn(res);
    console.log('add Group res', res);
    this.handleJoin();


  }

  // 加入群组
  async joinGroup(groupId: string) {
    console.log('joinGroup groupID --GenalChat', groupId);
    // 访问后端接口，将当前用户加入到群组中，/chatrooms/member / { roomId } / { userId }
    let res = await fetch.post(`http://localhost:8080/chatrooms/member/${groupId}/${this.user.userId}`, {
      roomId: groupId,
      userId: this.user.userId,
    });
    processReturn(res);
    console.log('joinGroup res', res);
    this.handleJoin();
  }

  // 添加好友
  addFriend(friendId: string) {
    console.log(this.user);
    this.socket.emit('addFriend', {
      userId: this.user.userId,
      friendId: friendId,
      createTime: new Date().valueOf(),
    });
  }

  // 设置当前聊天窗
  setActiveRoom(room: Friend & Group) {
    console.log('setActiveRoom', room);
    this._setActiveRoom(room);
    //控制台输出一下当前聊天窗，以及触发此函数的时间  时-分-秒
    console.log('setActiveRoom', room, new Date().toLocaleTimeString());
  }

  // 注销
  logout() {
    this.clearUser();
    this.$router.go(0);
  }

  // 控制抽屉组件的显示与隐藏
  toggleDrawer() {
    this.visibleDrawer = !this.visibleDrawer;
  }

  // 控制工具栏的显示与隐藏
  toggleTool() {
    this.visibleTool = !this.visibleTool;
  }
}



</script>
<style lang="scss" scoped>
.chat {
  font-size: 16px;
  z-index: 999;
  max-width: 1000px;
  min-width: 300px;
  width: 100%;
  height: 80%;
  max-height: 900px;
  min-height: 470px;
  position: relative;
  margin: auto 20px;
  box-shadow: 10px 20px 80px rgba(0, 0, 0, 0.8);
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  .chat-part1 {
    width: 74px;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.7);
  }
  .chat-part2 {
    width: 230px;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.3);
  }
  .chat-part3 {
    flex: 1;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.2);
    overflow-y: hidden;
    position: relative;
    .chat-group {
      height: 53px;
      border-bottom: 1px solid #ccc;
      line-height: 50px;
      font-weight: bold;
    }
  }
  .chat-team {
    display: none;
  }
  .chat-tool {
    display: none;
  }
}
.chat::after {
  content: '';
  background: var(--bg-image) 0 / cover fixed;
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  transform: scale(1.08);
  z-index: -1;
}

@media screen and (max-width: 768px) {
  .chat {
    margin: 0;
    height: 100%;
    .chat-part2 {
      display: none;
    }
    .chat-team {
      display: block !important;
      position: absolute;
      font-size: 25px;
      top: 17px;
      left: 60px;
      z-index: 999;
      &:active {
        color: skyblue;
      }
    }
    .chat-tool {
      display: block !important;
      position: absolute;
      font-size: 25px;
      top: 13px;
      left: 20px;
      z-index: 999;
      &:active {
        color: skyblue;
      }
    }
  }
}
</style>