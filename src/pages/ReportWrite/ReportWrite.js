import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from 'axios'
import Header from "../../components/Header";

import '../../style/ReportWrite.css'

function ReportWrite(){

  const navigate = useNavigate();
  const location = useLocation();

  //location.state 통해서 받아와야 하는 정보
  const reporterid = 'repid';  //로그인 한 사람 id
  //const reportedid = location.state.uid;  //신고당한 사람 id
  const reportedid = 'repdid';
  const type = 'type';        //게시글/쪽지 둘 중 하나 선택
  const cid = 1;         //chatroom id, nullable
  const pid = 1;         //product id, nullable

  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');  
  const [detail, setDetail] = useState('');

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState('');

  const goBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    console.log(error);
    if (
      title === "" ||
      detail === "" 
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [error, title, detail]);
  
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const onSubmit = () => {
    if(file){
      const formData = new FormData();
      formData.append("img", file); 
      Axios.post("http://localhost:8080/uploadreportimg", formData)
        .then(res => {
          const { fileName } = res.data;
          //setFileName(res.data.fileName);
          let now = new Date();
          let month = now.getMonth()+1;
          let date = now.getFullYear() + "-" + month + "-" + now.getDate();
          //alert("파일 이름 : "+fileName);

          Axios.post('http://localhost:8080/reportwrite', {
            reporterid: reporterid,
            reportedid: reportedid,
            type: type,
            date: date,
            title: title,
            detail: detail,
            fileName: fileName,
            cid: cid,
            pid: pid,
          }).then((res) => {
            if(res.data.message === "성공"){
              alert("신고 접수 완료");
              navigate('/mypage/report');
            }
            else if(res.data.message === "실패"){
              alert("신고 접수 실패");
            }
          })
        });
    }
    else {    //if문 안에서 image 업로드만 하면 filename 늦게 받아옴 ....
      let now = new Date();
      let month = now.getMonth()+1;
      let date = now.getFullYear() + "-" + month + "-" + now.getDate();

      Axios.post('http://localhost:8080/reportwrite', {
        reporterid: reporterid,
        reportedid: reportedid,
        type: type,
        date: date,
        title: title,
        detail: detail,
        fileName: fileName,
        cid: cid,
        pid: pid,
      }).then((res) => {
        if(res.data.message === "성공"){
          alert("신고 접수 완료");
          navigate('/mypage/report');
        }
        else if(res.data.message === "실패"){
          alert("신고 접수 실패");
        }
      })
    }
  }

  return (
    <div className="main">

      <Header keyword="신고 접수하기"/>
      
      <div className="report">
        <table className="submitreport">
          <tbody>
          <tr className="r_row">
            <th className="r_th">제목</th>
            <td>
              <input className="r_td" type="text"
              onChange={(e) => setTitle(e.target.value)}/>
            </td>
          </tr>

          <tr className="r_row">
            <th className="r_th">신고 유형</th>
            <td>
              <input className="r_td" type="text"
              value={type} readOnly/>
            </td>
          </tr>

          <tr className="r_row">
            <th className="r_th">신고게시글/채팅번호</th>
            <td>
              <input className="r_td" type="text"
              value={cid} readOnly/>
            </td>
          </tr>

          <tr className="r_row">
            <th className="r_th">내용</th>
            <td>
              <textarea className="r_td_content" type="text"
              onChange={(e) => setDetail(e.target.value)}/>
            </td>
          </tr>

          <tr className="r_row">
            <th className="r_th">첨부파일</th>
            <td>
              <input type="file" accept="image/png, image/jpeg" onChange={onChange}/>
            </td>
          </tr>
          </tbody>
        </table>

        <div className="buttons">
          <button className="back" type="button" onClick={goBack}>취소</button>
          { error ? <button className="Nsubmit" type="button">신고하기</button> 
          : <button className="submit" type="button" onClick={onSubmit}>신고하기</button>}
        </div>
      </div>
    </div>
  )
}

export default ReportWrite;