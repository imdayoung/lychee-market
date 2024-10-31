import "../style/Header.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import getCookie from "./GetCookie";
import setCookie from "./SetCookie";

export default function Header(props) {
  let Location = useLocation();

  useEffect(() => {
    console.log("location", Location);
  }, [Location]);
  const DealType = Location.pathname.split("/").slice(1)[0];
  console.log(DealType);

  const [Target, SetTarget] = useState("");

  var IsLogin = false;
  const cookie = getCookie("is_login");
  if (cookie === "true") {
    const tempid = localStorage.getItem("user_id");
    if (tempid !== null) IsLogin = true;
  }

  const navigate = useNavigate();

  const onLogoutClick = () => {
    setCookie("is_login", true, -1);
    localStorage.clear();
    navigate('/');
  };

  return (
    <header>
      <nav className="Top">
        <Link to={{ pathname: "/" }} id="LinkNoLine">
          <div
            className="TopNav"
            hidden={IsLogin ? false : true}
            onClick={onLogoutClick}
          >
            로그아웃
          </div>
        </Link>
        <Link to={{ pathname: "/login" }} id="LinkNoLine">
          <div className="TopNav" hidden={IsLogin ? true : false}>
            로그인
          </div>
        </Link>
        <Link to={{ pathname: "/register" }} id="LinkNoLine">
          <div className="TopNav" hidden={IsLogin ? true : false}>
            회원가입
          </div>
        </Link>
        <Link to={{ pathname: "/qna" }} id="LinkNoLine">
          <div className="TopNav">문의사항</div>
        </Link>
        <Link to={{ pathname: "/notice" }} id="LinkNoLine">
          <div className="TopNav">공지사항</div>
        </Link>
      </nav>

      <div className="Divider"></div>

      <div className="Title">
        <div className="TitleName">
          <Link to={{ pathname: "/" }} id="LinkNoLine">
            <span className="TitleLink">
              <img id="Logo" src="/images/logo.png" alt="로고" />
              <span id="TitleText2">리치마켓</span>
            </span>
          </Link>
        </div>
        <div className="Search">
          <div>
            <input
              className="SearchDiv"
              type="text"
              placeholder="이런 건 사람들이 얼마에 사고 싶어할까?"
              onChange={(event) => SetTarget(event.target.value)}
            ></input>
          </div>
          <div>
            {Target === "" ? 
            <button type="button" className="SearchButton" onClick={() => {alert("검색어를 입력해주세요");}}>
              <img
                className="SearchButtonImage"
                src="/images/glass.png"
                alt="glass"
              ></img>
            </button>
            :
            <Link to={{ pathname: "/" + DealType + "/search/" + Target }}>
              <button type="button" className="SearchButton">
                <img
                  className="SearchButtonImage"
                  src="/images/glass.png"
                  alt="glass"
                ></img>
              </button>
            </Link>
            }
          </div>
        </div>
        <nav className="Top">
          <Link to={{ pathname: "/sell" }} id="LinkNoLine">
            <div className="TitleNav">판매</div>
          </Link>
          <Link to={{ pathname: "/buy" }} id="LinkNoLine">
            <div className="TitleNav">구매</div>
          </Link>
          <Link to={{ pathname: "/mypage" }} id="LinkNoLine">
            <div className="TitleNav" hidden={IsLogin ? false : true}>
              내정보
            </div>
          </Link>
          <Link to={{ pathname: "/msgbox" }} id="LinkNoLine">
            <div className="TitleNav" hidden={IsLogin ? false : true}>
              쪽지함
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}