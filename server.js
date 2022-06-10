const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");
const app = express();
const port = 8080;

app.use(express.static("public"));

// 신고 이미지 저장 방식
const ReportStorage = multer.diskStorage({
  destination: "./public/images/report",
  filename: function(req, file, cb) {
    cb(null, "reportfile_" + Date.now() + path.extname(file.originalname));
  }
});

// 신고 이미지 업로드
const upload = multer({
  storage: ReportStorage,
  limits: { fileSize: 1000000 }
});

// 공지 이미지 저장 방식
const NoticeStorage = multer.diskStorage({
  destination: function(req, file, cb){  // 이미지 저장 위치
      cb(null, "./public/images/notice/");
  },
  filename: function(req, file, cb){  // 이미지 저장 이름
      cb(null, `${file.originalname}`);
  }
});

// 공지 이미지 업로드
const NoticeUpload = multer({
  storage: NoticeStorage,
  limits: { fileSize: 1000000 }
});

app.post("/uploadreportimg", upload.single("img"), function(req, res, next) {
  console.log(req.file.filename);
  res.send({
    fileName: req.file.filename
  });
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "lychee",
  multipleStatements: true,
});

app.use(cors());
app.use(express.json());

app.listen(port, function (req, res) {
  console.log("server run: " + port);
});

app.post("/", function (req, res) {});

/*
 * 목적: 쪽지함 리스트 가져오기
 * input: login_id
 * output: 쪽지함 리스트 / none
 */
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

/*
 * 목적: 쪽지 내역 보기
 * input: msgbox_id
 * output: 쪽지 내역 / none
 */
