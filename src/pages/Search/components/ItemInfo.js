import '../../../style/Search.css';
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Common from "../../../components/CommonFunc"

export default function ItemInfo(props) {
    let Location = useLocation();
    const DealType = Location.pathname.split('/').slice(1)[0];

    return (
            <div className='ItemInfo'>
                <Link to={{pathname:'/'+DealType+'/detail/'+props.product_id}}>
                    <div id='ItemImage'><img id='ItemImage' src={props.image} alt='상품 이미지'></img></div>
                </Link>
                <div id='ItemTitle'>{props.title}</div>
                <div id='ItemPrice'>{Common.MoneyComma(props.price)}</div>
            </div>
        
    )
}