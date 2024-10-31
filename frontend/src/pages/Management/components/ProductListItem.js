import { useNavigate } from "react-router-dom";
import Axios from "axios";
import * as Common from "../../../components/CommonFunc"

export default function ProductListItem(props){
  let Navigate = useNavigate();

  const DeleteClick = ()=>{
    if(window.confirm("해당 상품을 삭제하시겠습니까?")===true){
      Axios.post("http://localhost:8080/manager/product",{
        product_id: props.ProductId,
      }).then((res)=>{
        console.log(res);
        if(res.data === true)
          window.location.reload();
        else{
          alert("해당 상품을 삭제하는데 오류가 발생하였습니다.");
          Navigate('/manager/product');
        }
      });
    }
  };

  const ToProduct = ()=>{
    if(window.confirm("해당 상품으로 이동하시겠습니까?")===true){
      var DealType = '';
      if(props.DealType) DealType = 'sell';
      else DealType = 'buy';

      Navigate('/'+DealType+'/detail/'+props.ProductId);
    }
  }

  return (
    <tr className="ListRow">
      <td className="ProductIndex">{props.ProductId}</td>
      <td className="ProductWriter">{props.WriterId}</td>
      <td className="ProductCategory">{props.Category}</td>
      <td className="ProductTitleToProduct" onClick={ToProduct}>{props.Title}</td>
      <td className="ProductPrice">{Common.MoneyComma(props.Price)}</td>
      <td className="DeleteProduct">
        <button className="DeleteBtn" onClick={DeleteClick}>삭제</button>
      </td>
    </tr>
  );
};