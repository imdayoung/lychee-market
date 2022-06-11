import '../style/Header.css';
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ManagerHeader(props){
  return(
    <header>
      <nav className="Top">
        <Link to={{pathname:'/login'}} id='LinkNoLine'><div className="TopNav">로그아웃</div></Link>
      </nav>
      
      <div className="Divider"></div>

      <div className="Title">
        <div className="TitleName">
          <Link to={{pathname:'/'}} id='LinkNoLine'><div id="Logo"></div></Link>
          <div id="TitleText2">리치마켓</div>
          {props.keyword === undefined ? (
            <></>
          ) : (
            <div id="TitleDetail2">{" | " + props.keyword}</div>
          )}
        </div>
        <nav className="Top">
          <Link to={{pathname:'/manager/user'}} id='LinkNoLine'><div className="TitleNav">회원</div></Link>
          <Link to={{pathname:'/manager/product'}} id='LinkNoLine'><div className="TitleNav">게시글</div></Link>
          <Link to={{pathname: '/notice'}} id='LinkNoLine'><div className="TitleNav">공지사항</div></Link>
          <Link to={{pathname: '/qna'}} id='LinkNoLine'><div className="TitleNav">문의사항</div></Link>
          <Link to={{pathname: '/manager/report'}} id='LinkNoLine'><div className="TitleNav">신고사항</div></Link>
        </nav>
      </div>
    </header>
  )
}