app.post("/msgContent", function (req, res) {
  const RoomId = req.body.RoomId;
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
 * 목적: 쪽지 보내기
 * input: msgbox_id, sender_id, msg_content, date
 * result: 쪽지 insert / false
 */
app.post("/msgSend", function (req, res) {
  const MsgBoxId = req.body.MsgBoxId;
  const Data = [
    req.body.MsgBoxId,
    req.body.SenderId,
    req.body.MsgContent,
    req.body.Date,
  ];
  const SQL = "INSERT INTO `MSG` VALUES (0, ?, ?, ?, ?);";
  db.query(SQL, Data, function (err, rows) {
    if (err) {
      console.log("쪽지 insert 실패");
      res.send(false);
    } else {
      console.log("쪽지 insert 성공");
      res.send({ MsgBoxId: MsgBoxId });
    }
  });
});

/*
 * 목적: 문의사항 상세보기
 * input: qna_id
 * output: 해당 문의사항 전체 정보 / false
 */
app.post("/qna/detail", function (req, res) {
  const QnaId = req.body.qna_id;

  var SQL = "SELECT * FROM `QNA` WHERE `qna_id` = ?";
  db.query(SQL, QnaId, function (err, row) {
    if (err) {
      console.log("문의사항 상세보기", err);
      res.send(false);
    }
    if (row) {
      console.log(row);
      res.send(row);
    }
  });
});

/*
 * 목적: 공지사항 목록
 * input:
 * output: 전체 공지사항 정보 / false
 */
app.get("/notice", function (req, res) {
  const SQL =
    "SELECT `notice_id`,`manager_id`,`notice_date`,`notice_title` FROM `NOTICE`";
  db.query(SQL, function (err, rows) {
    if (err) {
      console.log("공지사항 전체 불러오기 오류", err);
      res.send(false);
    }
    if (rows) {
      console.log("공지사항 전체 불러오기 결과", rows);
      res.send(rows);
    }
  });
});

/*
 * 목적: 공지사항 작성
 * input: manager_id, notice_date, notice_title, notice_content, notice_img
 * output: true / false
 */
app.post("/notice/write", /*upload.single('file'),*/ function (req, res) {
  const ManagerId = req.body.manager_id;
  const NoticeDate = req.body.notice_date;
  const NoticeTitle = req.body.notice_title;
  const NoticeContent = req.body.notice_content;
  const NoticeImg = req.body.notice_img;// req.body.file!==undefined?`/images/${req.file.filename}`:null;
  const Datas = [ManagerId, NoticeDate, NoticeTitle, NoticeContent, NoticeImg];

  const SQL =
    "INSERT INTO `NOTICE` (`manager_id`,`notice_date`,`notice_title`,`notice_content`,`notice_img`) VALUE	(?,?,?,?,?)";
  db.query(SQL, Datas, function (err, result) {
    if (err) {
      console.log("공지사항 추가 오류", result);
      res.send(false);
    }
    if (result) {
      console.log("공지사항 추가 결과", result);
      res.send(true);
    }
  });
});

/*
 * 목적: 공지사항 이미지 업로드
 * input: file
 * output: filename / false
 */
app.post("/upload/image", NoticeUpload.single('img'), function(req, res){
  console.log("이미지 업로드", req.file);
});

/*
 * 목적: 공지사항 세부정보
 * input: notice_id
 * output: 해당 공지사항 전체 정보 / false
 */
app.get("/notice/read/:notice_id", function (req, res) {
  const NoticeId = req.params.notice_id;

  const SQL = "SELECT * FROM `NOTICE` WHERE `notice_id`=?";
  db.query(SQL, NoticeId, function (err, row) {
    if (err) {
      console.log("공지사항 세부 정보 불러오기 오류", err);
      res.send(false);
    }
    if (row) {
      console.log("공지사항 세부 정보 불러오기 결과", row);
      res.send(row);
    }
  });
});

/*
 * 목적: 공지사항 수정
 * input: manager_id, notice_date, notice_title, notice_content, notice_img
 * output: true / false
 */
app.post("/notice/update", function (req, res) {
  const ManagerId = req.body.manager_id;
  const NoticeDate = req.body.notice_date;
  const NoticeTitle = req.body.notice_title;
  const NoticeContent = req.body.notice_content;
  const NoticeImg = req.body.notice_img;
  const Datas = [ManagerId, NoticeDate, NoticeTitle, NoticeContent, NoticeImg];

  const SQL =
    "UPDATE `NOTICE` SET `notice_date`=?, `notice_title`=?, `notice_content`=?, `notice_img`=? WHERE `notice_id`=?";
  db.query(SQL, Datas, function (err, result) {
    if (err) {
      console.log("공지사항 수정 오류", result);
      res.send(false);
    }
    if (result) {
      console.log("공지사항 수정 결과", result);
      res.send(true);
    }
  });
});

/*
 * 목적: 공지사항 삭제
 * input: manager_id, notice_date, notice_title, notice_content, notice_img
 * output: true / false
 */
app.post("/notice/delete", function (req, res) {
  const NoticeId = req.body.notice_id;

  const SQL = "DELETE FROM `NOTICE` WHERE `notice_id`=?";
  db.query(SQL, NoticeId, function (err, result) {
    if (err) {
      console.log("공지사항 삭제 오류", result);
      res.send(false);
    }
    if (result) {
      console.log("공지사항 삭제 결과", result);
      res.send(true);
    }
  });
});

/*
 * 목적: 공지사항 검색
 * input: 검색 단어
 * output: 해당 단어를 제목에 포함하는 공지사항 / false
 */
app.get("/notice/search/:word", function (req, res) {
  const SearchWord = req.params.word;

  const SQL =
    "SELECT `notice_id`,`manager_id`,`notice_date`,`notice_title` FROM `NOTICE` WHERE `notice_title` LIKE ?";
  db.query(SQL, "%" + SearchWord + "%", function (err, rows) {
    if (err) {
      console.log("공지사항 검색 오류", err);
      res.send(false);
    }
    if (rows) {
      console.log("공지사항 검색 결과", rows);
      res.send(rows);
    }
  });
});


/*
 * 목적: 내 신고 내역 불러오기
 * input: id
 * output: 해당 id로 신고한 정보 / false
 */
app.post("/report", function (req, res) {
  const ReporterId = req.body.reporter_id;

  const SQL =
    "SELECT `report_id`,`report_type`,`report_title`,`report_date`, `solve_id` FROM `REPORT` WHERE `reporter_id`=?";
  db.query(SQL, ReporterId, function (err, rows) {
    if (err) {
      console.log("신고 내역 불러오기 오류", err);
      res.send(false);
    }
    if (rows) {
      console.log("신고 내역 불러오기 결과", rows);
      res.send(rows);
    }
  });
});

/*
 * 목적: 신고 상세 내역 불러오기
 * input: report_id
 * output: 해당 번호의 신고 내역 / false
 */
app.get("/report/detail/:report_id", function (req, res) {
  const ReportId = req.params.report_id;

  const SQL = "SELECT * FROM `REPORT` WHERE `report_id`=?";
  db.query(SQL, ReportId, function (err, row) {
    if (err) {
      console.log("신고 상세 내역 불러오기 오류", err);
      res.send(false);
    }
    if (row) {
      console.log("신고 상세 내역 불러오기 결과", row);
      res.send(row);
    }
  });
});

/*
 * 목적: 신고된 게시물의 유형 가져오기
 * input: product_id
 * output: sell / buy
 */
app.post("/product/type", function (req, res) {
  const ProductId = req.body.product_id;
  console.log("productid:",ProductId)
;
  const SQL = "SELECT `deal_type` FROM `PRODUCT` WHERE `product_id` = ?";
  db.query(SQL, ProductId, function (err, row) {
    if (err) {
      console.log("신고된 게시물 유형 불러오기 오류", err);
      res.send(false);
    }
    else if (row === undefined) {
      console.log("신고된 게시물 존재하지 않음", row);
      res.send("deleted");
    }
    else{
      if (row[0].deal_type === 0) {
        console.log("신고된 게시물 유형 불러오기 결과: 판매");
        res.send("sell");
      }
      else if (row[0].deal_type === 1) {
        console.log("신고된 게시물 유형 불러오기 결과: 구매");
        res.send("buy");
      }
    }
  });
});


/*
 * 목적: 신고 답변 저장
 * input: report_id, solve_id, solve_date, solve_content
 * output: 해당 id로 신고한 정보 / false
 */
app.post("/report/answer", function (req, res) {
  const ReportId = req.body.report_id;
  const SolveId = req.body.solve_id;
  const SolveDate = req.body.solve_date;
  const SolveContent = req.body.solve_content;
  const datas = [SolveId, SolveDate, SolveContent, ReportId]

  const SQL = "UPDATE `REPORT` SET `solve_id`=?, `solve_date`=?, `solve_content`=? WHERE `report_id`=?";
  db.query(SQL, datas, function (err, result) {
    if (err) {
      console.log("신고 답변 저장 오류", err);
      res.send(false);
    }
    if (result) {
      console.log("신고 답변 저장 결과", result);
      res.send(true);
    }
  });
});

/*
 * 목적: 신고 삭제
 * input: report_id
 * output: true / false
 */
app.post("/report/delete", function (req, res) {
  const ReportId = req.body.report_id;

  const SQL = "DELETE FROM `REPORT` WHERE `report_id`=?";
  db.query(SQL, ReportId, function (err, result) {
    if (err) {
      console.log("신고 삭제 오류", err);
      res.send(false);
    }
    if (result) {
      console.log("신고 삭제 결과", result);
      res.send(true);
    }
  });
});

/*
 * 목적 : 로그인
 * input : id, pw
 * output : user에 대한 정보 / false
 */
app.post("/login", function (req, res) {
  const id = req.body.id;
  const pw = req.body.pw;

  db.query(
    "SELECT * FROM `USER` WHERE `user_id` = ? AND `user_pwd` = ?",
    [id, pw],
    (err, result) => {
      if (err) {
        console.log("login error");
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log("login succeed!");
        if(result[0].user_reliable === -1){
          res.send({message: "영구정지 처리된 회원입니다!"})
        }
        else
          res.send({ result: result, message: "일반회원" });
      } else {
        db.query(
          "SELECT * FROM `MANAGER` WHERE `manager_id` = ? AND `manager_pw` = ?",
          [id, pw],
          (err, result) => {
            if (err) {
              console.log("login_manager error");
              res.send({ err: err });
            }
            if (result.length > 0) {
              console.log("login_manager succeed!");
              res.send({ result: result, message: "매니저" });
            } else {
              console.log("login fail");
              res.send({message: "로그인 정보가 존재하지 않습니다!"});
            }
          }
        );
      }
    }
  );
});

/*
 * 목적 : 아이디 찾기
 * input : name, phone
 * output : user id / "아이디 정보가 존재하지 않습니다!"
 */
app.post("/findid", function (req, res) {
  const name = req.body.name;
  const phone = req.body.phone;

  db.query(
    "SELECT * FROM `USER` WHERE `user_name` = ? AND `user_phone` = ?",
    [name, phone],
    (err, result) => {
      if (err) {
        console.log("findid error");
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log("findid succeed!");
        res.send(result);
      } else {
        console.log("findid fail");
        res.send({ message: "아이디 정보가 존재하지 않습니다!" });
      }
    }
  );
});

/*
 * 목적 : 비밀번호 찾기
 * input : id, name, phone
 * output : user pw / "사용자 정보가 존재하지 않습니다!"
 */
app.post("/findpw", function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const phone = req.body.phone;

  db.query(
    "SELECT * FROM `USER` WHERE `user_id` = ? AND `user_name` = ? AND `user_phone` = ?",
    [id, name, phone],
    (err, result) => {
      if (err) {
        console.log("findpw error");
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log("findpw succeed!");
        res.send(result);
      } else {
        console.log("findpw fail");
        res.send({ message: "사용자 정보가 존재하지 않습니다!" });
      }
    }
  );
});

/*
 * 목적 : 회원가입
 * input : id, name, date, nickname, pw, phone, location
 * output : user 정보 / null
 */
app.post("/register", function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const date = req.body.date;
  const nickname = req.body.nickname;
  const pw = req.body.pw;
  const phone = req.body.phone;
  const location = req.body.location;

  //console.log("info : "+id+"\n"+name+"\n"+date+"\n"+nickname+"\n"+pw+"\n"+phone+"\n"+location);

  db.query(
    "INSERT INTO `USER` (`user_id`, `user_name`, `join_date`, `user_nickname`, `user_pwd`, `user_phone`, `user_location`) VALUES (?,?,?,?,?,?,?)",
    [id, name, date, nickname, pw, phone, location],
    (err, result) => {
      if (err) {
        console.log("register error");
        res.send({ message: "실패" });
      }
      if (result) {
        console.log("register succeed!");
        res.send({ message: "성공" });
      }
    }
  );
});

