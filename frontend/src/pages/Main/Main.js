import React, { useState, useEffect } from "react";
// import { Link, Navigate, useNaviagte } from "react-router-dom";
import axios from 'axios';
import Header from "../../components/Header"
import ItemInfo from "./components/ItemInfo";
import CategoryInfo from "./components/CategoryInfo";
import '../../style/Main.css';

export default function MAIN(){
    // 카테고리 정보
    const [Category, SetCategory] = useState([{
        product_category: ''
    }]);

    // 물건 정보
    const [Product, SetProduct] = useState([{
        product_id: '',
        product_img: '',
        product_title: '',
        product_price: '',
        deal_type: ''
    }]);

    // 전체 구매해요 물건 불러오기
    useEffect(() => {
        axios.get('http://localhost:8080/all')
        .then((res) => {
            SetProduct(res.data);
        })

        axios.get('http://localhost:8080/bestcategory')
        .then((res) => {
            SetCategory(res.data);
        })
    }, []);

    let ProductList = [];
    if(Product.length === 0) {
        ProductList.push(<div key='0' id="NoProduct">상품이 존재하지 않습니다.</div>);
    } else {
        for(let i = 0; i < Product.length; i++) {
            ProductList.push(<ItemInfo key={i} deal_type={Product[i].deal_type} product_id={Product[i].product_id} image={Product[i].product_img} title={Product[i].product_title} price={Product[i].product_price+"원"}/>)
        }
    }

    let CategoryList = [];
    if(Category.length === 0) {
        CategoryList.push(<div key='0' id="NoProduct">오늘 올라온 상품이 없습니다.</div>);
    } else {
        for(let i = 0; i < Category.length; i++) {
            CategoryList.push(<CategoryInfo key={i} name={Category[i].product_category}></CategoryInfo>)
        }
    }

    return (
        <div className="Main">
            <div className='Head'>
                <Header/>
            </div>
            <div id="BannerDiv"><img id="BannerImage" src="images/banner.png" alt="banner"></img></div>

            <div className="CategoryBackground">
                <div className="Items">
                    <div>
                        <div className="Description1">Best Category</div>
                        <div className="Description2">오늘 많은 사람들이 관심있게 지켜본 카테고리입니다.</div>
                        <div className="Categories">{CategoryList}</div>
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