import '../../../style/Search.css';
import React, { useEffect } from "react";


export default function CateogryInfo(props) {
    var imgsrc;
    switch(props.name) {
        case('여성의류'):
            imgsrc = '/images/category/category01.png';
            break;
        case('남성의류'):
            imgsrc = '/images/category/category02.png';
            break;
        case('신발'):
            imgsrc = '/images/category/category03.png';
            break;
        case('가방'):
            imgsrc = '/images/category/category04.png';
            break;
        case('시계/쥬얼리'):
            imgsrc = '/images/category/category05.png';
            break;
        case('패션 액세서리'):
            imgsrc = '/images/category/category06.png';
            break;
        case('디지털/가전'):
            imgsrc = '/images/category/category07.png';
            break;
        case('스포츠/레저'):
            imgsrc = '/images/category/category08.png';
            break;
        case('스타굿즈'):
            imgsrc = '/images/category/category09.png';
            break;
        case('키덜트'):
            imgsrc = '/images/category/category10.png';
            break;
        case('예술/희귀/수집품'):
            imgsrc = '/images/category/category11.png';
            break;
        case('음반/악기'):
            imgsrc = '/images/category/category12.png';
            break;
        case('도서/티켓/문구'):
            imgsrc = '/images/category/category13.png';
            break;
        case('뷰티/미용'):
            imgsrc = '/images/category/category14.png';
            break;
        case('가구/인테리어'):
            imgsrc = '/images/category/category15.png';
            break;
        case('생활/가공식품'):
            imgsrc = '/images/category/category16.png';
            break;
        case('유아동/출산'):
            imgsrc = '/images/category/category17.png';
            break;
        case('반려동물용품'):
            imgsrc = '/images/category/category18.png';
            break;
        case('기타'):
            imgsrc = '/images/category/category19.png';
            break;
    }

    return (
            <div className='CategoryInfo'>
                <div id='CategoryImage'><img id='CategoryImage' src={imgsrc} alt='카테고리 사진'></img></div>
                <div id='CategoryName'>{props.name}</div>
            </div>
    )
}