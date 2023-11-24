package com.sqlx.chatroom.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chatroom {
    private Integer roomId;
    private Integer creatorId;
    private String roomName;
}