/*
 * 목적 : id 중복 확인
 * input : id
 * output : user 정보 / null
 */
app.post("/idoverlap", function (req, res) {
  const id = req.body.id;

  db.query("SELECT * FROM `USER` WHERE `user_id` = ?", [id], (err, result) => {
    if (err) {
      console.log("idoverlap error");
      res.send({ err: err });
    }
    if (result.length > 0) {
      console.log("idoverlap succeed!");
      res.send(result);
    } else {
      db.query(
        "SELECT * FROM `MANAGER` WHERE `manager_id` = ?",
        [id],
        (err, result) => {
          if (err) {
            console.log("idoverlap_manager error");
            res.send({ err: err });
          }
          if (result.length > 0) {
            console.log("idoverlap_manager succeed!");
            res.send(result);
          } else {
            console.log("idoverlap fail");
            res.send();
          }
        }
      );
    }
  });
});

/*
 * 목적 : phone 중복 확인
 * input : phone
 * output : user 정보 / null
 */
app.post("/phoneoverlap", function (req, res) {
  const phone = req.body.phone;

  db.query(
    "SELECT * FROM `USER` WHERE `user_phone` = ?",
    [phone],
    (err, result) => {
      if (err) {
        console.log("phoneoverlap error");
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log("phoneoverlap succeed!");
        res.send(result);
      } else {
        console.log("phoneoverlap fail");
        res.send();
      }
    }
  );
});

