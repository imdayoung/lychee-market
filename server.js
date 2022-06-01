const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 8080;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "lychee",
});

app.use(cors());
app.use(express.json());

app.listen(port, function (req, res) {
  console.log("server run: " + port);
});

app.post("/", function (req, res) {});

app.post("/chatroom", function (req, res) {
  const Id = req.body.Id;
  const SQL =
    "SELECT U.user_nickname AS buyer_nickname, K.seller_nickname, K.chatroom_id, K.seller_id, K.buyer_id, K.chat_content, K.chat_time\
    FROM `user` U,\
    (SELECT U.user_nickname AS seller_nickname, R.chatroom_id, R.seller_id, R.buyer_id, C.chat_content, C.chat_time\
    FROM `user` U, chatroom R, (\
      SELECT *\
      FROM (\
        SELECT *\
        FROM chat\
        WHERE (chatroom_id, chat_time) in (\
          SELECT chatroom_id, max(chat_time) as chat_time\
          FROM chat group by chatroom_id\
        ) \
        ORDER BY chat_time DESC\
      ) g\
      group by g.chatroom_id\
    ) C\
    WHERE (R.seller_id = 'mouse0429' or R.buyer_id = 'mouse0429') AND R.chatroom_id = C.chatroom_id AND U.user_id = R.seller_id) K\
    WHERE U.user_id = K.buyer_id\
    ORDER BY K.chat_time DESC;";

  db.query(SQL, [Id, Id], function (err, rows) {
    if (err) console.log("chat 리스트 불러오기 실패");
    else {
      console.log("chat 리스트 불러오기 성공");
      res.send(rows);
    }
  });
});

app.post("/chatContent", function (req, res) {
  const RoomId = req.body.RoomId;
  console.log(RoomId);
  const SQL =
    "SELECT U.user_id, U.user_nickname, C.chat_time, C.chat_content, P.product_title, P.product_id\
  FROM chat C, `user` U, chatroom R, product P\
  WHERE C.chatroom_id=? AND C.user_id = U.user_id AND C.chatroom_id = R.chatroom_id AND R.product_id = P.product_id\
  ORDER BY C.chat_time DESC;";

  db.query(SQL, RoomId, function (err, rows) {
    if (err) console.log("chat 내용 불러오기 실패");
    else {
      console.log("chat 내용 불러오기 성공");
      res.send(rows);
    }
  });
});



// 문의사항 상세보기
app.get('/qna/detail', function(req, res){
	var q_id = 'sy02lee';

	var sqlQna = 'SELECT * FROM `QNA` WHERE `q_id` = ?';
	db.query(sqlQna, q_id, function(err, row){
		if(err){
			console.log('문의사항 상세보기', err);
			res.send(false);
		}
		if(row){
			console.log(row);
			res.send(row);
		}
	});
})

// 공지사항 목록
app.get('/notice', function(req, res){
	const sqlNotice = 'SELECT `notice_id`,`manager_id`,`notice_date`,`notice_title` FROM `NOTICE`';
	db.query(sqlNotice, function(err, rows){
		if(err){
			console.log('공지사항 전체 불러오기 오류', err);
			res.send(false);
		}
		if(rows){
			console.log(rows);
			res.send(rows);
		}
	});
}) 

// 공지사항 작성
app.post('/notice/write', function(req, res){
	const managerId = req.body.manager_id;
	const noticeDate = req.body.notice_date;
	const noticeTitle = req.body.notice_title;
	const noticeContent =req.body.notice_content;
	const noticeImg = req.body.notice_img;
	const datas = [managerId, noticeDate, noticeTitle, noticeContent, noticeImg];

	const sqlNoticeInsert = 'INSERT INTO `NOTICE` (`manager_id`,`notice_date`,`notice_title`,`notice_content`,`notice_img`) VALUE	(?,?,?,?,?)';
	db.query(sqlNoticeInsert, datas, function(err, result){
		if(err)	{
			console.log('공지사항 insert 오류', result);
			res.send(false);
		}
		if(result) {
			console.log(result);
			res.send(true);
		}	
	});
})

// 공지사항 세부정보
app.get('/notice/read/:notice_id', function(req, res){
	const noticeId = req.params.notice_id;

	const sqlNoticeSelect = 'SELECT * FROM `NOTICE` WHERE `notice_id`=?';
	db.query(sqlNoticeSelect, noticeId, function(err, row){
		if(err){
			console.log('공지사항 select 오류', err);
			res.send(false);
		}
		if(row){
			console.log(row);
			res.send(row);
		}
	});
})

// 공지사항 수정
app.post('/notice/update', function(req, res){
	const noticeId = req.body.notice_id;
	const noticeDate = req.body.notice_date;
	const noticeTitle = req.body.notice_title;
	const noticeContent =req.body.notice_content;
	const noticeImg = req.body.notice_img;
	const datas = [noticeDate, noticeTitle, noticeContent, noticeImg, noticeId];

	const sqlNoticeUpdate = 'UPDATE `NOTICE` SET `notice_date`=?, `notice_title`=?, `notice_content`=?, `notice_img`=? WHERE `notice_id`=?';
	db.query(sqlNoticeUpdate, datas, function(err, result){
		if(err) {
			console.log('공지사항 update 오류', result);
			res.send(false);
		}
		if(result) {
			console.log(result);
			res.send(true);
		}
	});
})

// 공지사항 삭제
app.post('/notice/delete', function(req, res){
	const noticeId = req.body.notice_id;

	const sqlNoticeDelete = 'DELETE FROM `NOTICE` WHERE `notice_id`=?';
	db.query(sqlNoticeDelete, noticeId, function(err, result){
		if(err) {
			console.log('공지사항 delete 오류', result);
			res.send(false);
		}
		if(result) {
			console.log(result);
			res.send(true);
		}
	});
})

// 공지사항 검색
app.get('/notice/search/:word', function(req, res){
	const searchWord = req.params.word;

	const sqlNoticeSearch = "SELECT `notice_id`,`manager_id`,`notice_date`,`notice_title` FROM `NOTICE` WHERE `notice_title` LIKE ?";
	db.query(sqlNoticeSearch, '%'+searchWord+'%', function(err, rows){
		if(err){
			console.log('공지사항 검색 오류', err);
			res.send(false);
		}
		if(rows){
			console.log(rows);
			res.send(rows);
		}
	});
})