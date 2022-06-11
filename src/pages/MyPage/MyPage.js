import "../../style/MyPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import * as Common from "../../components/CommonFunc";
import ProductHistory from "./components/ProductHistory";
import PointHistory from "./components/PointHistory";
import Statistics from "./components/Statistics";
import PointModal from "./components/PointModal";
import { Link } from "react-router-dom";

const Id = "jaejae";

const HistoryList = {
  0: <ProductHistory Id={Id} Type="sell" />,
  1: <ProductHistory Id={Id} Type="buy" />,
  2: <ProductHistory Id={Id} Type="like" />,
  3: <PointHistory Id={Id} />,
  4: <Statistics />,
};

export default function MyPage() {
  const [Tab, SetTab] = useState(0);
  const [UserInfo, SetUserInfo] = useState({});
  const [UserPoint, SetUserPoint] = useState({});
  const [IsModalOpen, SetIsModalOpen] = useState(false);

  const ModalClose = () => {
    SetIsModalOpen(!IsModalOpen);
  };

  useEffect(() => {
    axios
      .post("http://localhost:8080/mypage", {
        Id: Id,
      })
      .then((res) => {
        console.log(res.data);
        SetUserInfo(res.data);
        SetUserPoint(res.data.user_point);
      })
      .catch((err) => {
        console.log("마이페이지 불러오기 실패");
      });
  }, [UserPoint]);

  return (
    <div>
      {IsModalOpen && <PointModal ModalClose={ModalClose} UserPoint={UserPoint} />}
      <Header />
      <main>
        <div className="MyPageMenu">
          <div className="MyInfo">
            반갑습니다
            <br />
            <span>
              <span id="MyInfoNickname">{UserInfo.user_nickname}</span> 님
            </span>
          </div>
          <div className="MyInfo" id="MyInfoDetail">
            <span>
              아이디
              <br />
              전화번호
              <br />
              직거래장소
            </span>
            <span>
              : {Id}
              <br />: {UserInfo.user_phone}
              <br />: {UserInfo.user_location}
            </span>
          </div>
          <div className="MyInfo MyInfoRight">
            <div>보유포인트</div>
            <div className="MyInfoHighlight">
              {Common.MoneyComma(parseInt(UserInfo.user_point))}
            </div>
            <button className="MyPageBtn" onClick={ModalClose}>
              포인트충전
            </button>
          </div>
          <div className="MyInfoDiv"></div>
          <div className="MyInfo MyInfoRight">
            <div>신뢰도</div>
            <div className="MyInfoHighlight">50</div>
            <div id="Reliability">
              <div
                style={{
                  width: `${parseInt(UserInfo.user_reliable)}px`,
                  height: "28px",
                  backgroundColor: "#ff3d60",
                }}
              ></div>
            </div>
          </div>
          <div className="MyInfoDiv"></div>
          <div className="MyInfo MyInfoRight">
            <div>기타</div>
            <Link to={{pathname: '/changemyinfo'}}><button className="MyPageBtn">내정보수정</button></Link>
            <Link to={{pathname: '/report'}}><button className="MyPageBtn">신고리스트</button></Link>
          </div>
        </div>
        <div id="MyPageSpace"></div>
        <div className="MyHistoryArea">
          <ul className="MyHistoryTabBar">
            <li
              className={`MyHistoryTab ${Tab === 0 ? "TabActive" : ""}`}
              onClick={() => {
                SetTab(0);
              }}
            >
              판매 내역
            </li>
            <li
              className={`MyHistoryTab ${Tab === 1 ? "TabActive" : ""}`}
              onClick={() => {
                SetTab(1);
              }}
            >
              구매 내역
            </li>
            <li
              className={`MyHistoryTab ${Tab === 2 ? "TabActive" : ""}`}
              onClick={() => {
                SetTab(2);
              }}
            >
              찜한 상품
            </li>
            <li
              className={`MyHistoryTab ${Tab === 3 ? "TabActive" : ""}`}
              onClick={() => {
                SetTab(3);
              }}
            >
              포인트 내역
            </li>
            <li
              className={`MyHistoryTab ${Tab === 4 ? "TabActive" : ""}`}
              onClick={() => {
                SetTab(4);
              }}
            >
              통계
            </li>
          </ul>
          <div id="MyHistory">{HistoryList[Tab]}</div>
        </div>
      </main>
    </div>
  );
}
