import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'
import RegInput from "../../components/RegInput";
import RegSubmitBtn from "../../components/RegSubmitBtn";
import AddrModal from "../../components/AddrModal";
import RegHeader from "./RegHeader";

import '../../style/Register.css'

function Register(){

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwconfirm, setPwconfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState('');

  const [idoverlap, setIdoverlap] = useState(false);
  const [phoneoverlap, setPhoneoverlap] = useState(false);
  const [nickoverlap, setNickoverlap] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = () => {
    let now = new Date();
    let month = now.getMonth()+1;
    let date = now.getFullYear() + "-" + month + "-" + now.getDate();
    Axios.post('http://localhost:8080/register', {
      id: id,
      pw: pw,
      name: name,
      phone: phone,
      nickname: nickname,
      location: location,
      date: date,
    }).then((res) => {
      if(res.data.message === "성공"){
        alert("회원가입 성공");
        navigate('/');
      }
      else if(res.data.message === "실패"){
        alert("회원가입 실패");
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

  const onPhoneOverlap = () => {
    Axios.post('http://localhost:8080/phoneoverlap', {
      phone: phone,
    }).then((res) => {
      if(res.data){ //이미 존재하는 번호인 경우
        alert("이미 존재하는 번호입니다!");
      }
      else{ //존재하지 않는 번호인 경우
        alert("사용 가능한 번호입니다!");
        setPhoneoverlap(true);
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

  const pwcheck = (data) => {
    //pw 조건 - 6자리 이상, 영문자와 숫자 조합
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,30}$/
    return regExp.test(data);
  }

  const pwconfirmcheck = (data) => {
    return (pw === data)
  }

  const phonecheck = (data) => {
    //휴대폰 번호 조건 - 숫자만 입력
    var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
    return regExp.test(data);
  }

  useEffect(() => {
    console.log(error);
    if (
      id === "" ||
      pw === "" ||
      pwconfirm === "" ||
      name === "" ||
      phone === "" ||
      nickname === "" ||
      location === ""
    ) {
      setError(true);
      setErrormsg("모두 입력해주세요.");
    } else if (!pwcheck(pw)){
      setError(true);
      setErrormsg("비밀번호를 올바른 형식으로 입력해주세요.\n영문자와 숫자 조합, 6자리 이상");
    } else if (!pwconfirmcheck(pwconfirm)){
      setError(true);
      setErrormsg("비밀번호가 일치하지 않습니다!");
    } else if (!phonecheck(phone)){
      setError(true);
      setErrormsg("휴대폰 번호를 올바른 형식으로 입력해주세요.\nex)01012345678")
    } else if (!idoverlap){
      setError(true);
      setErrormsg("아이디 중복 확인을 해주세요")
    } else if (!phoneoverlap){
      setError(true);
      setErrormsg("휴대폰 번호 중복 확인을 해주세요")
    } else if (!nickoverlap){
      setError(true);
      setErrormsg("닉네임 중복 확인을 해주세요")
    } else {
      setError(false);
    }
  }, [error, id, name, nickname, phone, pw, pwconfirm, location, idoverlap, nickoverlap, phoneoverlap]);

  return (
    <div className="main">
      
      <RegHeader/>
      <br/><br/>
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
          type={"text"}
          placeholder={"이름"}
          value={name}
          setValue={setName}
        /><br/>
        <RegInput
          distinct={"Short"}
          type={"text"}
          placeholder={"휴대폰 (숫자만 입력)"}
          value={phone}
          setValue={setPhone}
        />
        <button className="overlap" onClick={onPhoneOverlap}>중복 확인</button>
        <br/>
        <RegInput
          distinct={"Short"}
          type={"text"}
          placeholder={"닉네임"}
          value={nickname}
          setValue={setNickname}
        />
        <button className="overlap" onClick={onNickOverlap}>중복 확인</button>
        <br/>
        <RegInput
          distinct={"Short"}
          type={"text"}
          placeholder={"거래 장소"}
          value={location}
        />
        <button className="overlap" onClick={openModal}>주소 찾기</button><br/>
        <AddrModal setData={setLocation} open={modalOpen} close={closeModal} header="주소 찾기">
        </AddrModal>
        
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

export default Register;