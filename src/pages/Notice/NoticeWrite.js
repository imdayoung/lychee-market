import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import ManagerHeader from "../../components/Header3"
import getCookie from "../../components/GetCookie";
import "../../style/Notice.css";

export default function NoticeWrite(){
  let Navigate = useNavigate();

  const Cookie = getCookie("is_login");
  var IsManager = false;
  var ManagerId = '';
  
  if(Cookie === "true"){
      ManagerId = localStorage.getItem("manager_id");
      if(ManagerId !== null)
      IsManager = true;
  }

  // 공지사항 작성 날짜 받아오기
  var Now = moment();
  var NoticeDate = Now.format('YYYY-MM-DD');
  
  // 공지사항 제목, 내용, 이미지
  const [NoticeTitle, SetNoticeTitle] = useState('');
  const [NoticeContent, SetNoticeContent] = useState('');
  const [NoticeImg, SetNoticeImg] = useState('');
  const [ImgName, SetImgName] = useState('');

  useEffect(()=>{
    if(!IsManager) {
      alert("해당 페이지에 접근 권한이 없습니다.");
      Navigate(-1);
    }
  });

  // 공지사항 작성
  const SubmitClick = ()=>{
    if(ImgName!==''){
      // 이미지 업로드를 위해 formdata 생성
      const formData = new FormData();
      formData.append('img', NoticeImg);

      Axios.post("http://localhost:8080/upload/image", formData);
    }        

    Axios.post("http://localhost:8080/notice/write", {
      manager_id: ManagerId,
      notice_date: NoticeDate,
      notice_title: NoticeTitle,
      notice_content: NoticeContent,
      notice_img: ImgName!==''?'/images/notice/'+ImgName:null,
    }).then((res)=>{
      console.log(res);
      if(res.data === true){
        alert("공지사항 업로드가 완료되었습니다.");
        Navigate('/notice');
      }
      else{
        alert("공지사항 업로드를 실패하였습니다.");
        Navigate('/notice/write');
      }
    });
  };

  // 목록으로 돌아가기
  const ListClick = ()=>{
    if(window.confirm("공지사항 목록으로 돌아가시겠습니까?") === true){ 
      Navigate('/notice');
    }          
  };
   
  return (
    <div>
      <ManagerHeader keyword='공지사항 | 작성'/>
        <main className="noticeMain">
          <table className="noticeWrite">
            <tbody>
              <tr className="n_row">
                <th className="n_th">제목</th>
                <td><input className="n_td" type='text' onChange={(e) => SetNoticeTitle(e.target.value)}/></td>
              </tr>
              <tr className="n_row">
                <th className="n_th">작성 날짜</th>
                <td><input className="n_td" type='text' value={NoticeDate} readOnly/></td>
              </tr>
              <tr className="n_row">
                <th className="n_th">작성자</th>
                <td><input className="n_td" type='text' value={ManagerId} readOnly/></td>
              </tr>
              <tr className="n_row">
                <th className="n_th">내용</th>
                <td>
                  <textarea className="n_td_content" onChange={(e) => SetNoticeContent(e.target.value)}>
                  </textarea>
                </td>
              </tr>
              <tr className="n_row">
                  <th className="n_th">이미지</th>
                  <td><input className="n_td_image" type="file" accept="image/png, image/jpeg" onChange={(e) => {SetNoticeImg(e.target.files[0]); SetImgName(e.target.files[0].name)}}/></td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            <button className="list" type="button" onClick={ListClick}>목록</button>
            <button className="submit" type="button" onClick={SubmitClick}>작성하기</button>
          </div>
      </main>
    </div>
  )
}
