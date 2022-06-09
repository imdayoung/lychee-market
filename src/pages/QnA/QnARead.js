import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from 'axios';
import Header from "../../components/Header";
import getCookie from "../../components/GetCookie";

export default function QnARead(){  
  let Navigate = useNavigate();
  let Location = useLocation();

  //관리자이면 답변 저장 가능해야하고
  //작성자이면 문의 삭제 가능해야 함
  //답변이 작성되어 있는 경우 작성자, 날짜, 내용 불러오기만 하고 편집 불가능하게 함
  //답변 작성되어있지 않고 관리자이면 작성자, 날짜 현재 상태로 작성하고 편집 가능하게 함
  var IsManager = false;
  const [IsWriter, setIsWriter] = useState(false);
  const [IsAnswered, setIsAnswered] = useState(false);
  let userid = '';
  let managerid = '';
  const cookie = getCookie("is_login");
  
  if(cookie === "true"){
    userid = localStorage.getItem("user_id");
    managerid = localStorage.getItem("manager_id");
    if(managerid !== null)
      IsManager = true;
  }
  
  // 문의사항 정보
  const [view, setView] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [uid, setUid] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [aid, setAid] = useState('');
  const [adate, setAdate] = useState('');
  const [acontent, setAcontent] = useState('');

  // location의 pathname으로부터 noticd_id 얻기
  useEffect(()=>{
    console.log('location', Location);
  }, [Location]);
  const qid = Location.pathname.split('/').slice(-1)[0];

  // 공지사항 정보 불러오기
  useEffect(()=>{
    Axios.get('http://localhost:8080/qna/read/'+qid)
    .then((res)=>{
      console.log(res.data);
      setView(res.data[0].view);
      setCategory(res.data[0].q_category);
      const tempdate = res.data[0].q_date;
      
      setDate(tempdate.split('T')[0]);
      setUid(res.data[0].q_id);
      if(res.data[0].q_id === userid){
        //IsWriter = true;
        setIsWriter(true);
      }
      setTitle(res.data[0].q_title);
      setContent(res.data[0].q_content);

      setAid(res.data[0].a_id);
      if(res.data[0].a_id !== ""){
        setIsAnswered(true);
        if(IsManager === true)
          setAid(managerid);
      }
      if(res.data[0].a_date === null){
        let now = new Date();
        let month = now.getMonth()+1;
        let nowdate = now.getFullYear() + "-" + month + "-" + now.getDate();
        setAdate(IsManager ? nowdate : '');
      }
      else{
        const tempadate = res.data[0].a_date;
        setAdate(tempadate.split('T')[0]);
      }
      setAcontent(res.data[0].a_content);
    });
  },[qid]);

  // 공지사항 삭제
  const DeleteClick = () => {
    if(window.confirm("정말 삭제하시겠습니까?") === true){ 
      Axios.post("http://localhost:8080/qna/delete", {
        qid: qid,
      }).then((res)=>{
          console.log(res);
          if(res.data === true)
              Navigate(-1);
          else{
              alert("문의사항 삭제 실패");
              Navigate(-1);
          }
      });
    }
  }

  const AnswerClick = () => {
    Axios.post("http://localhost:8080/qna/answer/"+qid, {
      aid: aid,
      adate: adate,
      acontent: acontent,
    }).then((res) => {
        console.log(res);
        if(res.data === true)
            Navigate(-1);
        else{
            alert("문의사항 답변 실패");
            Navigate(-1);
        }
    });
  }

  // 목록으로 돌아가기
  const ListClick = ()=>{
      Navigate('/qna');
  }

  return (
    <div>
      <Header detail='문의사항'/>
      <main className="qna">
        <span>&lt;문의&gt;</span>
        <table className="qnaRead">
          <tbody className="qnaReadbody">
          <tr className="q_row">
            <th className="q_th">조회수</th>
            <td><input 
              className="n_td" type='text'
              value={view}
              readOnly="true"
             /></td>
          </tr>
          <tr className="q_row">
            <th className="q_th">카테고리</th>
            <td><input 
              className="n_td" type='text'
              value={category}
              readOnly="true"
             /></td>
          </tr>
          <tr className="q_row">
            <th className="q_th">작성자</th>
            <td><input 
              className="n_td" type='text'
              value={uid}
              readOnly="true"
             /></td>
          </tr>
          <tr className="q_row">
            <th className="q_th">작성날짜</th>
            <td><input 
              className="n_td" type='text'
              value={date}
              readOnly="true"
             /></td>
          </tr>
          <tr className="q_row">
            <th className="q_th">제목</th>
            <td><input 
              className="n_td" type='text'
              value={title}
              readOnly="true"
             /></td>
          </tr>
          <tr className="q_row">
            <th className="q_th">내용</th>
            <td><textarea className="q_td_content" 
              value={content} 
              readOnly="true"/>
            </td>
          </tr>
          </tbody>
        </table>
        <br/>
        <span>&lt;답변&gt;</span>
        <table className="qnaRead">
        <tbody>
          <tr className="q_row">
            <th className="q_th">작성자</th>
            <td><input 
              className="n_td" type='text'
              value={aid}
              readOnly="true"
             /></td>
          </tr>
          <tr className="q_row">
            <th className="q_th">작성날짜</th>
            <td><input 
              className="n_td" type='text'
              value={adate}
              readOnly="true"
             /></td>
          </tr>
          <tr className="q_row">
            <th className="q_th">내용</th>
            <td><textarea
              className="q_td_content" type='text'
              value={acontent}
              readOnly={IsManager?false:true}
              onChange={(event) => setAcontent(event.target.value)}
             /></td>
          </tr>
        </tbody>
        </table>
        <div className="buttons">
          <button className="back" type="button" onClick={ListClick}>목록</button>
          <button className="submit" type="button" hidden={IsManager?(IsAnswered?true:false):true} onClick={AnswerClick}>답변하기</button>
          <button className="submit" type="button" hidden={IsWriter?false:true} onClick={DeleteClick}>삭제하기</button>
        </div>
      </main>
    </div>
  )
}

//