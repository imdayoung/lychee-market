import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import Header from "../../components/Header"
import '../../style/QnA.css'
import QnAListComponent from "./components/QnAListComponent";
import getCookie from "../../components/GetCookie";
import Pagination from "../../components/Pagination";

function QnA() {
  const cookie = getCookie("is_login");
  var IsManager = false;
  var IsLogin = false;
  let userid = ''
  const [SearchWord, SetSearchWord] = useState('');
  
  //로그인 정보
  if(cookie === "true"){
    userid = localStorage.getItem("user_id");
    if(userid !== null)
      IsLogin = true;
    else{
      const managerid = localStorage.getItem("manager_id");
      if(managerid !== null){
        IsManager = true;
        IsLogin = true;
      }
    }
  }

  //페이지네이션
  const limit = 10;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  
  const [QnA, setQnA] = useState([{
    qna_id: '',
    q_id: '',
    q_date: '',
    q_category: '',
    q_title: '',
    a_id: '',
    view: '',
    private_flag: '',
  }]);

  useEffect(() => {
    Axios.get('http://localhost:8080/qna')
    .then((res) => {
      setQnA(res.data);
    });
  }, []);

  let QnAList = [];
  if(QnA.length === 0){
    QnAList.push(<tr key={0} className="q_list_row"><td colSpan='4'>문의사항이 존재하지 않습니다.</td></tr>)
  }
  else{
    for(let i=QnA.length-1; i>=0; i--){
      QnAList.push(
        <QnAListComponent key={i} 
        qna_view={QnA[i].view} 
        q_id={QnA[i].q_id}
        qna_category={QnA[i].q_category} 
        qna_id={QnA[i].qna_id}
        qna_title={QnA[i].q_title} 
        qna_date={QnA[i].q_date.split('T')[0]} 
        qna_pflag={QnA[i].private_flag === '0' ? '공개' : '비공개'} 
        qna_answered={QnA[i].a_id !== "" ? '미완료' : '완료'}
        userid={userid}
        />
      );
    }
  }

  return (
    <div className="main">
      <Header keyword="문의사항"/>
      <main className="qnaMain">
        <table className="qnaList">
          <thead className="qnaHead">
            <tr>
              <td className="qnaView">조회수</td>
              <td className="qnaCategory">카테고리</td>
              <td className="qnaTitle">제목</td>
              <td className="qnaDate">작성 날짜</td>
              <td className="qnaPflag">공개 여부</td>
              <td className="qnaAnswered">답변 여부</td>
            </tr>
          </thead>
          <tbody>
            {QnAList.slice(offset, offset + limit)}
          </tbody>
        </table>
        <Pagination
          total={QnAList.length}
          limit={limit}
          page={page}
          setPage={setPage}
          />
        <div className="QnABottom">
          <div className="searchQnA">
            <input type='text' onChange={(event) => SetSearchWord(event.target.value)}/>
            <Link to={{pathname: '/qna/search/'+SearchWord}} state={{searchword: SearchWord}}>
              <button type='button'>검색</button> 
            </Link>
          </div>
          <div className="writeQnA">
            <Link to='/qna/write'>
              <button type='button' hidden={IsManager?true:IsLogin?false:true}>문의 작성</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default QnA;