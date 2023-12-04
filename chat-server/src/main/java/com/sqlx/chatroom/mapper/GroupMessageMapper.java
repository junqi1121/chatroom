package com.sqlx.chatroom.mapper;
import com.sqlx.chatroom.pojo.GroupMessage;
import com.sqlx.chatroom.pojo.Chatroom;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Mapper
public interface GroupMessageMapper {
    @Select("select * from group_message where Room_ID = #{id}")
    List<GroupMessage> selectGroupMessageByRoomId(Integer id);

    @Select("select * from group_message where Room_ID = #{room_id} and User_ID = #{user_id}")
    List<GroupMessage> selectGroupMessageByRoomIdAndUserId(Integer room_id, Integer user_id);

    @Insert("insert into group_message (Room_ID, User_ID, Content, Type, Time)" +
            " values (#{roomId},#{userId},#{content},#{type},#{time})")
    void insertGroupMessageIntoChatroom(GroupMessage groupMessage);

}
