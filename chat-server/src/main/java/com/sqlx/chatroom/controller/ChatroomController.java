package com.sqlx.chatroom.controller;

import com.sqlx.chatroom.pojo.Chatroom;
import com.sqlx.chatroom.pojo.Result;
import com.sqlx.chatroom.pojo.User;
import com.sqlx.chatroom.service.ChatroomService;
import com.sqlx.chatroom.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//聊天室管理控制器
@Slf4j
@RestController
public class ChatroomController {
    @Autowired
    private ChatroomService chatroomService;

    @GetMapping("/chatrooms")
    public Result listAllChatroom() {
        log.info("查询所有聊天室数据");
        return chatroomService.listAllChatroom();
    }

    @GetMapping("/chatrooms/ByRoomId/{roomId}")
    public Result listAllChatroomByRoomId(@PathVariable("roomId") Integer roomId) {
        log.info("根据roomId查询特定聊天室");
        return chatroomService.selectChatroomById(roomId);
    }

    @GetMapping("/chatrooms/ByRoomName/{roomName}")
    public Result listAllChatroomByRoomName(@PathVariable("roomName") String name) {
        log.info("根据roomName查询特定聊天室");
        return chatroomService.selectChatroomByName(name);
    }

    @GetMapping("/chatrooms/ByUserId/{userId}")
    public Result listAllChatroomByUserId(@PathVariable("userId") Integer userId) {
        log.info("根据userId查询其参与的聊天室");
        return chatroomService.selectJoinedChatroomByUserId(userId);
    }

    @PostMapping("/chatrooms")
    public Result addChatroom(@RequestBody Chatroom chatroom) {
        log.info("新增聊天室：{}", chatroom);
        return chatroomService.addChatroom(chatroom);
    }

    @PostMapping("/chatrooms/member/{roomId}/{userId}")
    public Result addMember(@PathVariable("roomId") Integer roomId, @PathVariable("userId") Integer userId) {
        log.info("{}号聊天室新增聊天室成员：{}", roomId, userId);
        return chatroomService.addMember(roomId, userId);
    }

    @DeleteMapping("/chatrooms/member/{roomId}/{userId}")
    public Result deleteMember(@PathVariable("roomId") Integer roomId, @PathVariable("userId") Integer userId) {
        log.info("{}号聊天室的聊天室成员：{}，退出了", roomId, userId);
        return chatroomService.deleteMember(roomId, userId);
    }

}
