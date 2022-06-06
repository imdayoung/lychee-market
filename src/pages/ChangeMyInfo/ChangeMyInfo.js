import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'
import RegInput from "../../components/RegInput";
import RegSubmitBtn from "../../components/RegSubmitBtn";
import AddrModal from "../../components/AddrModal";
import Header from "../../components/Header";

// import '../../style/ChangeMyInfo.css'

function ChangeMyInfo(){

  const navigate = useNavigate();

  const id = 'idtest';  //사용 시 마이페이지에서 받아오거나 ..
  //const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwconfirm, setPwconfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState('');

  const [nickoverlap, setNickoverlap] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = () => {
    Axios.post('http://localhost:8080/changemyinfo', {
      id: id,
      pw: pw,
      nickname: nickname,
      location: location,
    }).then((res) => {
      if(res.data.message === "성공"){
        alert("내 정보 수정 성공");
        navigate('/mypage');
      }
      else if(res.data.message === "실패"){
        alert("내 정보 수정 실패");
      }
    })
  };

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
  };

  const pwcheck = (data) => {
    //pw 조건 - 6자리 이상, 영문자와 숫자 조합
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,30}$/
    return regExp.test(data);
  };

  const pwconfirmcheck = (data) => {
    return (pw === data)
  };

  useEffect(() => {
    Axios.post('http://localhost:8080/getmyinfo', {
      id: id,
    }).then((res) => {
      if(res.data.message){
        alert(res.data.message);
      }
      else{
        setName(res.data[0].user_name)
        setPw(res.data[0].user_pwd);
        setNickname(res.data[0].user_nickname);
        setPhone(res.data[0].user_phone);
        setLocation(res.data[0].user_location);
      }
    })
  },
  // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
  []);

  useEffect(() => {
    console.log(error);
    if (
      pw === "" ||
      pwconfirm === "" ||
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
    } else if (!nickoverlap){
      setError(true);
      setErrormsg("닉네임 중복 확인을 해주세요")
    } else {
      setError(false);
    }
  }, [error, id, name, nickname, phone, pw, pwconfirm, location, nickoverlap]);


  return (
    <div className="main">
      <Header keyword="내 정보 수정"/>
      
      <div className="register">
        <br/>
        <div className="warning">* 비밀번호, 닉네임, 거래장소만 수정 가능합니다.</div>
        <div className="hint">아이디</div>
        <RegInput
          type={"text"}
          placeholder={"아이디"}
          value={id}
        />
        <br/>
        <div className="hint">비밀번호</div>
        <RegInput
          type={"password"}
          placeholder={"비밀번호 (영문자와 숫자 조합, 6자리 이상)"}
          value={pw}
          setValue={setPw}
        /><br/>
        <div className="hint">비밀번호 확인</div>
        <RegInput
          type={"password"}
          placeholder={"비밀번호 확인"}
          value={pwconfirm}
          setValue={setPwconfirm}
        /><br/>
        <div className="hint">이름</div>
        <RegInput
          type={"text"}
          placeholder={"이름"}
          value={name}
        /><br/>
        <div className="hint">휴대폰 번호</div>
        <RegInput
          type={"text"}
          placeholder={"휴대폰"}
          value={phone}
        />
        <br/>
        <div className="hint">닉네임</div>
        <RegInput
          distinct={"Short"}
          type={"text"}
          placeholder={"닉네임"}
          value={nickname}
          setValue={setNickname}
        />
        <button className="overlap" onClick={onNickOverlap}>중복 확인</button>
        <br/>
        <div className="hint">거래 장소</div>
        <RegInput
          distinct={"Short"}
          type={"text"}
          placeholder={"거래 장소"}
          value={location}
        />
        <button className="overlap" onClick={openModal}>주소 찾기</button><br/>
        <AddrModal setData={setLocation} open={modalOpen} close={closeModal} header="주소 찾기">
        </AddrModal>
        <div className="errmsgbox">
          {error ? <span className="regerrormsg">{errormsg}</span> : <></>}
        </div>
        <RegSubmitBtn
         onClick={onSubmit}
         text={"수정하기"}
         disabled={error}
        />
      </div>
    </div>
  )
}

export default ChangeMyInfo;