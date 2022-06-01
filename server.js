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
