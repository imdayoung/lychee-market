insert into `user` values
('sy02lee','이승윤','2022-05-30','윤승','password','01072030939','서울 광진구',5000,62.9),
('tmddbs','윤승이','2022-06-01','tmddbs','password','01012345678','서울 광진구',5000,62.9);

insert into `manager` values
('admin1','password','관리자1'),
('admin2','password','관리자2'),
('admin3','password','관리자3');

insert into `qna` values (1,'sy02lee','2022-05-30','계정/인증','탈퇴 어떻게 하나요','탈퇴 하는 방법 좀 알려주세요',null,null,null,0,0);

insert into `notice` (`manager_id`,`notice_date`,`notice_title`,`notice_content`,`notice_img`) values
('admin1','2022-05-20','공지사항1','1번 공지사항입니다.',null),
('admin2','2022-05-25','공지사항2','2번 공지사항입니다.',null),
('admin3','2022-05-30','공지사항3','3번 공지사항입니다.',null);

INSERT INTO `PRODUCT` (`seller_id`,`product_title`,`product_category`,`product_price`,`product_like`,`product_date`,`product_detail`,`deal_method`,`deal_type`,`deal_flag`) VALUES
('sy02lee','이거 팝니다.','전자기기',50000,0,'2022-06-02','새 것 같은 이거 팝니다.','직거래',0,0),
('tmddbs','갤럭시워치 팝니다','전자기기',200000,0,'2022-06-03','핸드폰이 아이폰이에유...','택배거래',0,0);

INSERT INTO `MSGBOX` (`seller_id`,`buyer_id`,`product_id`) VALUES
('sy02lee','tmddbs',1);

INSERT INTO `MSG` (`msgbox_id`,`user_id`,`msg_content`,`msg_time`) VALUES
(1,'sy02lee','ask맨아!','2022-06-02 13:00');

INSERT INTO `REPORT` (`reporter_id`,`reported_id`,`report_date`,`report_title`,`report_type`,`report_detail`,`msgbox_id`,`product_id`,`solve_id`,`solve_date`,`solve_content`) VALUES
('sy02lee','tmddbs','2022-06-03','얘가 욕했어요','채팅 신고','얘가 이렇게 욕해쓰뮤ㅠ',1,null,null,null,null),
('sy02lee','tmddbs','2022-06-03','허위 매물이에요','게시물 신고','이 상품 구라야',null,1,'admin1','2022-06-03','해결해줌');
 
INSERT INTO `user` VALUES
('mouse0429', '김민지', '2022-05-01', '민감자', 'password1234', '01064012565', '일산동구 풍동', 0, 50),
('mouse0818', '김민쟈', '2022-05-02', '감자인척', 'password1234', '01064010001', '일산동구 식사동', 0, 50),
('dlekdud0102', '이다영', '2022-03-02', '영계백숙', 'password1234', '01064010002', '일산서구 대화동', 0, 50);

INSERT INTO `PRODUCT` VALUES
(0, 'mouse0429', null, '감자 팔아요', '식품', 1000, 0, '2022-05-04', null, 0, '싱싱해요', '직거래', 0, false),
(0, 'mouse0429', 'dlekdud0102', '고구마 팔아요', '식품', 1000, 0, '2022-05-04', null, 0, '싱싱해요', '직거래', 1, false),
(0, 'mouse0429', null, '당근 팔아요', '식품', 1000, 0, '2022-05-04', null, 0, '싱싱해요', '직거래', 0, false),
(0, 'mouse0818', null, '가지 팔아요', '식품', 1000, 0, '2022-05-04', null, 0, '싱싱해요', '직거래', 0, false),
(0, 'mouse0818', 'mouse0429', '오이 팔아요', '식품', 1000, 0, '2022-05-04', null, 0, '싱싱해요', '직거래', 1, false);

INSERT INTO `MSGBOX` VALUES
(0, 'mouse0429', 'mouse0818', 1),
(0, 'mouse0429', 'mouse0818', 2),
(0, 'mouse0429', 'dlekdud0102', 3),
(0, 'mouse0818', 'dlekdud0102', 4),
(0, 'mouse0818', 'mouse0429', 5);

INSERT INTO `MSG` VALUES
(0, 1, 'mouse0818', '감자 유기농인가요?', '2022-05-29 12:00:00'),
(0, 2, 'mouse0818', '고구마 호박 고구마 인가요 아니면 호구마인가요? 호구마? 호박고구마!', '2022-05-29 12:10:00'),
(0, 2, 'mouse0429', '고구마 호박 고구마 입니다 호구마 아니고 호박고구마!', '2022-05-29 12:20:00'),
(0, 3, 'dlekdud0102', '당근은 당근 싸게 팔죠?', '2022-05-29 12:50:00'),
(0, 4, 'dlekdud0102', '정말 가지가지 하시는데 가지 팔아주세요', '2022-05-29 12:40:00'),
(0, 5, 'mouse0429', '오이오이 오이쿤.. 오이를 팔아주지 않겠어?', '2022-05-29 12:30:00');

INSERT INTO product_like VALUES
(0, 'mouse0429', 4),
(0, 'mouse0429', 5);

INSERT INTO `POINT` VALUES
(0, '2022-06-04 21:00:00', 15000, 15000,'mouse0429', 'mouse0429', null),
(0, '2022-06-04 21:10:00', 10000, 25000,'mouse0429', 'dlekdud0102', 2),
(0, '2022-06-04 21:20:00', 15000, 10000,'mouse0818', 'mouse0429', 5);