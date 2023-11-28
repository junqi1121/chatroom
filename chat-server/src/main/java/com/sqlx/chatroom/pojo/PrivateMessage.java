package com.sqlx.chatroom.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrivateMessage {
    private Integer messageId;
    private Integer senderId;
    private Integer receiverId;
    private String content;
    private MessageType type;
    private Long time;
}
