package com.sqlx.chatroom.service.impl;

import com.sqlx.chatroom.mapper.UserMapper;
import com.sqlx.chatroom.pojo.Result;
import com.sqlx.chatroom.pojo.User;
import com.sqlx.chatroom.pojo.UserState;
import com.sqlx.chatroom.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.jdbc.Null;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Objects;


//用户管理业务实现类
@Slf4j
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public Result listAllUser() {
        try {
            List<User> userList = userMapper.selectAllUser();
            return Result.success(userList);
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    @Override
    public Result selectUserById(Integer id) {
        try {
            User aimUser = userMapper.selectUserById(id);
            return Result.success(aimUser);
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    @Override
    public Result addUser(User user) {
        try {
            if(userMapper.selectUserByName(user.getUserName()).isEmpty()){
                user.setUserState(UserState.ONLINE);
                userMapper.insertUser(user);
                return Result.success();
            }else {
                return Result.error("用户名已存在");
            }
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    @Override
    public Result selectUserByRoomId(Integer roomId) {
        try {
            List<User> userList = userMapper.selectUserByRoomId(roomId);
            return Result.success(userList);
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    @Override
    public Result confirmUSer(String userName, String userPwd){
        try {
            List<User> aimUser = userMapper.selectUserByName(userName);
            if(Objects.equals(aimUser.get(0).getUserPwd(), userPwd)){
                return Result.success();
            }else {
                return Result.error("密码错误或与id不匹配");
            }
        } catch (Exception e) {
            return Result.error("该用户不存在！");
        }
    }
}
