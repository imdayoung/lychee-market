import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

export default function ProductHistory(props) {
  const [Products, SetProducts] = useState([]);
  const [Option, SetOption] = useState("all");

  const HandlerOption = (e) => {
    SetOption(e.target.value);
  };

  useEffect(() => {
    axios
      .post(`http://localhost:8080/mypage/${props.Type}`, {
        Id: props.Id,
        Option: Option,
      })
      .then((res) => {
        console.log(res.data);
        SetProducts(
          res.data.map((data, index) => (
            <Product
              key={index}
              Img={data.product_img}
              Title={data.product_title}
              Amount={parseInt(data.product_price)}
            />
          ))
        );
      })
      .catch((err) => {
        console.log("상품 불러오기 실패");
      });
  },[Option, props.Type, props.Id]);

  return (
    <div>
      <select id="DropDown" onChange={HandlerOption}>
        <option value="all">전체보기</option>
        <option value="doing">거래중</option>
        <option value="done">거래완료</option>
      </select>
      <div className="MyPageProductList">
        {Products}
      </div>
    </div>
  );
}
