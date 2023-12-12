import Stomp from 'stompjs';
// // export interface ChatState {
// //   socket: SocketIOClient.Socket;
// //   dropped: boolean;  // 链接是否断开
// //   activeGroupUser: ActiveGroupUser;  //群在线人数
// //   activeRoom: (Group & Friend) | null;   // 当前聊天对象(可以是群、好友，当均没有时为null)
// //   groupGather: GroupGather;       // 群列表
// //   userGather: FriendGather;      // 用户列表(包括好友和非好友)
// //   friendGather: FriendGather;   // 好友列表
// //   unReadGather: UnReadGather;   // 未读消息对象？
// // }

// import ts from "typescript";

// // const chatState: ChatState = {
// //   // @ts-ignore
// //   socket: null,
// //   dropped: false,
// //   activeGroupUser: {},
// //   activeRoom: null,
// //   groupGather: {},
// //   userGather: {},
// //   friendGather: {},
// //   unReadGather: {},
// // };




// export interface ChatState {
//   socket: SocketIOClient.Socket;
//   stompClient: Stomp.Client | null; // 添加 stompClient 字段
//   dropped: boolean;
//   activeGroupUser: ActiveGroupUser;
//   activeRoom: (Group & Friend) | null;
//   groupGather: GroupGather;
//   userGather: FriendGather;
//   friendGather: FriendGather;
//   unReadGather: UnReadGather;
// }

// const chatState: ChatState = {
//   @ts-ignore
//   socket: null,
//   stompClient: null, // 初始化 stompClient 为 null
//   dropped: false,
//   activeGroupUser: {},
//   activeRoom: null,
//   groupGather: {},
//   userGather: {},
//   friendGather: {},
//   unReadGather: {},
// };
// export default chatState;




export interface ChatState {
  socket: SocketIOClient.Socket;
  stompClient: Stomp.Client | null; // 添加 stompClient 字段
  dropped: boolean;
  activeGroupUser: ActiveGroupUser;
  activeRoom: (Group & Friend) | null;
  groupGather: GroupGather;
  userGather: FriendGather;
  friendGather: FriendGather;
  unReadGather: UnReadGather;
}

const chatState: ChatState = {
  // @ts-ignore
  socket: null,
  dropped: false,
  activeGroupUser: {},
  activeRoom: null,
  groupGather: {},
  userGather: {},
  friendGather: {},
  unReadGather: {},
};

export default chatState;
