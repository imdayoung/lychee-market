import { useState, useEffect } from "react";
import Axios from 'axios';
import moment from "moment";
import Header from "../../components/Header"

export default function ReportDetail(){
  const [Content, SetContent] = useState({
    report_id: '',
    reporter_id: '',
    reported_id: '',
    report_date: '',
    report_title: '',
    report_type: '', 
    report_detail: '',
    report_file: '',
    msgbox_id: '',
    product_id: '',
    solve_id: '',
    solve_date: '',
    solve_content: '',
  });

  useEffect(()=>{
    Axios.post('http://localhost:8080/report/detail',{
      // report_id: props.report_id,
      report_id: '2',
    }).then((res) => {
        SetContent(res.data[0]);
        console.log(res.data[0]);
    });
  },[]);

  return (
    <div>
      <Header props={'신고 | 상세'}/>
      <main className="ReportMain">
        <table className="ReportTable">
          <caption>문의</caption>
          <tbody>
            <tr className="ListRow">
              <th className="ReportHead">번호</th>
              <td><input className="ReportTdShort" value={Content.report_id} readOnly/></td>
              <th className="ReportHead">유형</th>
              <td><input className="ReportTdShort" value={Content.report_type} readOnly/></td>
            </tr>
            <tr className="ListRow">
              <th className="ReportHead">작성 날짜</th>
              <td><input className="ReportTdShort" value={moment(Content.report_date).format("YYYY-MM-DD")} readOnly/></td>
              <th className="ReportHead">작성자</th>
              <td><input className="ReportTdShort" value={Content.reporter_id} readOnly/></td>
            </tr>
            <tr className="ListRow">
              <th className="ReportHead">제목</th>
              <td colSpan="3"><input className="ReportTdLong" value={Content.report_title} readOnly/></td>
            </tr>
            <tr className="ListRow">
              <th className="ReportHead">내용</th>
              <td colSpan="3"><textarea className="ReportTdContent" defaultValue={Content.report_detail} readOnly></textarea></td>
            </tr>
            <tr className="ListRow">
              <th className="ReportHead">첨부파일</th>
              <td><input className="ReportTdShort" type="file" src={Content.report_file}/></td>
              <th className="ReportHead">신고아이디</th>
              <td><input className="ReportTdShort" value={Content.reported_id} readOnly/></td>
            </tr>
          </tbody>
        </table>
        <table className="AnswerTable">
          <caption>답변</caption>
          <tbody>
            <tr className="ListRow">
              <th className="AnswerTh">작성자</th>
              <td><input className="AnswerTdShort" type="text" defaultValue={Content.solve_id}/></td>
              <th className="AnswerTh">작성 날짜</th>
              <td><input className="AnswerTdShort" type="text" defaultValue={moment(Content.solve_date).format("YYYY-MM-DD")}/></td>
            </tr>
            <tr className="ListRow">
              <th className="AnswerTh">내용</th>
              <td colSpan="3"><textarea className="AnswerTdContent" type="text" defaultValue={Content.solve_content}></textarea></td>
            </tr>
          </tbody>
        </table>
        <div className="ReportButtons">
          <button className="List" type="button">목록</button>
          <button className="Submit" type="button">답변저장</button>
        </div>
      </main>
    </div>
  );
}