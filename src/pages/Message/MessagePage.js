import { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import "../../style/Message.css";
import Header from "../../components/Header";
import MsgSender from "./components/MsgSender";
import MsgContent from "./components/MsgContent";

/*아이디 받아오기*/
const Id = "mouse0429";

export default function Message() {
  const [SelectedMsg, SetSelectedMsg] = useState(null);
  const [MsgSenderList, SetMsgSenderList] = useState();
  const [SelectedRoom, SetSelectedRoom] = useState(0);
  const [MsgSenderName, SetMsgSenderName] = useState();
  const [isModalOpen, SetIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:8080/chatroom", {
        Id: Id,
      })
      .then((res) => {
        SetMsgSenderList(
          res.data.map((data, index) => (
            <div key={index}>
              <input
                className="radio"
                type="radio"
                value={data.chatroom_id}
                checked={SelectedRoom === data.chatroom_id}
                onChange={() => {}}
              />
              <div
                onClick={() => {
                  SetSelectedRoom(data.chatroom_id);
                  SetMsgSenderName(
                    data.buyer_id != Id
                      ? `${data.buyer_nickname}(${data.buyer_id})`
                      : `${data.seller_nickname}(${data.seller_id})`
                  );
                  axios
                    .post("http://localhost:8080/chatContent", {
                      RoomId: data.chatroom_id,
                    })
                    .then((res) => {
                      SetSelectedMsg(
                        <div>
                          {res.data.map((data, index) => (
                            <MsgContent
                              key={index}
                              Name={
                                Id === data.user_id ? "나" : data.user_nickname
                              }
                              Date={moment(data.chat_time).format(
                                "YY/MM/DD hh:mm"
                              )}
                              Content={data.chat_content}
                            />
                          ))}
                          <MsgContent
                            Name="안내"
                            Content={
                              <div>
                                <div>{`"${res.data[0].product_title}"에 대한 쪽지입니다.`}</div>
                                <br />
                                <span>판매 글 정보 </span>
                                <span>
                                  <a>{`http://localhost:8080/buy/${res.data[0].product_id}`}</a>
                                </span>
                                <br />
                                <br />
                                <div>
                                  허위 사실, 사기 등에 유의하시길 바라며 광고,
                                  스팸 등의 쪽지를 받으신 경우 신고를 눌러주세요
                                </div>
                              </div>
                            }
                          />
                        </div>
                      );
                      console.log(res.data);
                    })
                    .catch((err) => {
                      console.log("채팅 내역 불러오기 실패");
                    });
                }}
              >
                <MsgSender
                  key={index}
                  Name={
                    data.seller_id != Id
                      ? data.seller_nickname
                      : data.buyer_nickname
                  }
                  Date={moment(data.chat_time).format("YY/MM/DD hh:mm")}
                  Content={data.chat_content}
                />
              </div>
            </div>
          ))
        );
      })
      .catch((err) => {
        console.log("에러");
      });
  }, [SelectedRoom, MsgSenderName, SelectedMsg]);

  return (
    <div>
      <Header />
      <main className="MessageMain">
        <div className="Left">
          <span className="MsgTitle">쪽지함</span>
          <div className="MsgList">
            {MsgSenderList}
          </div>
        </div>
        <div className="Right">
          {SelectedMsg === null ? (
            <div></div>
          ) : (
            <div className="RowBetween MsgTitle">
              {MsgSenderName}
              <div className="RowBetween">
                <img className="Icon" src ='images/warning.png'/>
                <img className="Icon" src ='images/mail.png'/>
              </div>
            </div>
          )}
          {SelectedMsg}
        </div>
      </main>
    </div>
  );
}
