import '../style/Header.css';

export default function Header(props){
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
          <div className="TitleNav">판매</div>
          <div className="TitleNav">구매</div>
          <div className="TitleNav">내정보</div>
          <div className="TitleNav">쪽지함</div>
        </nav>
      </div>
    </header>
  )
}