/*
 * 목적 : nickname 중복 확인
 * input : nickname
 * output : user 정보 / null
 */
app.post("/nickoverlap", function (req, res) {
  const nickname = req.body.nickname;

  db.query(
    "SELECT * FROM `USER` WHERE `user_nickname` = ?",
    [nickname],
    (err, result) => {
      if (err) {
        console.log("nickoverlap error");
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log("nickoverlap succeed!");
        res.send(result);
      } else {
        db.query(
          "SELECT * FROM `MANAGER` WHERE `manager_nickname` = ?",
          [nickname],
          (err, result) => {
            if (err) {
              console.log("nickoverlap_manager error");
              res.send({ err: err });
            }
            if (result.length > 0) {
              console.log("nickoverlap_manager succeed!");
              res.send(result);
            } else {
              console.log("nickoverlap fail");
              res.send();
            }
          }
        );
      }
    }
  );
});

/*
 * 목적 : 내 정보 불러오기
 * input : id
 * output : user 정보 / null
 */
app.post("/getmyinfo", function (req, res) {
  const id = req.body.id;

  db.query("SELECT * FROM `USER` WHERE `user_id` = ?", [id], (err, result) => {
    if (err) {
      console.log("getmyinfo error");
      res.send({ err: err });
    }
    if (result.length > 0) {
      console.log("getmyinfo succeed!");
      res.send(result);
    } else {
      console.log("getmyinfo fail");
      res.send({ message: "정보가 존재하지 않습니다!" });
    }
  });
});

/*
 * 목적 : 내 정보 변경하기
 * input : id
 * output : user 정보 / null
 */
app.post("/changemyinfo", function (req, res) {
  const id = req.body.id;
  const pw = req.body.pw;
  const nickname = req.body.nickname;
  const location = req.body.location;

  db.query(
    "UPDATE `USER` SET `user_pwd` = ?, `user_nickname` = ?, `user_location` = ? WHERE `user_id` = ?",
    [pw, nickname, location, id],
    (err, result) => {
      if (err) {
        console.log("changemyinfo error");
        res.send({ message: "실패" });
      }
      if (result) {
        console.log("changemyinfo succeed!");
        res.send({ message: "성공" });
      }
    }
  );
});

/*
 * 목적: 게시글 관리
 * input: 관리자인 경우만 res 받아오도록 수정 필요
 * output: 전체 게시글 정보 / false
 */
app.get("/manager/product", function (req, res) {
  const SQL =
    "SELECT P.`product_id`,IF(`deal_type`=0,`seller_id`,`buyer_id`) AS `writer_id`,`product_category`,\
    `product_title`,`product_price`, `report_id` FROM `PRODUCT` P LEFT OUTER JOIN `REPORT` R ON P.`product_id` = R.`product_id`";
  db.query(SQL, function (err, rows) {
    if (err) {
      console.log("게시글 관리 불러오기 오류", err);
      res.send(false);
    }
    if (rows) {
      console.log("게시글 관리 불러오기 결과", rows);
      res.send(rows);
    }
  });
});

