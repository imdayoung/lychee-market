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

      <div className="Title2">
        <div className="TitleName2">
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <div id="Logo2"></div>
          </Link>
          <div id="TitleText2">리치마켓</div>
          <div id="TitleDetail2"> | 로그인</div>
        </div>
      </div>
    </header>
  )
}