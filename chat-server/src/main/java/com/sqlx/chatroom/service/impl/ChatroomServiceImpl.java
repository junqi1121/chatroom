package com.sqlx.chatroom.service.impl;

import com.sqlx.chatroom.pojo.Chatroom;
import com.sqlx.chatroom.pojo.Result;
import com.sqlx.chatroom.mapper.ChatroomMapper;
import com.sqlx.chatroom.service.ChatroomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//聊天室管理业务实现类
@Slf4j
@Service
public class ChatroomServiceImpl implements ChatroomService {
    @Autowired
    private ChatroomMapper chatroomMapper;

    public Result listAllChatroom() {
        try {
            List<Chatroom> aimRoomList = chatroomMapper.selectAllRoom();
            return Result.success(aimRoomList);
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    public Result selectChatroomById(Integer id) {
        try {
            Chatroom aimRoom = chatroomMapper.selectChatroomByRoomId(id);
            return Result.success(aimRoom);
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    public Result selectJoinedChatroomByUserId(Integer id){
        try {
            List<Chatroom>  aimRooms =  chatroomMapper.selectJoinedChatroomByUserId(id);
            return Result.success(aimRooms);
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    public Result addChatroom(Chatroom chatroom) {
        try {
            chatroomMapper.insertChatroom(chatroom);
            chatroomMapper.insertMember(chatroom.getRoomId(),chatroom.getCreatorId());
            chatroomMapper.insertAdmin(chatroom.getRoomId(),chatroom.getCreatorId());
            return Result.success(chatroom);
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    public Result addMember(Integer roomId, Integer userId) {
        try {
            chatroomMapper.insertMember(roomId, userId);
            return Result.success();
        } catch (Exception e) {
            return Result.error("error");
        }
    }

    public Result deleteMember(Integer roomId, Integer userId) {
        try {
            chatroomMapper.deleteMember(roomId, userId);
            return Result.success();
        } catch (Exception e) {
            return Result.error("error");
        }
    }
}
