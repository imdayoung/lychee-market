import React, { useState, useEffect } from "react";
// import { Link, Navigate, useNaviagte } from "react-router-dom";
import axios from 'axios';
import Header from "../../components/Header2"
import ItemInfo from "./components/ItemInfo";

export default function BUY(){
    // 물건 정보
    const [Product, SetProduct] = useState([{
        product_id: '',
        product_img: '',
        product_title: '',
        product_price: ''
    }]);

    // 전체 구매해요 물건 불러오기
    useEffect(() => {
        axios.get('http://localhost:8080/buy')
        .then((res) => {
            SetProduct(res.data);
            console.log(res.data);
            // return res;
        })
    }, []);

    let ProductList = [];
    if(Product.length === 0) {
        ProductList.push(<div id="NoProduct">상품이 존재하지 않습니다.</div>);
    } else {
        for(let i = 0; i < Product.length; i++) {
            ProductList.push(<ItemInfo product_id={Product[i].product_id} image={Product[i].product_img} title={Product[i].product_title} price={Product[i].product_price+"원"}/>)
        }
    }

    return (
        <div>
            <div className='Head'>
                <Header/>
            </div>
            <div className="Main">
                <div className="Descript"><button id="WriteButton" type="submit">구매글쓰기</button></div>
                <div>
                     {ProductList}
                </div>
            </div>
        </div>
    )
}