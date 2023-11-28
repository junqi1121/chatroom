export interface ChatState {
  socket: SocketIOClient.Socket;
  dropped: boolean;  // 链接是否断开
  activeGroupUser: ActiveGroupUser;  //群在线人数
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
