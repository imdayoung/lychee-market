import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from 'axios'
import QnACategory from "../../components/QnACategory";
import Header from "../../components/Header";

import '../../style/QnA.css';
import getCookie from "../../components/GetCookie";

function QnAWrite(){
  //들어갈 내용 : q_id, q_date, q_catgory, q_content, view=0, private_flag = 0이면 비공개
  const navigate = useNavigate();
  const location = useLocation();
  //const [id, setId] = useState('');
  let id = "";
  //const id = 'idtest2';  //로그인 정보에서 받아오기 ...
  const cookie = getCookie("is_login");
  if(cookie === "true"){
    id = localStorage.getItem("user_id");
  }
  
  const view = 0;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [pflag, setPflag] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(error);
    if(
      title === "" ||
      content === "" ||
      category === "" ||
      category === "none" ||
      pflag === ""
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [error, title, content, category, pflag]);

  const goBack = () => {
    navigate(-1);
  }

  const changePrivate = (e) => {
    setPflag(e.target.value);
  }

  const changeCategory = (e) => {
    setCategory(e.target.value);
  }

  const onSubmit = () => {
    let now = new Date();
    let month = now.getMonth()+1;
    let date = now.getFullYear() + "-" + month + "-" + now.getDate();

    Axios.post('http://localhost:8080/qnawrite', {
      id: id,
      title: title,
      content: content,
      category: category,
      pflag: pflag,
      date: date,
      view: view,
    }).then((res) => {
      if(res.data === false){
        alert("문의사항 작성 실패!");
      }
      else{
        alert("문의사항 작성 성공!");
        navigate('/qna/read/'+res.data.id);
      }
    })
  }

  return (
    <div className="main">
      <Header keyword="문의 작성하기"/>
      <main className="qna">
        <table className="submitqna">
          <tbody>
            <tr className="q_row">
              <th className="q_th">공개 여부</th>
              <td>
                <input type="radio" name="private" value="0"
                onChange={changePrivate}/>공개
                &nbsp;&nbsp;&nbsp;
                <input type="radio" name="private" value="1"
                onChange={changePrivate}/>비공개
              </td>
            </tr>
            <tr className="q_row">
              <th className="q_th">제목</th>
              <td>
                <input className="q_td" type="text"
                placeholder="제목을 입력해주세요. (최대 30자)"
                onChange={(e) => setTitle(e.target.value)}/>
              </td>
            </tr>
            <tr className="q_row">
              <th className="q_th">카테고리</th>
              <td>
                <QnACategory setData={changeCategory}/>
              </td>
            </tr>
            <tr className="q_row">
              <th className="q_th">내용</th>
              <td>
                <textarea className="q_td_content" type="text"
                onChange={(e) => setContent(e.target.value)}/>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="buttons">
          <button className="back" type="button" onClick={goBack}>취소</button>
          { error ? <button className="Nsubmit" type="button">문의하기</button> 
          : <button className="submit" type="button" onClick={onSubmit}>문의하기</button>}
        </div>

      </main>
    </div>
  )
}

export default QnAWrite;