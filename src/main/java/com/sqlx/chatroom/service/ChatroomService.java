package com.sqlx.chatroom.service;

import com.sqlx.chatroom.pojo.Chatroom;
import com.sqlx.chatroom.pojo.Result;
import com.sqlx.chatroom.pojo.User;

import java.util.List;

public interface ChatroomService {
    Result listAllChatroom();

    Result selectChatroomById(Integer id);

    Result addChatroom(Chatroom chatroom);

    Result addMember(Integer roomId,Integer userId);

    Result deleteMember(Integer roomId,Integer userId);
}
