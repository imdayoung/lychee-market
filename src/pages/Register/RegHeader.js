import { Link } from "react-router-dom";

export default function RegHeader(props){
  return(
    <header>
      <nav className="Top">
      <Link to="/login" id='LinkNoLine'>
          <div className="TopNav">로그인</div>
        </Link>
        <Link to="/register" id='LinkNoLine'>
          <div className="TopNav">회원가입</div>
        </Link>
        <Link to="/qna" id='LinkNoLine'>
          <div className="TopNav">문의사항</div>
        </Link>
        <Link to="/notice" id='LinkNoLine'>
          <div className="TopNav">공지사항</div>
        </Link>
      </nav>
      
      <div className="Divider"></div>

      <div className="Title">
        <div className="TitleName2">
          <Link to="/" id='LinkNoLine'>
          <img id="Logo3" src = "/images/logo.png" alt="로고"/>
          </Link>
          <div id="TitleText2">리치마켓</div>
          <div id="TitleDetail2"> | 회원가입</div>
        </div>
      </div>
    </header>
  )
}