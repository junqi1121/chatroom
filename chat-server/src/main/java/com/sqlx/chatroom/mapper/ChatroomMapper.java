package com.sqlx.chatroom.mapper;
import com.sqlx.chatroom.pojo.User;
import org.apache.ibatis.annotations.*;
import com.sqlx.chatroom.pojo.Chatroom;

import java.util.List;

@Mapper
public interface ChatroomMapper {
    //查询所有部门数据
    @Select("select Room_ID, Room_Name, Creator_ID from chatroom")
    List<Chatroom> selectAllRoom();

    @Select("select Room_ID, Room_Name, Creator_ID from chatroom where Room_ID = #{id}")
    Chatroom selectChatroomById(Integer id);

//    @Select("select User_ID, User_Name, User_State, User_Pwd " +
//            "from chatroom_user_info natural join user " +
//            "where Room_ID = #{roomId}")
//    List<User> selectUserByRoomId(Integer roomId);

    @Insert("insert into chatroom (Room_Name, Creator_ID) values (#{roomName},#{creatorId})")
    @Options(useGeneratedKeys = true, keyProperty = "roomId")
    void insertChatroom(Chatroom chatroom);


    @Insert("insert into chatroom_user_info (User_ID, Room_ID) values (#{userId},#{roomId})")
    void insertMember(Integer roomId, Integer userId);

    @Delete("delete from chatroom_user_info where Room_ID = #{roomId} and User_ID = #{userId}")
    void deleteMember(Integer userId, Integer roomId);

}
