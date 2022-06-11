import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Axios from "axios";
import Header from "../../components/Header";
import ReportListItem from "./components/ReportListItem";
import Pagination from "../../components/Pagination";
import "../../style/Management.css"

export default function ManageReport() {
  // 신고 정보
  const [Report, SetReport] = useState([{
    report_id: '',
    report_type: '',
    report_title: '',
    reporter_id: '',
    report_date: '',
    solve_id: '',
  }]);

  // 페이지네이션
  const limit = 10;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 검색 단어
  const [SearchWord, SetSearchWord] = useState('');

  useEffect(()=>{
      Axios.get('http://localhost:8080/manager/report')
      .then((res)=>{
          console.log(res.data);
          SetReport(res.data);
      });
  },[]);

  let ReportList = [];
  if(Report.length === 0) {
    ReportList.push(<tr key={0} className="ListRow"><td colSpan={6}>신고 내역이 존재하지 않습니다.</td></tr>);
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
            {ReportList.slice(offset, offset + limit)}
          </tbody>
        </table>
        <Pagination
          total={ReportList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <div className="ManageBottom">
          <div className="ManageSearch">
            <input type="text" onChange={e=>SetSearchWord(e.target.value)}></input>
            <Link to={{pathname: '/manager/report/'+SearchWord}} state={{searchword: SearchWord}}>
              <button type="button">검색</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}