/*
 * 목적: 게시글 관리자가 삭제
 * input: product_id
 * output: true / false
 */
app.post("/manager/product", function (req, res) {
  const ProductId = req.body.product_id;

  const SQL ="DELETE FROM `PRODUCT` WHERE `product_id`=?";
  db.query(SQL, ProductId, function (err, result) {
    if (err) {
      console.log("게시글 삭제 오류", result);
      res.send(false);
    }
    if (rows) {
      console.log("게시글 삭제 결과", result);
      res.send(true);
    }
  });
});

/*
 * 목적: 사용자 관리
 * input: 관리자인 경우만 res 받아오도록 수정 필요
 * output: 전체 사용자 정보 / false
 */
app.get("/manager/user", function (req, res) {
  const SQL =
    "SELECT `user_id`,`user_nickname`,`user_name`,`user_reliable` FROM `USER`";
  db.query(SQL, function (err, rows) {
    if (err) {
      console.log("사용자 관리 불러오기 오류", err);
      res.send(false);
    }
    if (rows) {
      console.log("사용자 관리 불러오기 결과", rows);
      res.send(rows);
    }
  });
});

/*
 * 목적: 사용자 신뢰도 관리자가 조정
 * input: 관리자인 경우만 res 받아오도록 수정 필요
 * output: true / false
 */
app.post("/manager/user/reliable", function (req, res) {
  const UserId = req.body.user_id;
  const Reliable = req.body.user_reliable;

  const SQL = "UPDATE `USER` SET `user_reliable`=? WHERE `user_id`=?";
  db.query(SQL, [Reliable,UserId], function (err, result) {
    if (err) {
      console.log("사용자 신뢰도 조정 오류", result);
      res.send(false);
    }
    if (rows) {
      console.log("사용자 신뢰도 조정 결과", result);
      res.send(true);
    }
  });
});

/*
 * 목적: 사용자 영구 정지
 * input: user_id
 * output: true / false
 */
app.post("/manager/user", function (req, res) {
  const UserId = req.body.user_id;

  const SQL = "UPDATE `USER` SET `user_reliable`=-1 WHERE `user_id`=?";
  db.query(SQL, [Reliable,UserId], function (err, result) {
    if (err) {
      console.log("사용자 영구 정지 오류", result);
      res.send(false);
    }
    if (rows) {
      console.log("사용자 영구 정지 결과", result);
      res.send(true);
    }
  });
});

/*
 * 목적: 신고글 관리
 * input: 관리자인 경우만 res 받아오도록 수정 필요
 * output: 전체 신고글 정보 / false
 */
app.get("/manager/report", function (req, res) {
  const SQL =
    "SELECT `report_id`,`report_type`,`report_title`,`reporter_id` ,`report_date`, `solve_id` FROM `REPORT`";
  db.query(SQL, function (err, rows) {
    if (err) {
      console.log("신고글 관리 불러오기 오류", err);
      res.send(false);
    }
    if (rows) {
      console.log("신고글 관리 불러오기 결과", rows);
      res.send(rows);
    }
  });
});

/*
 * 목적: 마이페이지 기본 정보 불러오기
 * input: login_id
 * output: 마이페이지 정보 / none
 */
app.post("/mypage", function (req, res) {
  console.log(req.body.Id);
  const Id = req.body.Id;
  const SQL =
    "SELECT user_nickname, user_phone, user_location, user_point, user_reliable FROM `USER` WHERE user_id = ?;";
  db.query(SQL, Id, function (err, rows) {
    if (err) {
      console.log("마이페이지 정보 불러오기 실패", err);
    } else {
      console.log("마이페이지 정보 불러오기 성공");
      res.send(rows[0]);
    }
  });
});

/*
 * 목적: 마이페이지 구매내역, 판매내역, 찜한내역 불러오기
 * input: login_id, type
 * output: 마이페이지 구매내역,판매내역,찜한내역 / none
 */
