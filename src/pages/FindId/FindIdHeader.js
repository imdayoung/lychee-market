import { Link, useNavigate } from "react-router-dom";

export default function LoginHeader(props){
  return(
    <header>
      <nav className="Top">
        <Link to="/login" id='LinkNoLine'>
          <div className="TopNav">로그인</div>
        </Link>
        <Link to="/register" id='LinkNoLine'>
          <div className="TopNav">회원가입</div>
        </Link>
        <Link to="/" id='LinkNoLine'>
          <div className="TopNav">고객센터</div>
        </Link>
      </nav>
      
      <div className="Divider"></div>

      <div className="Title2">
        <div className="TitleName2">
          <Link to="/" id='LinkNoLine'>
            <div id="Logo2"></div>
          </Link>
          <div id="TitleText2">리치마켓</div>
          <div id="TitleDetail2"> | 아이디 찾기</div>
        </div>
      </div>
    </header>
  )
}