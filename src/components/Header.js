import '../style/Header.css';
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header(props){
  let Location = useLocation();

  useEffect(() => {
      console.log('location', Location);
  }, [Location]);
  const DealType = Location.pathname.split('/').slice(1)[0];
  console.log(DealType);

  const [Target, SetTarget] = useState('');

  return(
    <header>
      <nav className="Top">
        <div className="TopNav">로그인</div>
        <div className="TopNav">회원가입</div>
        <div className="TopNav">고객센터</div>
      </nav>
      
      <div className="Divider"></div>

      <div className="Title">
        <div className="TitleName">
          <div id="Logo"></div>
          <div id="TitleText">리치마켓</div>
        </div>
        <nav className="Top">
          <Link to={{pathname:'/sell'}} id='LinkNoLine'><div className="TitleNav">판매</div></Link>
          <Link to={{pathname:'/buy'}} id='LinkNoLine'><div className="TitleNav">구매</div></Link>
          <div className="TitleNav">내정보</div>
          <div className="TitleNav">쪽지함</div>
        </nav>
      </div>
    </header>
  )
}