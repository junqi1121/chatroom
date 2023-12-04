package com.sqlx.chatroom.controller;

import com.sqlx.chatroom.pojo.Result;
import com.sqlx.chatroom.pojo.User;
import com.sqlx.chatroom.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//用户管理控制器
@Slf4j
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public Result listAllUser() {
        log.info("查询所有用户数据");
        return userService.listAllUser();
    }

    @GetMapping("/users/ById/{id}")
    public Result listAllUserById(@PathVariable("id") Integer id) {
        log.info("根据id查询某用户数据");
        return userService.selectUserById(id);
    }

    @GetMapping("/users/ByRoomId/{roomId}")
    public Result selectUserByRoomId(@PathVariable("roomId") Integer roomId){
        log.info("根据roomId查询用户数据");
        return userService.selectUserByRoomId(roomId);
    }

    @PostMapping("/users")
    public Result addUser(@RequestBody User user) {
        //记录日志
        log.info("新增用户：{}", user);
        //调用service层添加功能
        //响应
        return userService.addUser(user);
    }

    @GetMapping("/users/confirm/{userName}/{userPwd}")
    public Result confirmUser(@PathVariable("userName") String name, @PathVariable("userPwd") String pwd){
        log.info("根据roomId查询用户数据");
        return userService.confirmUSer(name, pwd);
    }

}
