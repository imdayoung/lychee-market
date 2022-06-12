import axios from "axios";
import { useEffect, useState } from "react";

const DetailModal = ({ ModalClose, Id, ProductId, DealType }) => {
  const [MsgList, SetMsgList] = useState();

  const DealDone = (DealWith) => {
    if(!alert(`${DealWith}와 거래 완료를 진행하시겠습니까?`)){
      axios.post("http://localhost:8080/dealdone", {
        ProductId: ProductId,
        DealWith: DealWith,
        DealType: DealType
      })
      .then((res)=>{
        if(res.data === true){
          if(!alert("거래가 완료되었습니다.")){
            window.location.href=`/${DealType === 0 ? "buy" : "sell"}/detail/${ProductId}`;
          };
        } else {
          alert("거래를 완료하지 못했습니다. 다시 시도해주세요");
        }
      })
      .catch((res)=>{
        console.log("거래 상태 업데이트 실패");
      })
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
          SetMsgList(
            <table>
              <thead>
                <tr>
                  {res.data.map((data, index) => (
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
        <button
          id="DetailModalBtn"
          onClick={() => {
            ModalClose();
          }}
        >
          보내기
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
