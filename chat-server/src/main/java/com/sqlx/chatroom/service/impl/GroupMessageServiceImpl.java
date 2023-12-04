package com.sqlx.chatroom.service.impl;

import com.sqlx.chatroom.mapper.GroupMessageMapper;
import com.sqlx.chatroom.pojo.GroupMessage;
import com.sqlx.chatroom.pojo.Result;
import com.sqlx.chatroom.service.GroupMessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

//聊天室管理业务实现类
@Slf4j
@Service
public class GroupMessageServiceImpl implements GroupMessageService {
    @Autowired
    private GroupMessageMapper groupMessageMapper;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    public Result selectGroupMessageByRoomId(Integer id){
        try {
            List<GroupMessage> aimMessageList =  groupMessageMapper.selectGroupMessageByRoomId(id);
            return Result.success(aimMessageList);
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    public Result selectGroupMessageByRoomIdAndUserId(Integer room_id, Integer user_id){
        try {
            List<GroupMessage> aimMessageList =  groupMessageMapper.selectGroupMessageByRoomIdAndUserId(room_id,user_id);
            return Result.success(aimMessageList);
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    public Result insertGroupMessageIntoChatroom(GroupMessage groupMessage){
        try {
            groupMessageMapper.insertGroupMessageIntoChatroom(groupMessage);
            messagingTemplate.convertAndSend("/topic/" + groupMessage.getRoomId(), groupMessage);
            return Result.success();
        } catch (Exception e) {
            log.error("!!!!!!!!!!!!!!!");
            return Result.error("error");
        }
    }

}
