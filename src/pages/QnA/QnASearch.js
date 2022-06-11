import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from 'axios';
import Header from "../../components/Header"
import QnAListComponent from "./components/QnAListComponent";
import getCookie from "../../components/GetCookie";
import Pagination from "../../components/Pagination";

export default function QnASearch(props){
  // 관리자인지 확인 필요
  const cookie = getCookie("is_login");
  var IsManager = false;
  var IsLogin = false;
  let userid = '';
  let location = useLocation();
  
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

  // 검색 단어
  const [Word, SetWord] = useState('');
  const [SearchWord, SetSearchWord] = useState();

  //QnA에서 넘어올 때 searchword 설정
  useEffect(()=>{
    const tempsearchword = location.state.searchword;
    SetSearchWord(tempsearchword);
  },[]);

  //페이지네이션
  const limit = 10;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 문의사항 정보
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

  // 검색한 공지사항 정보 불러오기
  useEffect(()=>{
      Axios.get('http://localhost:8080/qna/search/'+SearchWord)
      .then((res)=>{
          console.log(res.data);
          setQnA(res.data);
      });
  },[SearchWord]);

  let QnAList = [];
  if(QnA.length === 0){
    QnAList.push(<tr key={0} className="q_list_row"><td colSpan='6'>검색된 결과가 없습니다.</td></tr>)
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
        <div className="SearchResult"><span>{SearchWord}</span>에 대한 검색결과입니다.</div>
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
            <input type='text' onChange={(event) => SetWord(event.target.value)}/>
            <Link to={{pathname: '/qna/search/'+Word}}>
              <button type='button'onClick={()=>{SetSearchWord(Word)}}>검색</button>                       
            </Link>
          </div>
          <div className="writeQnA">
            <Link to='/qna'>
              <button className="allQnA" type="button">전체 목록</button>
            </Link>
            <Link to='/qna/write'>
              <button type='button' hidden={IsManager?true:IsLogin?false:true}>문의 작성</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}