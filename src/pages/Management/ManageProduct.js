import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Header from "../../components/Header";
import ProductListItem from "./components/ProductListItem";
import "../../style/Management.css"

export default function ManageProduct() {
  // 상품 정보
  const [Product, SetProduct] = useState([{
      product_id: '',
      writer_id: '',
      deal_type: '',
      product_category: '',
      product_title: '',
      product_price: '',
      report_id: '',
  }]);

  // 검색 단어
  const [SearchWord, SetSearchWord] = useState('');

  useEffect(()=>{
    Axios.get('http://localhost:8080/manager/product')
    .then((res)=>{
      console.log(res.data);
      SetProduct(res.data);
    });
  },[]);

  let ReportedList = [];
  let ProductList = [];
  if(Product.length === 0){
    ProductList.push(<tr key={0} className="ListRow"><td colSpan={6}>게시글이 존재하지 않습니다.</td></tr>);
  }
  for(let i=Product.length-1; i>=0; i--){
    if(Product[i].report_id !== null){
      ReportedList.push(
        <ProductListItem key={i} ProductId={Product[i].product_id} WriterId={Product[i].writer_id} DealType={Product[i].deal_type}
        Category={Product[i].product_category} Title={Product[i].product_title} Price={Product[i].product_price}/>
      );
    }
    ProductList.push(
      <ProductListItem key={i} ProductId={Product[i].product_id} WriterId={Product[i].writer_id} DealType={Product[i].deal_type}
      Category={Product[i].product_category} Title={Product[i].product_title} Price={Product[i].product_price}/>
    );
  }

  return (
    <div>
      <Header keyword="게시글 관리"/>
      <div className="ManageMain">
        <table className="ReportedProduct" hidden={ReportedList.length === 0}>
          <caption>신고 접수된 게시글</caption>
          <thead className="ProductHead">
            <tr className="ListRow">
              <td className="ProductIndex">글 번호</td>
              <td className="ProductWriter">글 작성자</td>
              <td className="ProductCategory">카테고리</td>
              <td className="ProductTitle">제목</td>
              <td className="ProductPrice">가격</td>
              <td className="DeleteProduct">글 삭제</td>
            </tr>
          </thead>
          <tbody>
              {ReportedList}
          </tbody>
        </table>
        <table className="ProductList">
            <caption>전체 게시글</caption>
            <thead className="ProductHead">
              <tr className="ListRow">
                <td className="ProductIndex">글 번호</td>
                <td className="ProductWriter">글 작성자</td>
                <td className="ProductCategory">카테고리</td>
                <td className="ProductTitle">제목</td>
                <td className="ProductPrice">가격</td>
                <td className="DeleteProduct">글 삭제</td>
              </tr>
            </thead>
            <tbody>
                {ProductList}
            </tbody>
        </table>
        <div className="ManageBottom">
          <div className="ManageSearch">
            <input type="text" onChange={e=>SetSearchWord(e.target.value)}></input>
            <Link to={{pathname: '/manager/product/'+SearchWord}} state={{searchword: SearchWord}}>
              <button type="button">검색</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}