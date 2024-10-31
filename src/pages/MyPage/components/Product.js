import { Link } from "react-router-dom";
import * as Common from "../../../components/CommonFunc";

export default function Product(props) {
  return (
    <Link to={"/"+props.ProductType+"/detail/"+props.ProductId} style={{textDecoration:"none", color: "black"}}>
      <div id="MyPageProduct">
        <img id="MyPageProductImg" alt="상품이미지" src={props.Img == null ? "images/products/prod00.png" : props.Img}></img>
        <div id="MyPageProductDetail">
          <div id="MyPageProductTitle">{props.Title}</div>
          <div className="OnlyFontBold">
            {Common.MoneyComma(props.Amount)}원
          </div>
        </div>
      </div>
    </Link>
  );
}
