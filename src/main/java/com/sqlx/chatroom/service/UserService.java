package com.sqlx.chatroom.service;

import com.sqlx.chatroom.pojo.Result;
import com.sqlx.chatroom.pojo.User;

import java.util.List;

public interface UserService {
    Result listAllUser();

    Result selectUserById(Integer id);

    Result addUser(User user);

    Result selectUserByRoomId(Integer roomId);

    Result confirmUSer(String userName, String userPwd);
}
