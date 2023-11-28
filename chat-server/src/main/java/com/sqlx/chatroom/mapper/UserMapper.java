package com.sqlx.chatroom.mapper;

import com.sqlx.chatroom.pojo.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    //查询所有部门数据
    @Select("select User_ID,User_Name, User_State, User_Pwd from user")
    List<User> selectAllUser();

    @Select("select User_ID, User_Name, User_State, User_Pwd from user where User_ID = #{id}")
    User selectUserById(Integer id);

    @Select("select User_ID, User_Name, User_State, User_Pwd " +
            "from chatroom_user_info natural join user " +
            "where Room_ID = #{roomId}")
    List<User> selectUserByRoomId(Integer roomId);

    @Insert("insert into user (User_Name, User_State, User_Pwd) values (#{userName},#{userState},#{userPwd})")
    void insertUser(User user);


}
