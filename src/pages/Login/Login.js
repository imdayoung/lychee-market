import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'
import LoginInput from "../../components/LoginInput";
import SubmitBtn from "../../components/SubmitBtn";
import LoginHeader from "./LoginHeader";
import setCookie from "../../components/SetCookie"

import '../../style/Login.css'

function Login(){

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState('');  

  const onSubmit = () => {
    Axios.post('http://localhost:8080/login', {
      id: id,
      pw: pw,
    }).then((res) => {
      if(res.data.message === "일반회원"){
        const result =  res.data.result[0];
        localStorage.setItem("user_id", result.user_id);
        localStorage.setItem("user_pwd", result.user_pwd);
        localStorage.setItem("user_name", result.user_name);
        localStorage.setItem("user_nickname", result.user_nickname);
        localStorage.setItem("user_point", result.user_point);
        localStorage.setItem("user_reliable", result.user_reliable);
        localStorage.setItem("user_location", result.user_location);
        setCookie("is_login", true, 10);
        navigate('/');
      }
      else if(res.data.message === "매니저"){
        const result =  res.data.result[0];
        localStorage.setItem("manager_id", result.manager_id);
        localStorage.setItem("manager_pw", result.manager_pw);
        localStorage.setItem("manager_nickname", result.manager_nickname);
        setCookie("is_login", true, 10);
        navigate('/manager');
      }
      else if(res.data.message){
        alert(res.data.message);
      }
    })
  }

  useEffect(() => {
    console.log(error);
    if (
      id === "" ||
      pw === ""
    ) {
      setError(true);
      setErrormsg("아이디와 비밀번호를 모두 입력해주세요.");
    } else {
      setError(false);
    }
  }, [error, id, pw]);

  return (
    <div className='main'>
      <LoginHeader />

      <div className='login'>
        <LoginInput
          type={"text"}
          placeholder={"아이디"}
          value={id}
          setValue={setId}
        />
        <br/>
        <LoginInput
          type={"password"}
          placeholder={"비밀번호"}
          value={pw}
          setValue={setPw}
        /><br/>
        {error ? <div className="errmsgbox">
          <span className="regerrormsg">{errormsg}</span>
        </div> : <></>}
        <SubmitBtn
         onClick={onSubmit}
         text={"로그인"}
         disabled={error}
        /><br/>
      </div>

      <div className='linkbox'>
        <Link to="/findid" style={{ textDecoration: 'none' }}>
          <span className="linktext">아이디 찾기</span>
        </Link>
        &nbsp;<span>|</span>&nbsp;
        <Link to="/findpw" style={{ textDecoration: 'none' }}>
          <span className="linktext">비밀번호 찾기</span>
        </Link>
        &nbsp;
      </div>

      <div className='toregister'>
        <span className="descript">아직 리치마켓의 회원이 아니라면?</span>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <span className="descriptlink"> 회원가입</span>
        </Link>
      </div>
    </div>
  )
}

export default Login;

