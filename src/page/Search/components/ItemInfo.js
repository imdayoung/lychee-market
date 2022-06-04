import '../../../style/Search.css';
import React, { useState, useEffect } from "react";
import { Link, useNaviagte, useLocation } from "react-router-dom";

export default function ItemInfo(props) {
    let Location = useLocation();

    useEffect(() => {
        console.log('location', Location);
    }, [Location]);
    const DealType = Location.pathname.split('/').slice(1)[0];
    console.log(DealType);
    

    return (
            <div className='ItemInfo'>
                <Link to={{pathname:'/'+DealType+'/detail/'+props.product_id}}>
                    <div id='ItemImage'><img id='ItemImage' src={props.image} alt='상품 이미지'></img></div>
                </Link>
                <div id='ItemTitle'>{props.title}</div>
                <div id='ItemPrice'>{props.price}</div>
            </div>
        
    )
}