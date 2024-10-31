import "../style/Header.css";
import React from "react";
import { Link } from "react-router-dom";
import setCookie from "./SetCookie";

export default function ManagerHeader(props) {
  const onLogoutClick = () => {
    setCookie("is_login", true, -1);
    localStorage.clear();
  };
  return (
    <header>
      <nav className="Top">
        <Link
          to={{ pathname: "/login" }}
          id="LinkNoLine"
          onClick={onLogoutClick}
        >
          <div className="TopNav">로그아웃</div>
        </Link>
        <Link
          to={{ pathname: "/manager/register" }}
          id="LinkNoLine"
        >
          <div className="TopNav">관리자 추가</div>
        </Link>
      </nav>

      <div className="Divider"></div>

      <div className="Title">
        <div className="TitleName">
        <Link to={{ pathname: "/manager/main" }} id="LinkNoLine">
            <span className="TitleLink">
              <img id="Logo" src="/images/logo.png" alt="로고" />
              <span id="TitleText2">리치마켓</span>
            </span>
          </Link>
          {props.keyword === undefined ? (
            <></>
          ) : (
            <div id="TitleDetail2">{" | " + props.keyword}</div>
          )}
        </div>
        <nav className="Top">
          <Link to={{ pathname: "/manager/user" }} id="LinkNoLine">
            <div className="TitleNav">회원</div>
          </Link>
          <Link to={{ pathname: "/manager/product" }} id="LinkNoLine">
            <div className="TitleNav">게시글</div>
          </Link>
          <Link to={{ pathname: "/notice" }} id="LinkNoLine">
            <div className="TitleNav">공지사항</div>
          </Link>
          <Link to={{ pathname: "/qna" }} id="LinkNoLine">
            <div className="TitleNav">문의사항</div>
          </Link>
          <Link to={{ pathname: "/manager/report" }} id="LinkNoLine">
            <div className="TitleNav">신고사항</div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