app.post("/mypage/:type", function (req, res) {
  const Id = req.body.Id;
  var SQL = "";
  switch (req.params.type) {
    case "sell":
      switch (req.body.Option) {
        case "all":
          SQL = "SELECT * FROM `Product` WHERE seller_id = ?;"
          break;
        case "doing":
          SQL = "SELECT * FROM `Product` WHERE seller_id = ? AND deal_flag=0;"
          break;
        case "done":
          SQL = "SELECT * FROM `Product` WHERE seller_id = ? AND deal_flag=1;"
          break;
      }
      break;
    case "buy":
      switch (req.body.Option) {
        case "all":
          SQL = "SELECT * FROM `Product` WHERE buyer_id = ?;"
          break;
        case "doing":
          SQL = "SELECT * FROM `Product` WHERE buyer_id = ? AND deal_flag=0;"
          break;
        case "done":
          SQL = "SELECT * FROM `Product` WHERE buyer_id = ? AND deal_flag=1;"
          break;
      }
      break;
    case "like":
      switch (req.body.Option) {
        case "all":
          SQL = "SELECT * FROM product P INNER JOIN product_like L ON P.product_id = L.product_id WHERE L.user_id = ?;"
          break;
        case "doing":
          SQL = "SELECT * FROM product P INNER JOIN product_like L ON P.product_id = L.product_id WHERE L.user_id = ? AND P.deal_flag = 0;"
          break;
        case "done":
          SQL = "SELECT * FROM product P INNER JOIN product_like L ON P.product_id = L.product_id WHERE L.user_id = ? AND P.deal_flag = 1;"
          break;
      }
      break;
  }

  db.query(SQL, Id, function(err, rows){
    if(err) {
      console.log('마이페이지 내역 정보 불러오기 실패', err);
    } else {
      console.log('마이페이지 내역 정보 불러오기 성공');
      res.send(rows);
    }
  })
});

/*
 * 목적 : 신고 글 작성
 * input : 필요한 정보 모두
 * output : 실패 / 성공
 */
app.post('/reportwrite', function(req, res) {
    const reporterid = req.body.reporterid;
    const reportedid = req.body.reportedid;
    const type = req.body.type;
    const date = req.body.date;
    const title = req.body.title;
    const detail = req.body.detail;

    const attach = req.body.fileName;
    const cid = req.body.cid;
    const pid = req.body.pid;

    const datas = [reporterid, reportedid, date, title, type, detail, attach, cid, pid];

    console.log(datas);
    
    db.query("INSERT INTO `REPORT` (`reporter_id`, `reported_id`, `report_date`, `report_title`, `report_type`,\
     `report_detail`, `report_file`, `chatroom_id`, `product_id`) VALUES (?,?,?,?,?,?,?,?,?);",

    datas, (err, result) => {
        if(err){
            console.log("writereport error");
            res.send({message: "실패"});
        }
        if(result){
            console.log("writereport succeed!");
            res.send({message: "성공"});
        }
    });
});


/*
 * 목적 : 제품 판매/구매 글 작성
 * input : 
 * output : 
 */
app.post('/newproduct', function(req, res) {

  const date = req.body.date;
  const sellerid = req.body.sellerid;
  const buyerid = req.body.buyerid;
  const like = req.body.like;
  const image_num = req.body.image_num;
  const dealflag = req.body.dealflag;
  const dealtype = req.body.dealtype;
  const title = req.body.title
  const category = req.body.category;
  const price = req.body.price;
  const detail = req.body.detail;
  const dealmethod = req.body.dealmethod;
  const image = req.body.image;

    // const datas = [sellerid, buyerid, title, category, price, like, 
    //     date, image, image_num, detail, dealmethod, dealtype, dealflag];
  const datas = [sellerid, buyerid, title, category, price, like, 
    date, detail, dealmethod, dealtype, dealflag];

  console.log(datas);
  
  // db.query("INSERT INTO `PRODUCT` (`seller_id`, `buyer_id`, `product_title`, `product_category`, `product_price`,\
  //  `product_like`, `product_date`, `product_img`, `product_img_num`, `product_detail`, `deal_method`, `deal_type`, `deal_flag`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
  db.query("INSERT INTO `PRODUCT` (`seller_id`, `buyer_id`, `product_title`, `product_category`, `product_price`,\
  `product_like`, `product_date`, `product_detail`, `deal_method`, `deal_type`, `deal_flag`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    datas, (err, result) => {
      if(err){
        console.log("newproduct error");
        res.send({message: "실패"});
      }
      if(result){
          //db.query("SELECT `product_id` FROM `PRODUCT` WHERE ")
        console.log("newproduct succeed!");
        res.send({message: "성공"});
      }
  });
});

/*
 * 목적: 마이페이지 포인트내역 불러오기
 * input: login_id
 * output: 마이페이지 포인트 내역 / none
 */
app.post("/point", function (req, res) {
  const Id = req.body.Id;
  const SQL =
    "SELECT P.deal_date, P.deal_amount, P.receiver_id, U.user_nickname AS receiver_nickname, P.sender_id, S.user_nickname AS sender_nickname, P.product_id, D.product_title \
  FROM ((`POINT` AS P LEFT OUTER JOIN `PRODUCT` D ON P.product_id = D.product_id) \
  INNER JOIN `USER` AS U ON P.receiver_id = U.user_id)\
  INNER JOIN `USER` AS S On P.sender_id = S.user_id\
  WHERE P.receiver_id = ? OR P.sender_id = ?\
  ORDER BY deal_date DESC;";

  db.query(SQL, [Id, Id], function (err, rows) {
    if (err) {
      console.log("마이페이지 포인트 내역 불러오기 실패", err);
    } else {
      console.log("마이페이지 포인트 내역 불러오기 성공");
      res.send(rows);
    }
  });
});

