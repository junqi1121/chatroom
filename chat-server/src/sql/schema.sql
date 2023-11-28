-- Table 7.2.1: 用户信息数据表
CREATE TABLE User_Info (
                           User_ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                           User_State TINYINT(4) UNSIGNED DEFAULT 0,
                           User_Name VARCHAR(20) NOT NULL,
                           User_Pwd VARCHAR(20) NOT NULL
);

-- Table 7.2.2: 聊天室信息数据表
CREATE TABLE Chatroom_Info (
                               Room_ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                               Creator_ID INT(11) UNSIGNED DEFAULT 0,
                               Room_Name VARCHAR(20) NOT NULL
);

-- Table 7.2.3: 用户-聊天室举报信息数据表
CREATE TABLE User_Chatroom_Report (
                                      User_ID INT(11) UNSIGNED,
                                      Room_ID INT(11) UNSIGNED,
                                      Reason VARCHAR(191),
                                      Result TINYINT(4) UNSIGNED DEFAULT NULL,
                                      Time INT(11) UNSIGNED,
                                      PRIMARY KEY (User_ID, Room_ID)
);

-- Table 7.2.4: 聊天室管理员信息数据表
CREATE TABLE Chatroom_Admin_Info (
                                     User_ID INT(11) UNSIGNED,
                                     Room_ID INT(11) UNSIGNED,
                                     PRIMARY KEY (User_ID, Room_ID)
);

-- Table 7.2.5: 聊天室用户信息数据表
CREATE TABLE Chatroom_User_Info (
                                    User_ID INT(11) UNSIGNED,
                                    Room_ID INT(11) UNSIGNED,
                                    PRIMARY KEY (User_ID, Room_ID)
);

-- Table 7.2.6: 用户-聊天室申请加入信息数据表
CREATE TABLE User_Chatroom_Application (
                                           User_ID INT(11) UNSIGNED,
                                           Room_ID INT(11) UNSIGNED,
                                           Reason VARCHAR(191),
                                           Result TINYINT(4) UNSIGNED DEFAULT NULL,
                                           Time INT(11) UNSIGNED,
                                           PRIMARY KEY (User_ID, Room_ID)
);

-- Table 7.2.7: 群聊消息数据表
CREATE TABLE Group_Chat_Message (
                                    Message_ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                    Room_ID INT(11) UNSIGNED,
                                    User_ID INT(11) UNSIGNED,
                                    Content VARCHAR(191) NOT NULL,
                                    Type TINYINT(4) UNSIGNED DEFAULT NULL,
                                    Time INT(11) UNSIGNED
);

-- Table 7.2.8: 用户-群聊消息举报信息数据表
CREATE TABLE User_Group_Message_Report (
                                           User_ID INT(11) UNSIGNED,
                                           Message_ID INT(11) UNSIGNED,
                                           Reason VARCHAR(191),
                                           Result TINYINT(4) UNSIGNED DEFAULT NULL,
                                           Time INT(11) UNSIGNED,
                                           PRIMARY KEY (User_ID, Message_ID)
);

-- Table 7.2.9: 私聊消息数据表
CREATE TABLE Private_Chat_Message (
                                      Message_ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                      Sender_ID INT(11) UNSIGNED,
                                      Receiver_ID INT(11) UNSIGNED,
                                      Content VARCHAR(191) NOT NULL,
                                      Type TINYINT(4) UNSIGNED DEFAULT NULL,
                                      Time INT(11) UNSIGNED
);
