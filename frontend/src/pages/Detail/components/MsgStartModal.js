import axios from "axios";
import { useState } from "react";
import "../../../style/Message.css"

const MsgStartModal = ({ ModalClose, Id, DealId, DealName, DealType, ProductId }) => {
  const [MsgContent, SetMsgContent] = useState("");

  const MsgContentHandler = (e) => {
    SetMsgContent(e.target.value);
  };

  const MsgBtnHandler = (e) => {
    axios.post("http://localhost:8080/msgstart", {
      Id: Id,
      DealId: DealId,
      DealType: DealType,
      MsgContent: MsgContent,
      ProductId: ProductId,
    })
    .then((res)=>{
      if(res.data === true) {
        if(!alert("쪽지를 보냈습니다!")){
          
        }
      }
    })
    .catch((res)=>{
      alert("쪽지를 보내지 못했습니다. 다시 시도해주세요");
    })
  };

  return (
    <div id="MsgModalContainer">
      <div id="MsgModalMain">
        <div id="MsgModalTitle">
          <span className="FontTitle">{DealName + "(" + DealId + ")"}</span>
          <img
            id="CloseIcon"
            alt="닫기"
            src="/images/close.png"
            onClick={ModalClose}
          />
        </div>
        <textarea
          id="MsgModalInput"
          placeholder="내용을 입력하세요"
          onChange={MsgContentHandler}
        ></textarea>
        <button
          id="MsgModalBtn"
          onClick={() => {
            MsgBtnHandler();
            ModalClose();
          }}
        >
          보내기
        </button>
      </div>
    </div>
  );
};

export default MsgStartModal;
