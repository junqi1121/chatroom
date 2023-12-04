package com.sqlx.chatroom.service;

import com.sqlx.chatroom.pojo.GroupMessage;
import com.sqlx.chatroom.pojo.Result;

public interface GroupMessageService {
    Result selectGroupMessageByRoomId(Integer id);

    Result selectGroupMessageByRoomIdAndUserId(Integer room_id, Integer user_id);

    Result insertGroupMessageIntoChatroom(GroupMessage groupMessage);
}