/*
 * 목적: 마이페이지 포인트 충전하기
 * input: user_id, user_password, point_amount
 * output: true / false
 */
app.post("/pointcharge", function (req, res) {
  const Id = req.body.PointId;
  const Pw = req.body.PointPw;
  const PointAmount = req.body.PointAmount;
  const Date = req.body.Date;

  const PwCheckSQL = "SELECT * FROM `USER` WHERE user_id=? AND user_pwd=?;";
  const InsertSQL = "INSERT INTO `POINT` VALUES (0, ?, ?, ?, ?, null);";
  const UpdateSQL =
    "UPDATE `USER` SET user_point=user_point+? WHERE user_id=?;";

  db.query(PwCheckSQL, [Id, Pw], function (err, rows) {
    if (err) {
      console.log("포인트 충전 아이디, 패스워드 일치 에러");
      res.send(false);
    } else {
      if (rows.length > 0){
        db.query(
          InsertSQL + UpdateSQL,
          [Date, PointAmount, Id, Id, PointAmount, Id],
          function (err2, result) {
            if (err2) {
              console.log("포인트 충전 insert 실패");
              res.send(false);
            } else {
              console.log("포인트 충전 insert 성공");
              res.send(true);
            }
          }
        );
      } else {
        console.log("아이디, 패스워드 불일치");
        res.send(false);
      }
    }
  });
});

/*
 * 목적: 쪽지함 포인트 송금하기
 * input: sender_id, sender_pw, receiver_id, point_amount, date
 * output: true / 에러메세지
 */
app.post("/pointsend", function (req, res) {
  const SenderId = req.body.SenderId;
  const SenderPw = req.body.SenderPw;
  const ReceiverId = req.body.ReceiverId;
  const PointAmount = req.body.PointAmount;
  const Date = req.body.Date;
  const ProductId = req.body.ProductId;

  console.log(SenderId, SenderPw, ReceiverId, PointAmount, Date, ProductId);
  const PwCheckSQL = "SELECT * FROM `USER` WHERE user_id=? AND user_pwd=?;";
  const PointCheckSQL =
    "SELECT * FROM `USER` WHERE User_id=? AND user_point>=?";
  const UpdateSQL =
    "UPDATE `USER` SET user_point=user_point+? WHERE user_id=?;\
  UPDATE `USER` SET user_point=user_point-? WHERE user_id=?;";
  const InsertSQL = "INSERT INTO `POINT` VALUES (0, ?, ?, ?, ?, ?);";

  db.query(PwCheckSQL, [SenderId, SenderPw], function (err, rows) {
    if (err) {
      console.log("포인트 송금 아이디 체크 에러");
      res.send(err);
    } else {
      if (rows.length > 0) {
        db.query(
          PointCheckSQL,
          [SenderId, PointAmount],
          function (err2, rows2) {
            if (err2) {
              console.log("포인트 송금 잔여 포인트 체크 에러");
              res.send(err2);
            } else {
              if (rows2.length > 0) {
                db.query(
                  UpdateSQL + InsertSQL,
                  [
                    PointAmount,
                    ReceiverId,
                    PointAmount,
                    SenderId,
                    Date,
                    PointAmount,
                    ReceiverId,
                    SenderId,
                    ProductId,
                  ],
                  function (err3, row3) {
                    if (err3) {
                      console.log("포인트 업데이트 에러");
                      res.send(err3);
                    } else {
                      console.log("포인트 업데이트 성공");
                      res.send(true);
                    }
                  }
                );
              } else {
                res.send(
                  "잔여 포인트가 충분하지 않습니다. 포인트 충전 후 다시 이용해주세요."
                );
              }
            }
          }
        );
      } else {
        res.send("아이디와 패스워드가 일치하지 않습니다.");
      }
    }
  });
});

/*
 * 목적 : 문의 글 작성
 * input : 필요한 정보 모두
 * output : 실패 / 성공
 */
