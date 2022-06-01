const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 8080;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "alsdlWkd72!",
  database: "lychee",
});

app.use(cors());
app.use(express.json());

app.listen(port, function (req, res) {
  console.log("server run: " + port);
});

app.post("/", function (req, res) {});

app.post("/msgbox", function (req, res) {
  console.log(req.body.Id);
  const Id = req.body.Id;
  const SQL =
    "SELECT U.user_nickname AS buyer_nickname, K.seller_nickname, K.msgbox_id, K.seller_id, K.buyer_id, K.msg_content, K.msg_time\
    FROM `USER` U,\
    (SELECT U.user_nickname AS seller_nickname, B.msgbox_id, B.seller_id, B.buyer_id, M.msg_content, M.msg_time\
    FROM `USER` U, `MSGBOX` B, (\
      SELECT *\
      FROM (\
        SELECT *\
        FROM `MSG`\
        WHERE (msgbox_id, msg_time) IN (\
          SELECT msgbox_id, max(msg_time) AS msg_time\
          FROM `MSG` GROUP BY msgbox_id\
        ) \
        ORDER BY msg_time DESC\
      ) G\
      GROUP BY G.msgbox_id\
    ) M\
    WHERE (B.seller_id = ? or B.buyer_id = ?) AND B.msgbox_id = M.msgbox_id AND U.user_id = B.seller_id) K\
    WHERE U.user_id = K.buyer_id\
    ORDER BY K.msg_time DESC;";

  db.query(SQL, [Id, Id], function (err, rows) {
    if (err) console.log("msg 리스트 불러오기 실패");
    else {
      console.log("msg 리스트 불러오기 성공");
      res.send(rows);
    }
  });
});

app.post("/msgContent", function (req, res) {
  const RoomId = req.body.RoomId;
  console.log(RoomId);
  const SQL =
    "SELECT U.user_id, U.user_nickname, M.msg_time, M.msg_content, P.product_title, P.product_id\
    FROM `MSG` M, `USER` U, `MSGBOX` B, `PRODUCT` P\
    WHERE M.msgbox_id=? AND M.user_id = U.user_id AND M.msgbox_id = B.msgbox_id AND B.product_id = P.product_id\
    ORDER BY M.msg_time DESC;";

  db.query(SQL, RoomId, function (err, rows) {
    if (err) console.log("msg 내용 불러오기 실패");
    else {
      console.log("msg 내용 불러오기 성공");
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