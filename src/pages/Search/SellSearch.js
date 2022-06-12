import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from 'axios';
import Header from "../../components/Header2"
import ItemInfo from "./components/ItemInfo";
import getCookie from "../../components/GetCookie";

export default function SELLSEARCH(){
    const cookie = getCookie("is_login");
    var IsManager = false;
    var IsLogin = false;
    let userid = '';
    
    //로그인 정보
    if(cookie === "true"){
      userid = localStorage.getItem("user_id");
      if(userid !== null)
        IsLogin = true;
      else{
        const managerid = localStorage.getItem("manager_id");
        if(managerid !== null){
          IsManager = true;
          IsLogin = true;
        }
      }
    }

    let Location = useLocation();
    // location의 pathname으로부터 검색 단어 얻기
    const Target = Location.pathname.split('/').slice(-1)[0];
    const [Category, SetCategory] = useState("all");
    const [Order, SetOrder] = useState("price");
    const [MyLocation, SetMyLocation] = useState('');

    // 물건 정보
    const [Product, SetProduct] = useState([{
        seller_id: '',
        product_id: '',
        product_img: '',
        product_title: '',
        product_price: '',
        distance: 0
    }]);

    const CategoryHandler = (e) => {
        SetCategory(e.target.value);
        axios.get('http://localhost:8080/sell/search/'+Target+'/'+e.target.value)
        .then((res) => {
            SetProduct(res.data);
        });
    }

    const OrderHandler = (e) => {
        SetOrder(e.target.value);
        if(e.target.value === 'distance'){
            axios.get('http://localhost:8080/sell/search/distance/'+Target +'/'+Category+'/'+MyLocation)
            .then((res) => {
                console.log(res.data);
                SetProduct(res.data);
            })
        } else {
            axios.get('http://localhost:8080/sell/search/'+Target +'/'+Category)
            .then((res) => {
                SetProduct(res.data);
            })
        }
    }

    // 구매해요 물건 및 위치 불러오기
    useEffect(() => {
        // 물건 목록 불러오기
        axios.get('http://localhost:8080/sell/search/'+Target+'/'+Category)
        .then((res) => {
            SetProduct(res.data);
        });
        // 내 주소 불러오기
        axios.get('http://localhost:8080/getlocation/'+userid)
        .then((res) => {
            SetMyLocation(res.data[0].user_location);
        })
    }, [Target, Category, userid]);

    let ProductList = [];
    if(Product.length === 0) {
        ProductList.push(<div id="NoProduct">상품이 존재하지 않습니다.</div>);
    } else {
        for(let i = 0; i < Product.length; i++) {
            ProductList.push(<ItemInfo key={i} product_id={Product[i].product_id} image={'/'+Product[i].product_img} title={Product[i].product_title} price={Product[i].product_price+"원"}/>)
        }
    }

    return (
        <div>
            <div className='Head'>
                <Header/>
            </div>
            <div className="Main">
                <div className="Descript">
                <div id="CategoryDiv">카테고리 </div>
                    <div id="Symbol"> &gt;</div>
                    <div id="InlineBlock">
                        <select id="CategorySelect" onChange={CategoryHandler}>
                            <option key="all" value="all">전체</option>
                            <option key="여성의류" value="여성의류">여성의류</option>
                            <option key="남성의류" value="남성의류">남성의류</option>
                            <option key="신발" value="신발">신발</option>
                            <option key="가방" value="가방">가방</option>
                            <option key="시계,쥬얼리" value="시계,쥬얼리">시계/쥬얼리</option>
                            <option key="패션 액세서리" value="패션 액세서리">패션 액세서리</option>
                            <option key="디지털,가전" value="디지털,가전">디지털/가전</option>
                            <option key="스포츠,레저" value="스포츠,레저">스포츠/레저</option>
                            <option key="스타굿즈" value="스타굿즈">스타굿즈</option>
                            <option key="키덜트" value="키덜트">키덜트</option>
                            <option key="예술,희귀,수집품" value="예술,희귀,수집품">예술/희귀/수집품</option>
                            <option key="음반,악기" value="음반,악기">음반/악기</option>
                            <option key="도서,티켓,문구" value="도서,티켓,문구">도서/티켓/문구</option>
                            <option key="뷰티,미용" value="뷰티,미용">뷰티/미용</option>
                            <option key="가구인테리어" value="가구인테리어">가구/인테리어</option>
                            <option key="생활,가공식품" value="생활,가공식품">생활/가공식품</option>
                            <option key="유아동,출산" value="유아동,출산">유아동/출산</option>
                            <option key="반려동물용품" value="반려동물용품">반려동물용품</option>
                            <option key="기타" value="기타">기타</option>
                        </select>
                    </div>
                    <Link to={{pathname:'/product/upload'}}><button id="WriteButton" type="submit">중고거래 글쓰기</button></Link>
                </div>
                <div>
                    <div id="ResultInfo"><span id="TargetWorld">{decodeURI(Target)}</span>에 대한 검색결과입니다.</div>
                    <div>
                        <select id="SearchSelect" onChange={OrderHandler}>
                            <option key="price" value="price">가격순</option>
                            <option key="distance" value="distance">거리순</option>
                        </select> 
                    </div>
                    
                    {ProductList}
                </div>
            </div>
        </div>
    )
}