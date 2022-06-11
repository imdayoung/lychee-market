import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Header from "../../components/Header2"
import ItemInfo from "./components/ItemInfo";

export default function BUYSEARCH(){
    const Id = 'dlekdud0102';
    var MyLat = '';
    var MyLng = '';
    let Location = useLocation();
    // location의 pathname으로부터 검색 단어 얻기
    const Target = Location.pathname.split('/').slice(-1)[0];

    const [Category, SetCategory] = useState("all");
    const [Order, SetOrder] = useState("price");
    let DistanceList = [];

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
        if(e.target.value === 'all') {
            axios.get('http://localhost:8080/buy/search/'+Target)
            .then((res) => {
                SetProduct(res.data);
            })
        } else {
            axios.get('http://localhost:8080/buy/search/'+Target+'/'+e.target.value)
            .then((res) => {
                SetProduct(res.data);
            });
        }
    }

    const OrderHandler = (e) => {
        SetOrder(e.target.value);
        if(e.target.value === 'distance'){
            axios.get('http://localhost:8080/buy/search/distance/'+Target +'/'+Category)
            .then((res) => {
                SetProduct(res.data);
            })
        } else {
            axios.get('http://localhost:8080/buy/search/'+Target +'/'+Category)
            .then((res) => {
                SetProduct(res.data);
            })
        }
    }

    // 구매해요 물건 및 위치 불러오기
    useEffect(() => {
        // 물건 목록 불러오기
        axios.get('http://localhost:8080/buy/search/'+Target)
        .then((res) => {
            SetProduct(res.data);
        });
    }, [Target]);

    // 내 위치 주소 받아오기
    useEffect(() => {
        axios.get('http://localhost:8080/getlocation/'+Id)
        .then((res) => {
            axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+res.data[0].user_location+'&key=AIzaSyBJHfzckYIvqPrJT1rO_GY3xL6BVfQmTGs')
            .then((response) => {
                MyLat = parseFloat(JSON.stringify(response.data.results[0].geometry.location.lat));
                MyLng = parseFloat(JSON.stringify(response.data.results[0].geometry.location.lng));
                console.log("MyLat: "+MyLat);   console.log("MyLng: "+MyLng);
            });
        });
    }, []);

    var SellerId;
    var UpdateProdId;
    var Dist;
    // 물건 작성자 위치 주소 받아오기 및 거리계산

    console.log("Product Length: "+Product.length);
    for(var i = 0; i < Product.length; i++){
        SellerId = Product[i].seller_id;
        UpdateProdId = Product[i].product_id;
        console.log("Seller Id: "+Product[i].seller_id);    console.log("Product Id: "+Product[i].product_id);
        axios.get('http://localhost:8080/getlocation/'+SellerId)
        .then((res) => {
            var WriterLocation = res.data[0].user_location;
            console.log("구글API에 넣을 판매자 주소:"+WriterLocation);
            axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+WriterLocation+'&key=AIzaSyBJHfzckYIvqPrJT1rO_GY3xL6BVfQmTGs')
            .then((response) => {
                console.log("WriterLocation: "+WriterLocation);
                var WriterLat = parseFloat(JSON.stringify(response.data.results[0].geometry.location.lat));
                var WriterLng = parseFloat(JSON.stringify(response.data.results[0].geometry.location.lng));
                console.log("WriterLat: "+WriterLat+", WriterLng: "+WriterLng);
                Dist = (MyLat-WriterLat)^2+(MyLng-WriterLng)^2;
                console.log("Update Distance: "+Dist);
                console.log("Update Product Id: "+UpdateProdId);
                console.log("Why????: "+i);
                axios.post('http://localhost:8080/distanceupdate', {product_id: UpdateProdId, distance: Dist})
                .then((res) => {
                    console.log("주소 업데이트 했냐?");
                })
            })
        })
    }

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
                            <option key="시계쥬얼리" value="시계쥬얼리">시계/쥬얼리</option>
                            <option key="패션 액세서리" value="패션 액세서리">패션 액세서리</option>
                            <option key="디지털가전" value="디지털가전">디지털/가전</option>
                            <option key="스포츠레저" value="스포츠레저">스포츠/레저</option>
                            <option key="스타굿즈" value="스타굿즈">스타굿즈</option>
                            <option key="키덜트" value="키덜트">키덜트</option>
                            <option key="예술희귀수집품" value="예술희귀수집품">예술/희귀/수집품</option>
                            <option key="음반악기" value="음반악기">음반/악기</option>
                            <option key="도서티켓문구" value="도서티켓문구">도서/티켓/문구</option>
                            <option key="뷰티미용" value="뷰티미용">뷰티/미용</option>
                            <option key="가구인테리어" value="가구인테리어">가구/인테리어</option>
                            <option key="생활가공식품" value="생활가공식품">생활/가공식품</option>
                            <option key="유아동출산" value="유아동출산">유아동/출산</option>
                            <option key="반려동물용품" value="반려동물용품">반려동물용품</option>
                            <option key="기타" value="기타">기타</option>
                        </select>
                    </div>
                    <button id="WriteButton" type="submit">구매글쓰기</button></div>
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