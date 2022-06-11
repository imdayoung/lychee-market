import axios from "axios";
import { useEffect, useState } from "react";
import PointContent from "./PointContent";
import moment from "moment";

export default function PointHistory(props) {
  const [PointContents, SetPointContents] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:8080/point", {
        Id: props.Id,
      })
      .then((res) => {
        console.log(res.data);
        SetPointContents(
          res.data.map((data, index) => (
            <PointContent
              key={index}
              Date={moment(data.deal_date).format("YY.MM.DD hh:mm:ss")}
              Type={data.product_id === null ? "충전" : data.receiver_id === props.Id ? "수입" : "지출"}
              WithNickname={data.receiver_id === props.Id ? data.sender_nickname : data.receiver_nickname}
              WithId={data.receiver_id === props.Id ? data.sender_id : data.receiver_id}
              Product={data.product_id === null ? "" : data.product_title}
              DealAmount={parseInt(data.receiver_id === props.Id ? data.deal_amount : -data.deal_amount)}
              Point={parseInt(data.left_point)}
            />
          ))
        )
      })
      .catch((err) => {});
  }, [props.Id]);

  return (
    <div>
      <select id="DropDown">
        <option value="new">최신순</option>
        <option value="doing">거래중</option>
        <option value="done">거래완료</option>
      </select>
      <table
        className="MyPagePointTitle"
        border={1}
        bordercolor="#cdcdcd"
        cellSpacing={0}
      >
        <thead>
          <tr>
            <th colSpan={1}>날짜</th>
            <th colSpan={1}>분류</th>
            <th colSpan={2}>거래 대상</th>
            <th colSpan={3}>거래 물품</th>
            <th colSpan={2}>거래 포인트</th>
            {/* <th colSpan={2}>잔여 포인트</th> */}
          </tr>
        </thead>
        <tbody>
          {PointContents}
        </tbody>
      </table>
      <div className="MyPagePointList"></div>
    </div>
  );
}
