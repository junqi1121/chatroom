package com.sqlx.chatroom.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupMessage {
    private Integer messageId;
    private Integer roomId;
    private Integer userId;
    private String content;
    private MessageType type;
    private Long time;
}
