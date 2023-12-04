package com.sqlx.chatroom.controller;


import com.sqlx.chatroom.pojo.GroupMessage;
import com.sqlx.chatroom.pojo.Result;
import com.sqlx.chatroom.pojo.User;
import com.sqlx.chatroom.service.GroupMessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
public class GroupMessageController {
    @Autowired
    private GroupMessageService groupMessageService;

    @GetMapping("/groupMessage/ByRoomId/{id}")
    public Result listAllGroupMessageById(@PathVariable("id") Integer id) {
        log.info("根据room_id查询某房间的聊天数据");
        return groupMessageService.selectGroupMessageByRoomId(id);
    }

    @MessageMapping("/groupMessage")
    public Result addMessage(@RequestBody GroupMessage groupMessage) {
        //记录日志
        log.info("新增聊天信息：{}", groupMessage);
        return groupMessageService.insertGroupMessageIntoChatroom(groupMessage);
    }
}
