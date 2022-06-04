import { Link } from "react-router-dom";
import * as Common from "../../../components/CommonFunc";

export default function Product(props) {
  return (
    <Link to="/" style={{textDecoration:"none", color: "black"}}>
      <div id="MyPageProduct">
        <img id="MyPageProductImg" alt="상품이미지" src={props.Img == null ? "images/products/prod00.png" : props.Img}></img>
        <div id="MyPageProductDetail">
          <div>{props.Title}</div>
          <div className="OnlyFontBold">
            {Common.MoneyComma(props.Amount)}원
          </div>
        </div>
      </div>
    </Link>
  );
}
