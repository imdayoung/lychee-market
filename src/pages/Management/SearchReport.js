import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import moment from "moment";
import Axios from "axios";
import Header from "../../components/Header";
import ReportListItem from "./components/ReportListItem";
import "../../style/Management.css"

export default function SearchReport() {
  let location = useLocation();

  // 신고 정보
  const [Report, SetReport] = useState([{
    report_id: '',
    report_type: '',
    report_title: '',
    reporter_id: '',
    report_date: '',
    solve_id: '',
  }]);    

  // 검색 단어
  const [Word, SetWord] = useState('');
  const [SearchWord, SetSearchWord] = useState('');
  useEffect(()=>{
    const TempWord = location.state.searchword;
    SetSearchWord(TempWord);
  },[location]);

  useEffect(()=>{
    Axios.get('http://localhost:8080/manager/report/'+SearchWord)
    .then((res)=>{
      console.log(res.data);
      SetReport(res.data);
    });
  },[SearchWord]);

  let ReportList = [];
  if(Report.length === 0) {
    ReportList.push(<tr key={0} className="ListRow"><td colSpan={6}>"{SearchWord}"에 대한 검색결과가 없습니다.</td></tr>);
  }
  for(let i=Report.length-1; i>=0; i--){
    let IsSolved = 'Incomplete';
    if(Report[i].solve_id !== null)
      IsSolved ='Complete';
    ReportList.push(
      <ReportListItem key={i} reportid={Report[i].report_id} type={Report[i].report_type} title={Report[i].report_title}
      reporterid={Report[i].reporter_id} date={moment(Report[i].report_date).format("YYYY-MM-DD")} issolved={IsSolved}/>
    );
  }
  
  return (
    <div>
      <Header keyword="신고 관리"/>
      <div className="ManageMain">
        <div className="SearchResult"><span>{SearchWord}</span>에 대한 검색결과입니다.</div>
        <table className="ReportList">
          <thead className="ReportHead">
            <tr className="ListRow">
              <td className="ReportId">번호</td>
              <td className="ReportType">유형</td>
              <td className="ReportTitle">제목</td>
              <td className="ReporterId">작성자</td>
              <td className="ReportDate">작성 날짜</td>
              <td className="IsSolved">해결 여부</td>
            </tr>
          </thead>
          <tbody>
            {ReportList}
          </tbody>
        </table>
        <div className="ManageBottom">
          <div className="ManageSearch">
            <input type="text" onChange={(e)=>SetWord(e.target.value)}></input>
            <Link to={{pathname: '/manager/report/'+Word}} state={{searchword: Word}}>
              <button type="button" onClick={()=>{SetSearchWord(Word)}}>검색</button>
            </Link>
          </div>
          <div>
            <Link to="/manager/report">
              <button className="AllList" type="button">전체 목록</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}