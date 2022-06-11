import axios from "axios";
import { useState } from "react";
import moment from "moment";

const MsgModal = ({ ModalClose, MsgName, MsgBoxId, SenderId }) => {
  const [MsgContent, SetMsgContent] = useState("");

  const MsgContentHandler = (e) => {
    SetMsgContent(e.target.value)
  }

  const MsgBtnHandler = (e) => {
    axios
      .post("http://localhost:8080/msgSend", {
        MsgBoxId: MsgBoxId,
        SenderId: SenderId,
        Date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        MsgContent: MsgContent,
      })
      .then((res)=> {
        if(res.data !== false){
          if(!alert('쪽지를 보냈습니다')) {
            window.location.href='/msgbox';
          }
        } else {
          alert('쪽지를 보내지 못했습니다. 다시 시도해주세요');
        }
        console.log(res);
      })
      .catch((err) => {
        alert('쪽지를 보내지 못했습니다. 다시 시도해주세요');
        console.log("메세지 보내기 실패");
      });
  };

  return (
    <div id="MsgModalContainer">
      <div id="MsgModalMain">
        <div id="MsgModalTitle">
          <span className="FontTitle">{MsgName}</span>
          <img
            id="CloseIcon"
            alt="닫기"
            src="images/close.png"
            onClick={ModalClose}
          />
        </div>
        <textarea id="MsgModalInput" placeholder="내용을 입력하세요" onChange={MsgContentHandler}></textarea>
        <button id="MsgModalBtn" onClick={() => {MsgBtnHandler(); ModalClose();}}>보내기</button>
      </div>
    </div>
  );
};

export default MsgModal;