app.post('/qnawrite', function(req, res) {
  const id = req.body.id;
  const title = req.body.title;
  const category = req.body.category;
  const pflag = req.body.pflag;
  const content = req.body.content;
  const date = req.body.date;
  const view = req.body.view;

  const datas = [id, date, category, title, content, view, pflag];
  console.log(datas);
  
  db.query("INSERT INTO `QNA` (`q_id`, `q_date`, `q_category`, `q_title`,\
  `q_content`, `view`, `private_flag`) VALUES (?,?,?,?,?,?,?);",

  datas, (err, result) => {
      if(err){
          console.log("writeqna error");
          res.send(false);
      }
      if(result){
          console.log("writeqna succeed!");
          db.query("SELECT `qna_id` FROM `QNA` WHERE `q_id`=? AND `q_date`=? AND `q_category`=? AND\
          `q_title`=? AND `q_content`=? AND `view`=? AND `private_flag`=?",
          datas, (err, result) => {
            if(err){
              console.log("writeqna_get qna id error");
              return;
            }
            if(result){
              console.log("writeqna_get qna id error");
              res.send({id: result[0].qna_id});
            }
          })
          //res.send();
      }
  });
});

/*
 * 목적: qna 목록
 * input:
 * output: 전체 문의사항 정보 / false
 */
app.get("/qna", function (req, res) {
  const SQL =
    "SELECT `qna_id`,`q_id`,`q_date`,`q_category`,`q_title`,`a_id`,`view`,`private_flag` FROM `QNA`";
  db.query(SQL, function (err, result) {
    if(err) {
      console.log("get qna error", err);
      res.send(false);
    }
    if(result) {
      console.log("get qna result ", result);
      res.send(result);
    }
  });
});

/*
 * 목적: qna 세부정보
 * input: qna_id
 * output: 해당 문의사항 전체 정보 / false
 */
app.get("/qna/read/:qna_id", function (req, res) {
  const QnaId = req.params.qna_id;

  const SQL = "SELECT * FROM `QNA` WHERE `qna_id`=?";
  db.query(SQL, QnaId, function (err, result) {
    if (err) {
      console.log("qna read error", err);
      res.send(false);
    }
    if (result) {
      console.log("qna read result", result);
      res.send(result);
    }
  });
});


/*
 * 목적: qna 삭제
 * input: 문의사항 글 id
 * output: true / false
 */
app.post("/qna/delete", function (req, res) {
  const qid = req.body.qid;

  const SQL = "DELETE FROM `QNA` WHERE `qna_id`=?";
  db.query(SQL, qid, function (err, result) {
    if (err) {
      console.log("qna delete error", result);
      res.send(false);
    }
    if (result) {
      console.log("qna delete result", result);
      res.send(true);
    }
  });
});

/*
 * 목적: qna 답변
 * input: 
 * output: true / false
 */
app.post("/qna/answer/:qna_id", function (req, res) {
  const qid = req.params.qna_id;
  const aid = req.body.aid;
  const adate = req.body.adate;
  const acontent = req.body.acontent;
  const datas = [aid, adate, acontent, qid];

  const SQL = "UPDATE `QNA` SET `a_id`=?, `a_date`=?, `a_content`=? WHERE `qna_id`=?";
  db.query(SQL, datas, function (err, result) {
    if (err) {
      console.log("qna answer error", err);
      res.send(false);
    }
    if (result) {
      console.log("qna answer result", result);
      res.send(true);
    }
  });
});

/*
 * 목적: qna 조회수 변경
 * input: 
 * output: true / false
 */
app.post("/qnaview", function (req, res) {
  const qna_id = req.body.qna_id;

  const SQL = "UPDATE `QNA` SET `view`=`view`+1 WHERE `qna_id`=?";
  console.log("qna view started");
  db.query(SQL, qna_id, function (err, result) {
    if (err) {
      console.log("qna view error", err);
      res.send(false);
    }
    if (result) {
      console.log("qna view result", result);
      res.send(true);
    }
  });
});

/*
 * 목적: 문의사항 검색
 * input: 검색 단어
 * output: 해당 단어를 제목에 포함하는 문의사항 / false
 */
app.get("/qna/search/:word", function (req, res) {
  const SearchWord = req.params.word;

  const SQL =
    "SELECT `qna_id`,`q_id`,`q_date`,`q_category`,`q_title`,`a_id`,`view`,`private_flag`\
     FROM `QNA` WHERE `q_title` LIKE ?";
  db.query(SQL, "%" + SearchWord + "%", function (err, rows) {
    if (err) {
      console.log("qna search error", err);
      res.send(false);
    }
    if (rows) {
      console.log("qna search result", rows);
      res.send(rows);
    }
  });
});

// const path = require("path");
// const multer = require("multer");

// app.use(express.static("public"));

// const storage = multer.diskStorage({
//   destination: "./public/images/report",
//   filename: function(req, file, cb) {
//     cb(null, "reportfile_" + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 }
// });

// app.post("/uploadreportimg", upload.single("img"), function(req, res, next) {
//   console.log(req.file.filename);
//   res.send({
//     fileName: req.file.filename
//   });
// });
