-- Table 7.2.1: 用户信息数据表
CREATE TABLE user (
                           User_ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                           User_State enum('OFFLINE','ONLINE','FROZEN'),
                           User_Name VARCHAR(20) NOT NULL,
                           User_Pwd VARCHAR(20) NOT NULL
);

-- Table 7.2.2: 聊天室信息数据表
CREATE TABLE chatroom (
                               Room_ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                               Creator_ID INT(11) UNSIGNED DEFAULT 0,
                               Room_Name VARCHAR(20) NOT NULL
);

-- Table 7.2.3: 用户-聊天室举报信息数据表
CREATE TABLE user_chatroom_report (
                                      User_ID INT(11) UNSIGNED,
                                      Room_ID INT(11) UNSIGNED,
                                      Reason VARCHAR(191),
                                      Result TINYINT(4) UNSIGNED DEFAULT NULL,
                                      Time BIGINT,
                                      PRIMARY KEY (User_ID, Room_ID, Time)
);

-- Table 7.2.4: 聊天室管理员信息数据表
CREATE TABLE chatroom_admin_info (
                                     User_ID INT(11) UNSIGNED,
                                     Room_ID INT(11) UNSIGNED,
                                     PRIMARY KEY (User_ID, Room_ID)
);

-- Table 7.2.5: 聊天室用户信息数据表
CREATE TABLE chatroom_user_info (
                                    User_ID INT(11) UNSIGNED,
                                    Room_ID INT(11) UNSIGNED,
                                    PRIMARY KEY (User_ID, Room_ID)
);

-- Table 7.2.6: 用户-聊天室申请加入信息数据表
CREATE TABLE user_chatroom_application (
                                           User_ID INT(11) UNSIGNED,
                                           Room_ID INT(11) UNSIGNED,
                                           Reason VARCHAR(191),
                                           Result TINYINT(4) UNSIGNED DEFAULT NULL,
                                           Time BIGINT,
                                           PRIMARY KEY (User_ID, Room_ID)
);

-- Table 7.2.7: 群聊消息数据表
CREATE TABLE group_message (
                                    Message_ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                    Room_ID INT(11) UNSIGNED,
                                    User_ID INT(11) UNSIGNED,
                                    Content VARCHAR(191) NOT NULL,
                                    Type enum('TEXT','IMAGE','FILE','JOIN','LEAVE'),
                                    Time BIGINT
);

-- Table 7.2.8: 用户-群聊消息举报信息数据表
CREATE TABLE user_group_message_report (
                                           User_ID INT(11) UNSIGNED,
                                           Message_ID INT(11) UNSIGNED,
                                           Reason VARCHAR(191),
                                           Result TINYINT(4) UNSIGNED DEFAULT NULL,
                                           Time BIGINT,
                                           PRIMARY KEY (User_ID, Message_ID)
);

-- Table 7.2.9: 私聊消息数据表
CREATE TABLE private_message (
                                      Message_ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                      Sender_ID INT(11) UNSIGNED,
                                      Receiver_ID INT(11) UNSIGNED,
                                      Content VARCHAR(191) NOT NULL,
                                      Type enum('TEXT','IMAGE','FILE','JOIN','LEAVE'),
                                      Time BIGINT
);
