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

  const {keyword} = props;
  let exist = false;
  
  if(keyword !== undefined){
    exist = true;
  }

  return(
    <header>
      <nav className="Top">
        <Link to={{pathname:'/login'}} id='LinkNoLine'><div className="TopNav">로그인</div></Link>
        <Link to={{pathname:'/register'}} id='LinkNoLine'><div className="TopNav">회원가입</div></Link>
        <Link to={{pathname:'/qna'}} id='LinkNoLine'><div className="TopNav">고객센터</div></Link>
      </nav>
      
      <div className="Divider"></div>

      <div className="Title">
        <div className="TitleName">
          <Link to={{pathname:'/'}} id='LinkNoLine'><div id="Logo"></div></Link>
          <div id="TitleText2">리치마켓</div>
          {exist ? <div id="TitleDetail2"> | {keyword}</div> : <></>}
        </div>
        <nav className="Top">
          <Link to={{pathname:'/sell'}} id='LinkNoLine'><div className="TitleNav">판매</div></Link>
          <Link to={{pathname:'/buy'}} id='LinkNoLine'><div className="TitleNav">구매</div></Link>
          <div className="TitleNav">내정보</div>
          <Link to={{pathname: '/msgbox'}} id='LinkNoLine'><div className="TitleNav">쪽지함</div></Link>
        </nav>
      </div>
    </header>
  )
}