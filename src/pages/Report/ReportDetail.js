import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from 'axios';
import moment from "moment";
import Header from "../../components/Header"

export default function ReportDetail(){
  let Navigate = useNavigate();
  let Location = useLocation();

  const IsManager = false;   // 관리자 추가 필요
  const ManagerId = 'admin2';

  if(IsManager){
    var now = moment();
    var WriteDate = now.format('YYYY-MM-DD');
  }

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

  const [SolveContent, SetSolveContent] = useState('');

  // location의 pathname으로부터 report_id 얻기
  useEffect(()=>{
    console.log('location', Location);
  }, [Location]);
  const ReportId = Location.pathname.split('/').slice(-1)[0];
  
  // 신고 상세 정보 받아오기
  useEffect(()=>{
    Axios.get('http://localhost:8080/report/detail/'+ReportId)
    .then((res) => {
      SetContent(res.data[0]);
      console.log(res.data[0]);
    });
  },[ReportId]);

  // 신고 답변 저장
  const AnswerClick = ()=>{
    if(window.confirm("해당 내용으로 답변하시겠습니까?")===true){
      Axios.post('http://localhost:8080/report/answer',{
        report_id: Content.report_id,
        solve_id: ManagerId,
        solve_date: WriteDate,
        solve_content: SolveContent,
      }).then((res)=>{
        console.log(res);
        if(res.data === true)
          Navigate(-1);
        else{
          alert("신고 답변 저장 실패");
          Navigate(-1);
        }
      });
    }
  }
  
  // 신고 삭제
  const DeleteClick = ()=>{
    if(window.confirm("정말 삭제하시겠습니까?")===true){
      Axios.post('http://localhost:8080/report/delete',{
        report_id: Content.report_id
      }).then((res)=>{
        console.log(res);
        if(res.data === true)
          Navigate(-1);
        else{
          alert("신고 삭제 실패");
          Navigate(-1);
        }
      });
    }
  }

  // 목록으로 돌아가기
  const ListClick = ()=>{
    Navigate(-1);
  }

  // 게시물 신고인 경우 상품글로 이동
  const ProductClikc = ()=>{
    Navigate("/buy"); // 상품 번호 추가해줘야함!!!!!
  }

  return (
    <div>
      <Header props={'신고 | 상세'}/>
      <main className="ReportMain">
        <table className="ReportTable">
          <caption>문의</caption>
          <tbody>
            <tr className="ReportRow">
              <th className="ReportTh">번호</th>
              <td><input className="ReportTdShort" value={Content.report_id} readOnly/></td>
              <th className="ReportTh">유형</th>
              <td>
                <input className={Content.report_type==="게시물 신고"?"ReportTdButton":"ReportTdShort"} value={Content.report_type} readOnly/>
                <button className="ToProduct" type="button" onClick={ProductClikc} hidden={Content.report_type==="게시물 신고"?false:"ReportTdShort"}>이동</button>
              </td>
            </tr>
            <tr className="ReportRow">
              <th className="ReportTh">작성 날짜</th>
              <td><input className="ReportTdShort" value={moment(Content.report_date).format("YYYY-MM-DD")} readOnly/></td>
              <th className="ReportTh">작성자</th>
              <td><input className="ReportTdShort" value={Content.reporter_id} readOnly/></td>
            </tr>
            <tr className="ReportRow">
              <th className="ReportTh">제목</th>
              <td colSpan="3"><input className="ReportTdLong" value={Content.report_title} readOnly/></td>
            </tr>
            <tr className="ReportRow">
              <th className="ReportTh">내용</th>
              <td colSpan="3"><textarea className="ReportTdContent" value={Content.report_detail} readOnly></textarea></td>
            </tr>
            <tr className="ReportRow">
              <th className="ReportTh">첨부파일</th>
              <td><img className="ReportTdShort" src={Content.report_file} alt={Content.report_file===null ? '파일 없음' : Content.report_file}/></td>
              {/* 파일 불러오도록 수정필요한데 안된다는 얘기가 있네...? 이미지만 경로 통해서 불어올 수 있는 듯...? */}
              <th className="ReportTh">신고아이디</th>
              <td><input className="ReportTdShort" value={Content.reported_id} readOnly/></td>
            </tr>
          </tbody>
        </table>
        <table className="AnswerTable">
          <caption>답변</caption>
          <tbody>
            <tr className="AnswerRow">
              <th className="AnswerTh">작성자</th>
              <td><input className="AnswerTdShort" type="text" value={Content.solve_id!==null ? Content.solve_id : IsManager ? ManagerId : ''} readOnly/></td>
              <th className="AnswerTh">작성 날짜</th>
              <td><input className="AnswerTdShort" type="text" value={Content.solve_date!==null ? moment(Content.solve_date).format("YYYY-MM-DD") : IsManager ? WriteDate : ''} readOnly/></td>
            </tr>
            <tr className="AnswerRow">
              <th className="AnswerTh">내용</th>
              <td colSpan="3">
                <textarea className="AnswerTdContent" type="text" defaultValue={Content.solve_content}
                          readOnly={IsManager && Content.solve_content===null ? false : true}
                          onChange={(event) => SetSolveContent(event.target.value)}/>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="ReportButtons">
          <button className="List" type="button" onClick={ListClick}>목록</button>
          <button className="Submit" type="button" onClick={AnswerClick} hidden={!IsManager || Content.solve_id !== null}>답변 저장</button>
          <button className="Submit" type="button" onClick={DeleteClick} hidden={IsManager}>신고 삭제</button>
        </div>
      </main>
    </div>
  );
}