import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Axios from "axios";
import Header from "../../components/Header";
import ProductListItem from "./components/ProductListItem";
import Pagination from "../../components/Pagination";
import "../../style/Management.css"

export default function SearchProduct() {
  let location = useLocation();

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

  // 페이지네이션
  const limit = 10;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 검색 단어
  const [Word, SetWord] = useState('');
  const [SearchWord, SetSearchWord] = useState('');
  useEffect(()=>{
    const TempWord = location.state.searchword;
    SetSearchWord(TempWord);
  },[location]);

  useEffect(()=>{
    Axios.get('http://localhost:8080/manager/product/'+SearchWord)
    .then((res)=>{
      console.log(res.data);
      SetProduct(res.data);
    });
  },[SearchWord]);

  let ReportedList = [];
  let ProductList = [];
  if(Product.length === 0){
    ProductList.push(<tr key={0} className="ListRow"><td colSpan={6}>"{SearchWord}"에 대한 검색결과가 없습니다.</td></tr>);
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
        <div className="SearchResult"><span>{SearchWord}</span>에 대한 검색결과입니다.</div>
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
                {ProductList.slice(offset, offset + limit)}
            </tbody>
        </table>
        <Pagination
          total={ProductList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <div className="ManageBottom">
        <div className="ManageSearch">
            <input type="text" onChange={(e)=>SetWord(e.target.value)}></input>
            <Link to={{pathname: '/manager/product/'+Word}} state={{searchword: Word}}>
              <button type="button" onClick={()=>{SetSearchWord(Word)}}>검색</button>
            </Link>
          </div>
          <div>
            <Link to="/manager/product">
              <button className="AllList" type="button">전체 목록</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}