import { useState } from "react";
import axios from "axios";
import moment from "moment";
import * as common from "../../../components/CommonFunc";

const MoneyModal = ({ ModalClose, SenderId, ReceiverName, ProductId }) => {
  const [SenderPw, SetSenderPw] = useState("");
  const [PointAmount, SetPointAmount] = useState(0);

  const MoneyBtnHandler = (e) => {
    const CheckCharge = window.confirm(
      `${ReceiverName.split("(")[0]}(으)로 ${common.MoneyComma(
        PointAmount
      )} 포인트를 송금하시겠습니까?`
    );
    if (CheckCharge) {
      axios
        .post("http://localhost:8080/pointsend", {
          ReceiverId: ReceiverName.split("(")[1].split(")")[0],
          SenderId: SenderId,
          SenderPw: SenderPw,
          PointAmount: parseInt(PointAmount),
          Date: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
          ProductId: ProductId,
        })
        .then((res) => {
          if (res.data === true) {
            alert("송금이 완료되었습니다.");
          } else {
            alert(res.data);
          }
        })
        .catch((err) => {
          alert("송금을 실패했습니다. 다시 시도해주세요.");
        });
    } else {
      alert("송금이 취소되었습니다.");
    }
  };

  return (
    <div id="MsgModalContainer">
      <div className="PointModalMain">
        <div id="PointModalTitle">
          <span className="FontTitle">포인트 송금</span>
          <img
            id="CloseIcon"
            alt="닫기"
            src="images/close.png"
            onClick={ModalClose}
          />
        </div>
        <div className="PointModalContent">
          <div className="PointModalInput" id="PointModalName">
            {ReceiverName}
          </div>
          <input
            className="PointModalInput"
            placeholder="내 비밀번호"
            type="password"
            onChange={(e) => {
              SetSenderPw(e.target.value);
            }}
          />
          <input
            className="PointModalInput"
            placeholder="송금할 금액"
            type="number"
            min="0"
            onChange={(e) => {
              SetPointAmount(e.target.value);
            }}
          />
          <button
            id="PointModalBtn"
            onClick={() => {
              MoneyBtnHandler();
              ModalClose();
            }}
          >
            송금하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoneyModal;
