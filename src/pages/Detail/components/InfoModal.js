import axios from "axios";
import { useEffect, useState } from "react";
import getCookie from "../../../components/GetCookie";

const InfoModal = ({ ModalClose, UserNickname }) => {
  const cookie = getCookie("is_login");
  var Id = "";
  var ManagerId = "";
  var UserId = "";

  if (cookie === "true") {
    UserId = localStorage.getItem("user_id");
    ManagerId = localStorage.getItem("manager_id");
    if (ManagerId !== null) Id = ManagerId;
    else if (UserId !== null) Id = UserId;
  } else {
    Id = null;
  }

  const [Info, SetInfo] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:8080/userinfo", {
        UserNickname: UserNickname,
      })
      .then((res) => {
        if (res.data === false) {
          SetInfo(
            <div className="ColumnRowCenter">
              정보를 불러오지 못했습니다
              <br />
              다시 시도해주세요
            </div>
          );
        } else {
          console.log(Id);
          if (Id === null) {
            SetInfo(<div className="ColumnRowCenter">로그인 후 확인 가능합니다</div>);
          } else if (ManagerId !== null) {
            SetInfo(
              <div className="InfoContent">
                <span>
                  아이디
                  <br />
                  닉네임
                  <br />
                  직거래장소
                  <br />
                  <br />
                  신뢰도
                  <br />
                  가입일자
                  <br />
                  전화번호
                  <br />
                  보유포인트
                </span>
                <span>
                  : {res.data.user_id}
                  <br />: {res.data.user_nickname}
                  <br />: {res.data.user_location.split("(")[0]}
                  <br />
                  &nbsp;&nbsp;{"("}
                  {res.data.user_location.split("(")[1]}
                  <br />: {res.data.user_reliable}
                  <br />: {res.data.join_date}
                  <br />: {res.data.user_phone}
                  <br />: {res.data.user_point}
                </span>
              </div>
            );
          } else if (UserId !== null) {
            SetInfo(
              <div className="InfoContent">
                <span>
                  아이디
                  <br />
                  닉네임
                  <br />
                  직거래장소
                  <br />
                  <br />
                  신뢰도
                  <br />
                  가입일자
                  <br />
                  전화번호
                  <br />
                  보유포인트
                  <br />
                </span>
                <span>
                  : {res.data.user_id}
                  <br />: {res.data.user_nickname}
                  <br />: {res.data.user_location.split("(")[0]}
                  <br />
                  &nbsp;&nbsp;{"("}
                  {res.data.user_location.split("(")[1]}
                  <br />: {res.data.user_reliable}
                  <br />: {res.data.join_date}
                  <br />: {res.data.user_phone}
                  <br />: {res.data.user_point}
                </span>
              </div>
            );
          }
        }
      })
      .catch((res) => {
        console.log("회원 정보 불러오기 에러");
      });
  }, []);

  return (
    <div id="DetailModalContainer">
      <div id="InfoModalMain">
        <div id="DetailModalTitle">
          <span className="FontTitle">회원 정보</span>
          <img
            id="CloseIcon"
            alt="닫기"
            src="/images/close.png"
            onClick={ModalClose}
          />
        </div>
        <div className="DetailModalContent">{Info}</div>
      </div>
    </div>
  );
};

export default InfoModal;
