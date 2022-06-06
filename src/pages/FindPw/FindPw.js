import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'
import LoginInput from "../../components/LoginInput";
import SubmitBtn from "../../components/SubmitBtn";
import FindPwHeader from "./FindPwHeader";

function FindPw(){

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [found, setFound] = useState(false);
  
  const onSubmit = () => {
    Axios.post('http://localhost:8080/findpw', {
      id: id,
      name: name,
      phone: phone,
    }).then((res) => {
      if(res.data.message){ //login 실패 시
        alert(res.data.message);
      }
      else{
        let originpw = res.data[0].user_pwd;
        originpw = originpw.substr(0, originpw.length-3);  //맨 뒤 두자리는 보여주지 않음
        setPw(originpw + "**")
        setFound(true);
      }
    })
  }

  useEffect(() => {
    console.log(error);
    if (
      id === "" ||
      name === "" ||
      phone === ""
    ) {
      setError(true);
      setFound(false);
    } else {
      setError(false);
    }
  }, [error, id, name, phone]);

  return (
    <div className='main'>

      <FindPwHeader/>

      <div className='findpw'>
        <LoginInput
          type={"text"}
          placeholder={"아이디"}
          value={id}
          setValue={setId}
        /><br/>
        <LoginInput
          type={"text"}
          placeholder={"이름"}
          value={name}
          setValue={setName}
        /><br/>
        <LoginInput
          type={"text"}
          placeholder={"휴대폰 번호"}
          value={phone}
          setValue={setPhone}
        /><br/>
        <SubmitBtn
          onClick={onSubmit}
          text={"비밀번호 찾기"}
          disabled={error}
        /><br/>
      </div>

      <br/><br/>
        {found ? <div className='findpwresult'>
          <span className='foundpw'>
            {name} 님의 비밀번호는 {pw} 입니다.
          </span>
          </div> : <></>}
          
    </div>
  )
}

export default FindPw;