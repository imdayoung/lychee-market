import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from 'axios';
import Header from "../../components/Header";
import ProductCategory from "../../components/ProductCategory";
import '../../style/ProductUpload.css';
import getCookie from "../../components/GetCookie";

function ProductUpload() {
  const navigate = useNavigate();
  
  let inputid;
  const cookie = getCookie("is_login");
  if (cookie === "true") {
    inputid = localStorage.getItem("user_id");
  }

  let image_num = 0;
  let sellerid, buyerid;

  const [dealtype, setDealtype] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [dealmethod, setDealmethod] = useState('');
  const [image, setImage] = useState('');
  const [imagename, setImagename] = useState('');

  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState('');

  const goBack = () => {
    navigate(-1);
  }

  const pricecheck = (data) => {
    var regExp = /^[0-9]+$/;
    return regExp.test(data);
  }

  useEffect(() => {
    if (
      dealtype === "" ||
      title === "" ||
      category === "" ||
      price === "" ||
      dealmethod === "" ||
      detail === ""
    ) {
      setError(true);
      setErrormsg("필수 정보를 모두 입력해주세요.")
    } else if(title.length > 30){
      setError(true);
      setErrormsg("제목은 30자 이내로 작성해야 합니다.")
    } else if(!pricecheck(price)){
      setError(true);
      setErrormsg("가격은 숫자만 작성해야 합니다.")
    } else {
      setError(false);
    }
  }, [error, price, title, detail]);

  const changeDealtype = (e) => {
    setDealtype(e.target.value);
    // alert(e.target.value);
  }

  const changeDealmethod = (e) => {
    setDealmethod(e.target.value);
    // alert(e.target.value);
  }

  const changeCategory = (e) => {
    setCategory(e.target.value);
    //alert(e.target.value);
  }

  const changeImage = (e) => {
    setImage(e.target.files[0]);
    setImagename(e.target.files[0].name);
  };

  const onSubmit = () => {
    if(image){
      image_num = 1;
      const formData = new FormData();
      formData.append("img", image);
      Axios.post("http://localhost:8080/uploadproductimg", formData);
    }
    let now = new Date();
    let month = now.getMonth()+1;
    let date = now.getFullYear() + "-" + month + "-" + now.getDate()
    + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    if(dealtype === "0"){
      sellerid = inputid;
    } else {
      buyerid = inputid;
    }

    Axios.post('http://localhost:8080/productupload', {
      sellerid: sellerid,
      buyerid: buyerid,
      like: 0,
      image_num: image_num,
      dealflag: 0,
      dealtype: dealtype,
      title: title,
      category: category,
      price: price,
      detail: detail,
      dealmethod: dealmethod,
      image: imagename!==''?'/images/products/'+imagename:null,
      date: date,
    }).then((res) => {            
      if(res.data !== false){
        alert("업로드 완료");
        const pid = res.data[0].product_id;
        if(dealtype === 0)
          navigate('/sell/detail/'+pid);
        else if(dealtype === 1)
          navigate('/buy/detail/'+pid);
      }
      else {
        alert("업로드 실패");
        navigate(-1);
      }
    })
  }

  return (
    <div className="main">
      <Header keyword="중고거래 글쓰기"/>
      <div className="newproduct">
        <table className="submitnewproduct">
            <tbody>
            <tr className="p_row">
              <th className="p_th">거래 종류 <span className="p_must">*</span></th>
              <td>
                <input type="radio" name="dealtype" value="1"
                onChange={changeDealtype}/>판매하기
                &nbsp;&nbsp;&nbsp;
                <input type="radio" name="dealtype" value="0"
                onChange={changeDealtype}/>구매하기
              </td>
            </tr>
            <tr className="p_row">
              <th className="p_th">상품 이미지</th>
              <td>
                <input className="p_td_image" type="file" accept="image/png, image/jpeg"
                onChange={changeImage}/>
              </td>
              
            </tr>
            
            <tr className="p_row">
              <th className="p_th">상품 제목 <span className="p_must">*</span></th>
              <td>
                <input className="p_td" type="text"
                placeholder="제목을 입력해주세요. (최대 30자)"
                onChange={(e) => setTitle(e.target.value)}/>
              </td>
            </tr>
            <tr className="p_row">
              <th className="p_th">카테고리 <span className="p_must">*</span></th>
              <td>
                <ProductCategory setData={changeCategory}/>
              </td>
            </tr>
            <tr className="p_row">
              <th className="p_th">상품 가격 <span className="p_must">*</span></th>
              <td>
                <input className="p_td_price" type="text"
                placeholder="숫자만 입력해주세요."
                onChange={(e) => setPrice(e.target.value)}/>
                <div className="won">원</div>
              </td>
            </tr>
            <tr className="p_row">
              <th className="p_th">거래방식 <span className="p_must">*</span></th>
              <td>
                <input type="radio" name="dealmethod" value="직거래"
                onChange={changeDealmethod}/>직거래
                &nbsp;&nbsp;&nbsp;
                <input type="radio" name="dealmethod" value="택배거래"
                onChange={changeDealmethod}/>택배거래
                &nbsp;&nbsp;&nbsp;
                <input type="radio" name="dealmethod" value="둘 다"
                onChange={changeDealmethod}/>둘 다
              </td>
            </tr>
            <tr className="p_row">
              <th className="p_th">설명 <span className="p_must">*</span></th>
              <td>
                <textarea className="p_td_content" type="text"
                onChange={(e) => setDetail(e.target.value)}/>
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        {error ? <div className="errmsgbox">
          <span className="regerrormsg">{errormsg}</span>
          </div> : <></>}
        <div className="buttons">
          <button className="back" type="button" onClick={goBack}>취소</button>
          { error ? <button className="Nsubmit" type="button">글쓰기</button>
          : <button className="submit" type="button" onClick={onSubmit}>글쓰기</button>}
        </div>
      </div>
    </div>
  )
}

export default ProductUpload;