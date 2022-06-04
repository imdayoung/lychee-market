import React, { useState, useEffect } from "react";
// import { Link, Navigate, useNaviagte } from "react-router-dom";
import axios from 'axios';
import Header from "../../components/Header"
import ItemInfo from "./components/ItemInfo";
import '../../style/Main.css';

export default function MAIN(){
    // 물건 정보
    const [Product, SetProduct] = useState([{
        product_id: '',
        product_img: '',
        product_title: '',
        product_price: ''
    }]);

    // 전체 구매해요 물건 불러오기
    useEffect(() => {
        axios.get('http://localhost:8080/all')
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
            <div id="BannerDiv"><img id="BannerImage" src="images/banner.png"></img></div>

            <div className="CategoryBackground">
                <div className="Items">
                    <div>
                        <div className="Description1">Best Category</div>
                        <div className="Description2">오늘 많은 사람들이 관심있게 지켜본 카테고리입니다.</div>
                    </div>
                </div>
            </div>

            <div className="ItemsBackground">
                <div className="Items">
                    <div>
                        <div className="Description1">Just Uploaded</div>
                        <div className="Description2">최근 업데이트된 상품입니다.</div>
                        {ProductList}
                    </div>
                </div>
            </div>
            
        </div>
    )
}