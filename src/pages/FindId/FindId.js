import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'
import LoginInput from "../../components/LoginInput";
import SubmitBtn from "../../components/SubmitBtn";
import FindIdHeader from "./FindIdHeader";

function FindId(){

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const [id, setId] = useState('');
  const [found, setFound] = useState(false);
  
  const onSubmit = () => {
    Axios.post('http://localhost:8080/findid', {
      name: name,
      phone: phone,
    }).then((res) => {
      if(res.data.message){ //login 실패 시
        alert(res.data.message);
      }
      else{
        setId(res.data[0].user_id);
        setFound(true);
      }
    })
  }

  useEffect(() => {
    console.log(error);
    if (
      name === "" ||
      phone === ""
    ) {
      setError(true);
      setFound(false);
    } else {
      setError(false);
    }
  }, [error, name, phone]);

  return (
    <div className='main'>
      <FindIdHeader/>
      
      <div className='findid'>
        <LoginInput
          type={"text"}
          placeholder={"이름"}
          value={name}
          setValue={setName}
        />
        <br/>
        <LoginInput
          type={"text"}
          placeholder={"휴대폰 번호"}
          value={phone}
          setValue={setPhone}
        /><br/>
        <SubmitBtn
         onClick={onSubmit}
         text={"아이디 찾기"}
         disabled={error}
        /><br/>
        <br/><br/>
      </div>

      {found ? <div className='findidresult'>
        <span className='foundid'>
          {name} 님의 아이디는 {id} 입니다.
        </span>
        </div> : <></>}

    </div>
  )
}

export default FindId;