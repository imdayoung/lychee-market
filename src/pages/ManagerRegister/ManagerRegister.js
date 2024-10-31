import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import RegInput from "../../components/RegInput";
import RegSubmitBtn from "../../components/RegSubmitBtn";
import Header3 from "../../components/Header3"

import "../../style/Register.css"

function ManagerRegister(){

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwconfirm, setPwconfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState('');
  const [idoverlap, setIdoverlap] = useState(false);
  const [nickoverlap, setNickoverlap] = useState(false);

  const onSubmit = () => {
    
    Axios.post('http://localhost:8080/manager/register', {
      id: id,
      pw: pw,
      nickname: nickname,
    }).then((res) => {
      if(res.data.message === "성공"){
        alert("매니저 회원가입 성공");
        navigate('/manager/main');
      }
      else if(res.data.message === "실패"){
        alert("매니저 회원가입 실패");
      }
    })
  }

  const onIdOverlap = () => {
    Axios.post('http://localhost:8080/idoverlap', {
      id: id,
    }).then((res) => {
      if(res.data){ //이미 존재하는 아이디인 경우
        alert("이미 존재하는 아이디입니다!");
      }
      else{ //존재하지 않는 아이디인 경우
        alert("사용 가능한 아이디입니다!");
        setIdoverlap(true);
      }
    })
  }

  const onNickOverlap = () => {
    Axios.post('http://localhost:8080/nickoverlap', {
      nickname: nickname,
    }).then((res) => {
      if(res.data){ //이미 존재하는 닉네임인 경우
        alert("이미 존재하는 닉네임입니다!");
      }
      else{ //존재하지 않는 닉네임인 경우
        alert("사용 가능한 닉네임입니다!");
        setNickoverlap(true);
      }
    })
  }

  const pwconfirmcheck = (data) => {
    return (pw === data)
  }

  useEffect(() => {
    console.log(error);
    if (
      id === "" ||
      pw === "" ||
      pwconfirm === "" ||
      nickname === "" 
    ) {
      setError(true);
      setErrormsg("모두 입력해주세요.");
    } else if (!pwconfirmcheck(pwconfirm)){
      setError(true);
      setErrormsg("비밀번호가 일치하지 않습니다!");
    } else if (!idoverlap){
      setError(true);
      setErrormsg("아이디 중복 확인을 해주세요")
    } else if (!nickoverlap){
      setError(true);
      setErrormsg("닉네임 중복 확인을 해주세요")
    } else {
      setError(false);
    }
  }, [error, id, nickname, pw, pwconfirm, idoverlap, nickoverlap]);

  return (
    <div className="main">
      
      <Header3 keyword="관리자 회원가입"/>
      <br/><br/><br/><br/>
      <div className="register">
        <RegInput
          distinct={"Short"}
          type={"text"}
          placeholder={"아이디"}
          value={id}
          setValue={setId}
        />
        <button className="overlap" onClick={onIdOverlap}>중복 확인</button>
        <br/>
        <RegInput
          type={"password"}
          placeholder={"비밀번호 (영문자와 숫자 조합, 6자리 이상)"}
          value={pw}
          setValue={setPw}
        /><br/>
        <RegInput
          type={"password"}
          placeholder={"비밀번호 확인"}
          value={pwconfirm}
          setValue={setPwconfirm}
        /><br/>
        <RegInput
          distinct={"Short"}
          type={"text"}
          placeholder={"닉네임"}
          value={nickname}
          setValue={setNickname}
        />
        <button className="overlap" onClick={onNickOverlap}>중복 확인</button>
        <br/>
        {error ? <div className="errmsgbox">
          <span className="regerrormsg">{errormsg}</span>
          </div> : <></>}
        
        <RegSubmitBtn
         onClick={onSubmit}
         text={"가입하기"}
         disabled={error}
        />
      </div>
    </div>
  )
}

export default ManagerRegister;