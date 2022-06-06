import '../../../style/Search.css';
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ItemInfo(props) {
    var DealType;
    if(props.deal_type === 0)   DealType = 'buy';
    else                        DealType = 'sell';

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