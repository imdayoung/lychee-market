INSERT INTO `USER` VALUES
('sy02lee','이승윤','2022-05-30','윤승','password','01072030939','서울 광진구 아차산로 549 (광장동, 광장현대파크빌)',5000,62),
('tmddbs','윤승이','2022-06-01','tmddbs','password','01012345678','서울 광진구 아차산로 549 (광장동, 광장현대파크빌)',5000,62),
('mouse0429', '김민지', '2022-05-01', '민감자', 'password1234', '01064012565', '경기 고양시 일산동구 숲속마을1로 116 (풍동, 숲속마을7단지아파트)', 10000, 50),
('mouse0818', '김민쟈', '2022-05-02', '감자인척', 'password1234', '01064010001', '경기 고양시 일산서구 호수로 896 (대화동, 장성마을4단지아파트)', 0, 50),
('dlekdud0102', '이다영', '2022-03-02', '영계백숙', 'password1234', '01064010002', '경기도 고양시 일산서구 호수로 896', 0, 50),
('jaejae', '이지예', '2022-04-24', '졔졔', 'passwd1234', '01002181234', '서울 노원구 광운로 20 (월계동, 광운대학교)', 0, 50);

INSERT INTO `MANAGER` VALUES
('admin1','password','관리자1'),
('admin2','password','관리자2'),
('admin3','password','관리자3');

INSERT INTO `QNA` VALUES 
(1,'sy02lee','2022-05-30','계정/인증','탈퇴 어떻게 하나요','탈퇴 하는 방법 좀 알려주세요',null,null,null,0,0);

INSERT INTO `NOTICE` (manager_id,notice_date,notice_title,notice_content,notice_img) VALUES
('admin1','2022-05-20','공지사항1','1번 공지사항입니다.',null),
('admin2','2022-05-25','공지사항2','2번 공지사항입니다.',null),
('admin3','2022-05-30','공지사항3','3번 공지사항입니다.',null);


INSERT INTO `PRODUCT` (`seller_id`,`buyer_id`,`product_title`,`product_category`,`product_price`,`product_like`,`product_date`,`product_img`,`product_img_num`,`product_detail`,`deal_method`,`deal_type`,`deal_flag`) VALUES
(NULL,'sy02lee','갤럭시워치 사요','디지털,가전',50000,0,'2022-06-02','/images/products/prod01.png',1,'갤럭시 워치를 사고 싶어요','직거래',0,0),
(NULL,'sy02lee','감자 사요','기타',1000,0,'2022-05-05','/images/products/prod02.png',1,'우에엥','직거래',0,0),
(NULL,'mouse0429','인형 사요','뷰티,미용',1000,0,'2022-05-05','/images/products/prod03.png',1,'굿','직거래',0,0),
(NULL,'mouse0429','아이폰 사요','디지털,가전',800000,1,'2022-06-03','/images/products/prod05.png',1,'핸드폰이 갤럭시에유!','택배거래',0,0),
(NULL,'mouse0429','리치 사요','생활,가공식품', 1000, 1, '2022-05-04','/images/products/prod06.png',1,'싱싱해요', '직거래', 0, 0),
(NULL,'mouse0429','당근 사요','패션 액세서리', 1000, 0, '2022-05-04','/images/products/prod08.png',1,'싱싱해요', '직거래', 0,0),
(NULL,'mouse0818','가지 사요','키덜트', 1000, 0, '2022-05-04','/images/products/prod09.png',1,'싱싱해요','직거래',0,0),
('tmddbs',NULL,'갤럭시워치 팝니다','디지털,가전',200000,0,'2022-06-03','/images/products/prod02.png',1,'핸드폰이 아이폰이에유...','택배거래',1,0),
('jaejae',NULL,'애플워치 팝니다','디지털,가전',400000,0,'2022-06-03','/images/products/prod03.png',1,'핸드폰이 갤럭시에유...','택배거래',1,0),
('dlekdud0102',NULL,'애플워치 팝니다','디지털,가전',100000,0,'2022-06-04','/images/products/prod04.png',1,'핸드폰이 갤럭시에유..!','택배거래',1,0),
('mouse0429',NULL,'고구마 팝니다','생활,가공식품', 1000, 0, '2022-05-04','/images/products/prod07.png',1,'새 것 같은 이거 팝니다.', '직거래', 1,0),
('mouse0818',NULL,'오이 팔아요','시계,쥬얼리', 1000, 0, '2022-05-04','/images/products/prod01.png',1,'싱싱해요','직거래', 1,0);

INSERT INTO `MSGBOX` VALUES
(0, 'mouse0429', 'mouse0818', 1),
(0, 'mouse0429', 'mouse0818', 2),
(0, 'mouse0429', 'dlekdud0102', 3),
(0, 'mouse0818', 'dlekdud0102', 4),
(0, 'mouse0818', 'mouse0429', 5),
(0, 'sy02lee','tmddbs',6);

INSERT INTO `MSG` VALUES
(0, 1, 'mouse0818', '감자 유기농인가요?', '2022-05-29 12:00:00'),
(0, 2, 'mouse0818', '고구마 호박 고구마 인가요 아니면 호구마인가요? 호구마? 호박고구마!', '2022-05-29 12:10:00'),
(0, 2, 'mouse0429', '고구마 호박 고구마 입니다 호구마 아니고 호박고구마!', '2022-05-29 12:20:00'),
(0, 3, 'dlekdud0102', '당근은 당근 싸게 팔죠?', '2022-05-29 12:50:00'),
(0, 4, 'dlekdud0102', '정말 가지가지 하시는데 가지 팔아주세요', '2022-05-29 12:40:00'),
(0, 5, 'mouse0429', '오이오이 오이쿤.. 오이를 팔아주지 않겠어?', '2022-05-29 12:30:00'),
(0, 6, 'sy02lee','ask맨아!','2022-06-02 13:00:00');

INSERT INTO `REPORT` (reporter_id,reported_id,report_date,report_title,report_type,report_detail,msgbox_id,product_id,solve_id,solve_date,solve_content) VALUES
('sy02lee','tmddbs','2022-06-03','얘가 욕했어요','쪽지 신고','얘가 이렇게 욕해쓰뮤ㅠ',1,null,null,null,null),
('sy02lee','tmddbs','2022-06-03','허위 매물이에요','게시글 신고','이 상품 구라야',null,1,'admin1','2022-06-03','해결해줌');

INSERT INTO `PRODUCT_LIKE` VALUES
(0, 'mouse0429', 4),
(0, 'mouse0429', 5);

INSERT INTO `POINT` VALUES
(0, '2022-06-04 21:00:00', 15000, 'mouse0429', 'mouse0429', null),
(0, '2022-06-04 21:10:00', 10000, 'mouse0429', 'dlekdud0102', 2),
(0, '2022-06-04 21:20:00', 15000, 'mouse0818', 'mouse0429', 5);