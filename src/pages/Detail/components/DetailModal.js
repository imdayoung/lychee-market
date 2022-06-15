import axios from "axios";
import { useEffect, useState } from "react";
import EvaluateModal from "../../Evaluate/EvaluateModal";

const DetailModal = ({ ModalClose, EvalModalClose, Id, ProductId, DealType }) => {
  const [MsgList, SetMsgList] = useState();
  const [MsgBoxId, SetMsgBoxId] = useState();
  const [SellerId, SetSellerId] = useState();
  const [BuyerId, SetBuyerId] = useState();
  var MsgBI;

  const DealDone = (DealWith) => {
    if(window.confirm(`${DealWith}와 거래 완료를 진행하시겠습니까?`)){
      axios.post("http://localhost:8080/dealdone", {
        ProductId: ProductId,
        DealWith: DealWith,
        DealType: DealType
      })
      .then((res)=>{
        if(res.data === true){
          if(!alert("거래가 완료되었습니다.")){
            ModalClose();
            EvalModalClose();
          };
        } else {
          alert("거래를 완료하지 못했습니다. 다시 시도해주세요");
        }
      })
      .catch((res)=>{
        console.log("거래 상태 업데이트 실패");
      });

      // let now = new Date();
      // let month = now.getMonth()+1;
      // let MsgTime = now.getFullYear() + "-" + month + "-" + now.getDate()
      // + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      // let Msg = "여기를 클릭해 거래 평가를 진행해주세요!";
      // axios.post('http://localhost:8080/senddonemsg', {
      //   MsgBoxId: MsgBI,
      //   UserId: Id,
      //   Msg: Msg,
      //   MsgTime: MsgTime
      // })
      // .then((res) => {
      //   if(res.data === true) {
      //     alert("메시지가 전송되었습니다.");
      //     console.log("메시지 전송 성공");
      //   } else {
      //     console.log("메시지 전송 실패");
      //   }
      // })
    }
  }

  useEffect(() => {
    axios
      .post("http://localhost:8080/product/msglist", {
        Id: Id,
        ProductId: ProductId,
      })
      .then((res) => {
        if (res.data.length !== 0) {
          console.log(res.data[0].msgbox_id);
          MsgBI = res.data[0].msgbox_id;
          SetMsgBoxId(res.data[0].msgbox_id);
          SetMsgList(
            <table>
              <thead>
                <tr>
                  {res.data.map((data, index) => (
                    SetSellerId(data.seller_id),
                    SetBuyerId(data.buyer_id),
                    console.log(data.seller_id),
                    console.log(data.buyer_id),
                    <th
                      key={index}
                      onClick={() => {DealDone((Id === data.seller_id ? data.buyer_id: data.seller_id))}}
                    >
                      {Id === data.seller_id
                        ? data.buyer_nickname + "(" + data.buyer_id + ")"
                        : data.seller_nickname + "(" + data.seller_id + ")"}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          );
        } else {
          SetMsgList(null);
        }
      })
      .catch((res) => {
        console.log("불러오기 에러");
      });
  }, []);

  return (
    <div id="DetailModalContainer">
      <div id="DetailModalMain">
        <div id="DetailModalTitle">
          <span className="FontTitle">거래 완료 대상</span>
          <img
            id="CloseIcon"
            alt="닫기"
            src="/images/close.png"
            onClick={ModalClose}
          />
        </div>
        <div className="DetailModalContent">
          {MsgList === null ? "거래를 완료할 대상이 없습니다." : MsgList}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
