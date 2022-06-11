# CREATE 테이블
use lychee;
CREATE TABLE `USER`(
	`user_id` VARCHAR(15) NOT NULL,
    `user_name` VARCHAR(15) NOT NULL,
    `join_date` DATE NOT NULL,
    `user_nickname` VARCHAR(30) NOT NULL UNIQUE,
    `user_pwd` VARCHAR(30) NOT NULL,
    `user_phone` CHAR(11) NOT NULL UNIQUE,
    `user_location` VARCHAR(100) NOT NULL,
    `user_point` INT NOT NULL DEFAULT 0,
    `user_reliable` INT NOT NULL DEFAULT 50,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `PRODUCT` (
	`product_id` INT NOT NULL AUTO_INCREMENT,
    `seller_id` VARCHAR(15),
    `buyer_id` VARCHAR(15),
    `product_title` VARCHAR(20) NOT NULL,
    `product_category` VARCHAR(30) NOT NULL,
    `product_price` INT NOT NULL,
    `product_like` INT NOT NULL,
    `product_date` DATETIME NOT NULL,
    `product_img` VARCHAR(100) DEFAULT NULL,
    `product_img_num` INT NOT NULL DEFAULT 0,
	`product_detail` TEXT NOT NULL,
    `deal_method` VARCHAR(15) NOT NULL,
    `deal_type` BOOLEAN NOT NULL,
    `deal_flag` BOOLEAN NOT NULL,
    `distance` INT,
    PRIMARY KEY (`product_id`),
    FOREIGN KEY(`buyer_id`) REFERENCES `USER`(`user_id`) ON UPDATE CASCADE,
	FOREIGN KEY(`seller_id`) REFERENCES `USER`(`user_id`) ON UPDATE CASCADE
);

CREATE TABLE `MANAGER`(
	`manager_id` VARCHAR(15) NOT NULL UNIQUE,
	`manager_pw` VARCHAR(30) NOT NULL,
	`manager_nickname` VARCHAR(30) NOT NULL UNIQUE,
	PRIMARY KEY(`manager_id`)
);

CREATE TABLE `MSGBOX` (
	`msgbox_id` INT AUTO_INCREMENT NOT NULL,
	`seller_id` VARCHAR(15) NOT NULL,
	`buyer_id` VARCHAR(15) NOT NULL,
	`product_id` INT NOT NULL,
	PRIMARY KEY(`msgbox_id`),
	FOREIGN KEY(`seller_id`) REFERENCES `USER`(`user_id`) ON UPDATE CASCADE,
	FOREIGN KEY(`buyer_id`) REFERENCES `USER`(`user_id`) ON UPDATE CASCADE,
	FOREIGN KEY(`product_id`) REFERENCES `PRODUCT`(`product_id`) ON UPDATE CASCADE
);

CREATE TABLE `MSG` (
`msg_id` INT AUTO_INCREMENT,
`msgbox_id` INT NOT NULL,
`user_id` VARCHAR(15) NOT NULL,
`msg_content` VARCHAR(500) NOT NULL,
`msg_time` DATETIME NOT NULL,
PRIMARY KEY(`msg_id`),
FOREIGN KEY(`msgbox_id`) REFERENCES `MSGBOX`(`msgbox_id`) ON UPDATE CASCADE,
FOREIGN KEY(`user_id`) REFERENCES `USER`(`user_id`) ON UPDATE CASCADE
);

CREATE TABLE `NOTICE` (
    `notice_id` INT AUTO_INCREMENT,
    `manager_id` VARCHAR(15) NOT NULL,
    `notice_date` DATE NOT NULL,
    `notice_title` VARCHAR(200) NOT NULL,
    `notice_content` TEXT NOT NULL,
    `notice_img` VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY(`notice_id`),
    FOREIGN KEY(`manager_id`) REFERENCES `MANAGER`(`manager_id`) ON UPDATE CASCADE
);

CREATE TABLE `POINT` (
    `point_id` INT AUTO_INCREMENT,
    `deal_date` DATETIME NOT NULL,
    `deal_amount` INT NOT NULL,
    `left_point` INT NOT NULL,
    `receiver_id` VARCHAR(15) NOT NULL,
	`sender_id` VARCHAR(15) NOT NULL,
    `product_id` INT,
    PRIMARY KEY(`point_id`),
    FOREIGN KEY(`receiver_id`) REFERENCES `USER`(`user_id`) ON UPDATE CASCADE,
    FOREIGN KEY(`sender_id`) REFERENCES `USER`(`user_id`) ON UPDATE CASCADE
);

CREATE TABLE `QNA`(
	`qna_id` INT NOT NULL AUTO_INCREMENT,
    `q_id` VARCHAR(15) NOT NULL,
    `q_date` DATE NOT NULL,
    `q_category` VARCHAR(200) NOT NULL,
    `q_title` VARCHAR(200) NOT NULL,
    `q_content` TEXT NOT NULL,
    `a_id` VARCHAR(15) DEFAULT NULL,
    `a_date` DATE DEFAULT NULL,
    `a_content` TEXT DEFAULT NULL,
    `view` INT NOT NULL DEFAULT 0,
    `private_flag` BOOLEAN NOT NULL,
	PRIMARY KEY (`qna_id`),
    FOREIGN KEY (`q_id`) REFERENCES `USER` (`user_id`) ON UPDATE CASCADE,
    FOREIGN KEY (`a_id`) REFERENCES `MANAGER` (`manager_id`) ON UPDATE CASCADE
);

CREATE TABLE `REPORT`(
   `report_id` INT NOT NULL AUTO_INCREMENT,
    `reporter_id` VARCHAR(15) NOT NULL,
    `reported_id` VARCHAR(15) NOT NULL,
    `report_date` DATE NOT NULL,
    `report_title` VARCHAR(100) NOT NULL,
    `report_type` VARCHAR(15) NOT NULL,
    `report_detail` TEXT NOT NULL,
    `report_file` VARCHAR(100) DEFAULT NULL,
    `msgbox_id` INT DEFAULT NULL,
    `product_id` INT DEFAULT NULL,
    `solve_id` VARCHAR(15) DEFAULT NULL,
    `solve_date` DATE DEFAULT NULL, 
    `solve_content` TEXT DEFAULT NULL,
   PRIMARY KEY (`report_id`),
    FOREIGN KEY (`msgbox_id`) REFERENCES `MSGBOX` (`msgbox_id`) ON UPDATE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`product_id`) ON UPDATE CASCADE,
    FOREIGN KEY (`solve_id`) REFERENCES `MANAGER` (`manager_id`) ON UPDATE CASCADE
);

CREATE TABLE `PRODUCT_LIKE`(
	`like_id` INT AUTO_INCREMENT,
    `user_id` VARCHAR(15) NOT NULL,
	`product_id` INT NOT NULL,
    PRIMARY KEY (`like_id`),
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`) ON UPDATE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`product_id`) ON UPDATE CASCADE
);