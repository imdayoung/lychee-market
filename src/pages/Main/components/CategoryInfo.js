import '../../../style/Search.css';
import React, { useEffect } from "react";
export default function CateogryInfo(props) {
    return (
            <div className='CategoryInfo'>
                <div id='CategoryImage'><img id='CategoryImage' alt='카테고리 사진'></img></div>
                <div id='CategoryName'>{props.category}</div>
            </div>
    )
}