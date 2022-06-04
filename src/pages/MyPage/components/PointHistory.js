import axios from "axios";
import { useEffect, useState } from "react";
import PointContent from "./PointContent";

export default function PointHistory(props) {
  const [PointContents, SetPointContents] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:8080/point", {
        Id: props.Id,
      })
      .then((res) => {
        console.log('진짜피곤함');
        console.log(res.data);
      })
      .catch((err) => {});
  }, []);

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
            <th colSpan={2}>잔여 포인트</th>
          </tr>
        </thead>
        <tbody>
          <PointContent
            Date="20.05.19 11:00:56"
            Type="수입"
            WithNickname="영다빵가루"
            WithId="dlekdud0102"
            Product="거래물품"
            DealAmount={15000}
            Point={30000}
          />
          <PointContent
            Date="20.05.19 11:00:56"
            Type="충전"
            WithNickname="영다빵가루"
            WithId="dlekdud0102"
            Product="거래물품"
            DealAmount={15000}
            Point={15000}
          />
          <PointContent
            Date="20.05.19 11:00:56"
            Type="지출"
            WithNickname="영다빵가루"
            WithId="dlekdud0102"
            Product="거래물품"
            DealAmount={-15000}
            Point={0}
          />
        </tbody>
      </table>
      <div className="MyPagePointList"></div>
    </div>
  );
}
