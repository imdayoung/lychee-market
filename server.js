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

//쪽지 리스트 불러오기
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

//쪽지 내용 불러오기
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



/*
 * 목적: 문의사항 상세보기
 * input: qna_id
 * output: 해당 문의사항 전체 정보 / false
 */
app.get('/qna/detail', function(req, res){
	var QnaId = '1';	// 문의사항 번호, post로 수정 필요

	var SQL = 'SELECT * FROM `QNA` WHERE `qna_id` = ?';
	db.query(SQL, QnaId, function(err, row){
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

/*
 * 목적: 공지사항 목록
 * input: 
 * output: 전체 공지사항 정보 / false
 */
app.get('/notice', function(req, res){
	const SQL = 'SELECT `notice_id`,`manager_id`,`notice_date`,`notice_title` FROM `NOTICE`';
	db.query(SQL, function(err, rows){
		if(err){
			console.log('공지사항 전체 불러오기 오류', err);
			res.send(false);
		}
		if(rows){
			console.log('공지사항 전체 불러오기 결과', rows);
			res.send(rows);
		}
	});
}) 

/*
 * 목적: 공지사항 작성
 * input: manager_id, notice_date, notice_title, notice_content, notice_img
 * output: true / false
 */
app.post('/notice/write', function(req, res){
	const ManagerId = req.body.manager_id;
	const NoticeDate = req.body.notice_date;
	const NoticeTitle = req.body.notice_title;
	const NoticeContent =req.body.notice_content;
	const NoticeImg = req.body.notice_img;
	const Datas = [ManagerId, NoticeDate, NoticeTitle, NoticeContent, NoticeImg];

	const SQL = 'INSERT INTO `NOTICE` (`manager_id`,`notice_date`,`notice_title`,`notice_content`,`notice_img`) VALUE	(?,?,?,?,?)';
	db.query(SQL, Datas, function(err, result){
		if(err)	{
			console.log('공지사항 추가 오류', result);
			res.send(false);
		}
		if(result) {
			console.log('공지사항 추가 결과', result);
			res.send(true);
		}	
	});
})

/*
 * 목적: 공지사항 세부정보
 * input: notice_id
 * output: 해당 공지사항 전체 정보 / false
 */
app.get('/notice/read/:notice_id', function(req, res){
	const NoticeId = req.params.notice_id;

	const SQL = 'SELECT * FROM `NOTICE` WHERE `notice_id`=?';
	db.query(SQL, NoticeId, function(err, row){
		if(err){
			console.log('공지사항 세부 정보 불러오기 오류', err);
			res.send(false);
		}
		if(row){
			console.log('공지사항 세부 정보 불러오기 결과', row);
			res.send(row);
		}
	});
})

/*
 * 목적: 공지사항 수정
 * input: manager_id, notice_date, notice_title, notice_content, notice_img
 * output: true / false
 */
app.post('/notice/update', function(req, res){
	const ManagerId = req.body.manager_id;
	const NoticeDate = req.body.notice_date;
	const NoticeTitle = req.body.notice_title;
	const NoticeContent =req.body.notice_content;
	const NoticeImg = req.body.notice_img;
	const Datas = [ManagerId, NoticeDate, NoticeTitle, NoticeContent, NoticeImg];

	const SQL = 'UPDATE `NOTICE` SET `notice_date`=?, `notice_title`=?, `notice_content`=?, `notice_img`=? WHERE `notice_id`=?';
	db.query(SQL, Datas, function(err, result){
		if(err) {
			console.log('공지사항 수정 오류', result);
			res.send(false);
		}
		if(result) {
			console.log('공지사항 수정 결과', result);
			res.send(true);
		}
	});
})

/*
 * 목적: 공지사항 삭제
 * input: manager_id, notice_date, notice_title, notice_content, notice_img
 * output: true / false
 */
app.post('/notice/delete', function(req, res){
	const NoticeId = req.body.notice_id;

	const SQL = 'DELETE FROM `NOTICE` WHERE `notice_id`=?';
	db.query(SQL, NoticeId, function(err, result){
		if(err) {
			console.log('공지사항 삭제 오류', result);
			res.send(false);
		}
		if(result) {
			console.log('공지사항 삭제 결과', result);
			res.send(true);
		}
	});
})

/*
 * 목적: 공지사항 검색
 * input: 검색 단어
 * output: 해당 단어를 제목에 포함하는 공지사항 / false
 */
app.get('/notice/search/:word', function(req, res){
	const SearchWord = req.params.word;

	const SQL = "SELECT `notice_id`,`manager_id`,`notice_date`,`notice_title` FROM `NOTICE` WHERE `notice_title` LIKE ?";
	db.query(SQL, '%'+SearchWord+'%', function(err, rows){
		if(err){
			console.log('공지사항 검색 오류', err);
			res.send(false);
		}
		if(rows){
			console.log('공지사항 검색 결과', rows);
			res.send(rows);
		}
	});
})

/*
 * 목적: 내 신고 내역 불러오기
 * input: id
 * output: 해당 id로 신고한 정보 / false
 */
app.post('/report', function(req, res){
	const ReporterId = req.body.reporter_id;

	const SQL = 'SELECT `report_id`,`report_type`,`report_title`,`report_date`, `solve_id` FROM `REPORT` WHERE `reporter_id`=?';
	db.query(SQL, ReporterId, function(err, rows){
		if(err){
			console.log('신고 내역 불러오기 오류', err);
			res.send(false);
		}
		if(rows){
			console.log('신고 내역 불러오기 결과', rows);
			res.send(rows);
		}
	});
}) 

/*
 * 목적 : 로그인
 * input : id, pw
 * output : user에 대한 정보 / false
 */
app.post('/login', function(req, res) {
    const id = req.body.id;
    const pw = req.body.pw;

    db.query("SELECT * FROM `USER` WHERE `user_id` = ? AND `user_pwd` = ?", 
    [id, pw],
    (err, result) => {
        if(err){
            console.log("login error");
            res.send({err: err});
        }
        if(result.length > 0){
            console.log("login succeed!");
            res.send({result: result, message: "일반회원"});
        } else{
            db.query("SELECT * FROM `MANAGER` WHERE `manager_id` = ? AND `manager_pw` = ?",
            [id, pw],
            (err, result) => {
                if(err){
                    console.log("login_manager error");
                    res.send({err: err});
                }
                if(result.length > 0){
                    console.log("login_manager succeed!");
                    res.send({result: result, message: "매니저"});
                }
                else {
                    console.log("login fail");
                    res.send(false);
                }
            })
        }
    });
});


/*
 * 목적 : 아이디 찾기
 * input : name, phone
 * output : user id / "아이디 정보가 존재하지 않습니다!"
 */
app.post('/findid', function(req, res) {
    const name = req.body.name;
    const phone = req.body.phone;

    db.query("SELECT * FROM `USER` WHERE `user_name` = ? AND `user_phone` = ?", 
    [name, phone],
    (err, result) => {
        if(err){
            console.log("findid error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("findid succeed!");            
            res.send(result);
        } else{
            console.log("findid fail");
            res.send({message: "아이디 정보가 존재하지 않습니다!"});
        }
    });
});


/*
 * 목적 : 비밀번호 찾기
 * input : id, name, phone
 * output : user pw / "사용자 정보가 존재하지 않습니다!"
 */
app.post('/findpw', function(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const phone = req.body.phone;

    db.query("SELECT * FROM `USER` WHERE `user_id` = ? AND `user_name` = ? AND `user_phone` = ?", 
    [id, name, phone],
    (err, result) => {
        if(err){
            console.log("findpw error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("findpw succeed!");            
            res.send(result);
        } else{
            console.log("findpw fail");
            res.send({message: "사용자 정보가 존재하지 않습니다!"});
        }
    });
});


/*
 * 목적 : 회원가입
 * input : id, name, date, nickname, pw, phone, location
 * output : user 정보 / null
 */
app.post('/register', function(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const date = req.body.date;
    const nickname = req.body.nickname;
    const pw = req.body.pw;
    const phone = req.body.phone;
    const location = req.body.location;

    //console.log("info : "+id+"\n"+name+"\n"+date+"\n"+nickname+"\n"+pw+"\n"+phone+"\n"+location);

    db.query("INSERT INTO `USER` (`user_id`, `user_name`, `join_date`, `user_nickname`, `user_pwd`, `user_phone`, `user_location`) VALUES (?,?,?,?,?,?,?)", 
    [id, name, date, nickname, pw, phone, location],
    (err, result) => {
        if(err){
            console.log("register error");
            res.send({message: "실패"});
        }
        if(result){
            console.log("register succeed!");
            res.send({message: "성공"});
        }
    });
});

/*
 * 목적 : id 중복 확인
 * input : id
 * output : user 정보 / null
 */
app.post('/idoverlap', function(req, res) {
    const id = req.body.id;

    db.query("SELECT * FROM `USER` WHERE `user_id` = ?", 
    [id],
    (err, result) => {
        if(err){
            console.log("idoverlap error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("idoverlap succeed!");            
            res.send(result);
        } else{
            console.log("idoverlap fail");
            res.send();
        }
    });
});


/*
 * 목적 : phone 중복 확인
 * input : phone
 * output : user 정보 / null
 */
app.post('/phoneoverlap', function(req, res) {
    const phone = req.body.phone;

    db.query("SELECT * FROM `USER` WHERE `user_phone` = ?", 
    [phone],
    (err, result) => {
        if(err){
            console.log("phoneoverlap error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("phoneoverlap succeed!");            
            res.send(result);
        } else{
            console.log("phoneoverlap fail");
            res.send();
        }
    });
});

/*
 * 목적 : nickname 중복 확인
 * input : nickname
 * output : user 정보 / null
 */
app.post('/nickoverlap', function(req, res) {
    const nickname = req.body.nickname;

    db.query("SELECT * FROM `USER` WHERE `user_nickname` = ?", 
    [nickname],
    (err, result) => {
        if(err){
            console.log("nickoverlap error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("nickoverlap succeed!");            
            res.send(result);
        } else{
            console.log("nickoverlap fail");
            res.send();
        }
    });
});


/*
 * 목적 : 내 정보 불러오기
 * input : id
 * output : user 정보 / null
 */
app.post('/getmyinfo', function(req, res) {
    const id = req.body.id;

    db.query("SELECT * FROM `USER` WHERE `user_id` = ?", 
    [id],
    (err, result) => {
        if(err){
            console.log("getmyinfo error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("getmyinfo succeed!");            
            res.send(result);
        } else{
            console.log("getmyinfo fail");
            res.send({message: "정보가 존재하지 않습니다!"});
        }
    });
});


/*
 * 목적 : 내 정보 변경하기
 * input : id
 * output : user 정보 / null
 */
app.post('/changemyinfo', function(req, res) {
    const id = req.body.id;
    const pw = req.body.pw;
    const nickname = req.body.nickname;
    const location = req.body.location;
    
    db.query("UPDATE `USER` SET `user_pwd` = ?, `user_nickname` = ?, `user_location` = ? WHERE `user_id` = ?",
    [pw, nickname, location, id],
    (err, result) => {
        if(err){
            console.log("changemyinfo error");
            res.send({message: "실패"});
        }
        if(result){
            console.log("changemyinfo succeed!");
            res.send({message: "성공"});
        }
    });
});

