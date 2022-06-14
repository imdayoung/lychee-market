import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../../style/Message.css";
import "../../style/MyPage.css";
import Header from "../../components/Header";
import MsgSender from "./components/MsgSender";
import MsgContent from "./components/MsgContent";
import MsgModal from "./components/MsgModal";
import MoneyModal from "./components/MoneyModal";
import { useNavigate } from "react-router-dom";
import getCookie from "../../components/GetCookie";
import EvaluateModal from "../Evaluate/EvaluateModal";

// /*아이디 받아오기*/
// const Id = "mouse0429";

export default function Message(props) {
  const [SelectedMsg, SetSelectedMsg] = useState(null);
  const [MsgSenderList, SetMsgSenderList] = useState();
  const [SelectedBox, SetSelectedBox] = useState(0);
  const [MsgSenderName, SetMsgSenderName] = useState();
  const [ProductId, SetProductId] = useState();
  const [IsMsgModalOpen, SetIsMsgModalOpen] = useState(false);
  const [IsMoneyModalOpen, SetIsMoneyModalOpen] = useState(false);
  const [ReportInfo, SetReportInfo] = useState(null);
  const [BuyerId, SetBuyerId] = useState();
  const [SellerId, SetSellerId] = useState();

  let Id;
  const cookie = getCookie("is_login");
  if (cookie === "true") {
    Id = localStorage.getItem("user_id");
  }

  let navigate = useNavigate();
  var SId, BId, ProdId;
  var DealType;

  const [EvalModalOpen, SetEvalModalOpen] = useState(false);

  const OpenModal = (e) => {
    e.preventDefault();
    SetEvalModalOpen(true);
  }
  const CloseModal = () => {
    SetEvalModalOpen(false);
  }

  const ReportNavigate = () => {
    navigate('/report/write', {state:{info: ReportInfo}});
  }

  const MsgModalClose = () => {
    SetIsMsgModalOpen(!IsMsgModalOpen);
  };

  const MoneyModalClose = () => {
    SetIsMoneyModalOpen(!IsMoneyModalOpen);
  };

  useEffect(() => {
    axios
      .post("http://localhost:8080/msgbox", {
        Id: Id,
      })
      .then((res) => {
        SetMsgSenderList(
          res.data.map((data, index) => (
            <div key={index}>
              <input
                className="radio"
                type="radio"
                value={data.msgbox_id}
                checked={SelectedBox === data.msgbox_id}
                onChange={() => {}}
              />
              <div
                onClick={() => {
                  SetSelectedBox(data.msgbox_id);
                  SetReportInfo({
                    reportedid:
                      data.buyer_id !== Id ? data.buyer_id : data.seller_id,
                    cid: data.msgbox_id,
                    pid: null,
                    type: "쪽지 신고",
                  });
                  SetMsgSenderName(
                    data.buyer_id !== Id
                      ? `${data.buyer_nickname}(${data.buyer_id})`
                      : `${data.seller_nickname}(${data.seller_id})`
                  );
                  axios
                    .post("http://localhost:8080/msgContent", {
                      RoomId: data.msgbox_id,
                    })
                    .then((res) => {
                      if(res.data[0].deal_type === 0) DealType = "buy";
                      else  DealType="Sell";

                      axios.get('http://localhost:8080/'+DealType+'/detail/'+res.data[0].product_id)
                      .then((result) => {
                        SId = result.data[0].seller_id;
                        BId = result.data[0].buyer_id;
                        ProdId = result.data[0].product_id;
                        SetSellerId(result.data[0].seller_id);
                        SetBuyerId(result.data[0].buyer_id);
                        SetProductId(res.data[0].product_id);
                      SetSelectedMsg(
                        <div>
                          {((DealType === "Sell" && SId !== Id) || (DealType === "Buy" && BId !== Id)) && data.buyer_id === BId && data.seller_id === SId && ProdId === data.product_id && data.eval_flag === 0 ?
                          <MsgContent
                            Name="안내"
                            Content={
                              <div>
                                  <a href="/msgbox" onClick={OpenModal}>{`여기를 클릭해 평가를 진행해주세요`}</a>
                              </div>
                            }
                          />
                          : <></>
                          }
                          {res.data.map((data, index) => (
                            <MsgContent
                              key={index}
                              Name={
                                Id === data.user_id ? "나" : data.user_nickname
                              }
                              Date={moment(data.msg_time).format(
                                "YY/MM/DD hh:mm"
                              )}
                              Content={data.msg_content}
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
                                  <a
                                    href={`http://localhost:3000/${res.data[0].deal_type === 0 ? "buy" : "sell"}/detail/${res.data[0].product_id}`}
                                  >{`http://localhost:3000/${(res.data[0].deal_type === 0 ? "buy" : "sell")}/detail/${res.data[0].product_id}`}</a>
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
                      })
                      
                }}
              >
                <MsgSender
                  key={index}
                  Name={
                    data.seller_id !== Id
                      ? data.seller_nickname
                      : data.buyer_nickname
                  }
                  Date={moment(data.msg_time).format("YY/MM/DD hh:mm")}
                  Content={data.msg_content}
                />
              </div>
            </div>
          ))
        );
      })
      .catch((err) => {
        console.log("에러");
      });
  }, [SelectedBox, MsgSenderName, SelectedMsg, ProductId, Id]);

  return (
    <div>
      <EvaluateModal open={EvalModalOpen} close={CloseModal} id={Id} yourid={SellerId === Id ? BuyerId : SellerId} msgbox={SelectedBox}></EvaluateModal>
      {IsMsgModalOpen && (
        <MsgModal
          ModalClose={MsgModalClose}
          MsgName={MsgSenderName}
          MsgBoxId={SelectedBox}
          SenderId={Id}
        ></MsgModal>
      )}
      {IsMoneyModalOpen && (
        <MoneyModal
          ModalClose={MoneyModalClose}
          SenderId={Id}
          ReceiverName={MsgSenderName}
          ProductId={ProductId}
        ></MoneyModal>
      )}
      <Header />
      <main className="MessageMain">
        <div className="MsgLeft">
          <span className="MsgTitle">쪽지함</span>
          <div className="MsgList">{MsgSenderList}</div>
        </div>
        <div className="MsgRight">
          {SelectedMsg === null ? (
            <div></div>
          ) : (
            <div className="RowBetween MsgTitle">
              {MsgSenderName}
              <div className="RowBetween">
                <img
                  className="Icon"
                  onClick={ReportNavigate}
                  src="images/sad-face.png"
                  alt="신고"
                />
                <img
                  className="Icon"
                  onClick={MoneyModalClose}
                  src="images/dollar.png"
                  alt="송금"
                />
                <img
                  className="Icon"
                  onClick={MsgModalClose}
                  src="images/mail.png"
                  alt="쪽지"
                />
              </div>
            </div>
          )}
          <div className="MsgList">{SelectedMsg}</div>
        </div>
      </main>
    </div>
  );
}
