export interface ChatState {
  socket: SocketIOClient.Socket;
  dropped: boolean;  // 链接是否断开
  activeGroupUser: ActiveGroupUser;  //群在线人数
  activeRoom: (Group & Friend) | null;   // 当前聊天对象(可以是群、好友，当均没有时为null)
  groupGather: GroupGather;       // 群列表
  userGather: FriendGather;      // 用户列表(包括好友和非好友)
  friendGather: FriendGather;   // 好友列表
  unReadGather: UnReadGather;   // 未读消息对象？
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
