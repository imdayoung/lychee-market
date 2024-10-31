import { useState } from "react";
import axios from "axios";
import moment from "moment";
import * as common from "../../../components/CommonFunc";

const PointModal = ({ ModalClose, UserPoint }) => {
  const [PointId, SetPointId] = useState("");
  const [PointPw, SetPointPw] = useState("");
  const [PointAmount, SetPointAmount] = useState(0);

  const PointBtnHandler = (e) => {
    const CheckCharge = window.confirm(
      `${PointId}로 ${common.MoneyComma(
        PointAmount
      )} 포인트를 충전하시겠습니까?`
    );
    if (CheckCharge) {
      axios
        .post("http://localhost:8080/pointcharge", {
          PointId: PointId,
          PointPw: PointPw,
          PointAmount: parseInt(PointAmount),
          PointResult: parseInt(PointAmount) + parseInt(UserPoint),
          Date: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        })
        .then((res) => {
          if (res.data === true) {
            if(!alert("충전에 성공했습니다")) {
              window.location.href='/mypage';
            };

          } else {
            alert(
              "충전에 실패했습니다. \n정확한 아이디와 비밀번호를 입력해주세요"
            );
          }
        })
        .catch((err) => {
          alert("충전에 실패했습니다. \n다시 시도해주세요");
        });
    } else {
      alert("충전이 취소되었습니다.");
    }
  };

  return (
    <div id="PointModalContainer">
      <div className="PointModalMain">
        <div id="PointModalTitle">
          <span className="FontTitle">포인트 충전</span>
          <img
            id="CloseIcon"
            alt="닫기"
            src="images/close.png"
            onClick={ModalClose}
          />
        </div>
        <div className="PointModalContent">
          <input
            className="PointModalInput"
            placeholder="아이디"
            onChange={(e) => {
              SetPointId(e.target.value);
            }}
          />
          <input
            className="PointModalInput"
            placeholder="비밀번호"
            type="password"
            onChange={(e) => {
              SetPointPw(e.target.value);
            }}
          />
          <input
            className="PointModalInput"
            placeholder="충전할 금액"
            type="number"
            min="0"
            onChange={(e) => {
              SetPointAmount(e.target.value);
            }}
          />
          <button
            id="PointModalBtn"
            onClick={() => {
              PointBtnHandler();
              ModalClose();
            }}
          >
            충전하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PointModal;
