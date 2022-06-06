import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Header from "../../components/Header2"
import ItemInfo from "./components/ItemInfo";

export default function SELLSEARCH(){
    let Location = useLocation();

    // 물건 정보
    const [Product, SetProduct] = useState([{
        product_id: '',
        product_img: '',
        product_title: '',
        product_price: ''
    }]);

    // location의 pathname으로부터 검색 단어 얻기
    const Target = Location.pathname.split('/').slice(-1)[0];

    // 구매해요 물건 불러오기
    useEffect(() => {
        axios.get('http://localhost:8080/sell/search/'+Target)
        .then((res) => {
            SetProduct(res.data);
            // return res;
        })
    }, [Target]);

    let ProductList = [];
    if(Product.length === 0) {
        ProductList.push(<div key='0' id="NoProduct">상품이 존재하지 않습니다.</div>);
    } else {
        for(let i = 0; i < Product.length; i++) {
            ProductList.push(<ItemInfo key={i} product_id={Product[i].product_id} image={Product[i].product_img} title={Product[i].product_title} price={Product[i].product_price+"원"}/>)
        }
    }

    return (
        <div>
            <div className='Head'>
                <Header/>
            </div>
            <div className="Main">
                <div className="Descript"><button id="WriteButton" type="submit">판매글쓰기</button></div>
                <div>
                    <div id="ResultInfo"><span id="TargetWorld">{decodeURI(Target)}</span>에 대한 검색결과입니다.</div>
                     {ProductList}
                </div>
            </div>
        </div>
    )
}