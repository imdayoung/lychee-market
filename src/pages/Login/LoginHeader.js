import '../../style/LoginHeader.css';
import { Link, useNavigate } from "react-router-dom";


export default function LoginHeader(props){
  return(
    <header>
      <nav className="Top">
        <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="TopNav">로그인</div>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="TopNav">회원가입</div>
        </Link>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="TopNav">고객센터</div>
        </Link>
      </nav>
      
      <div className="Divider"></div>

      <div className="Title">
        <div className="TitleName">
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <div id="Logo"></div>
          </Link>
          <div id="TitleText">리치마켓</div>
          <div id="TitleDetail"> | 로그인</div>
        </div>
      </div>
    </header>
  )
}