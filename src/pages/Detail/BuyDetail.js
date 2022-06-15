import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import Header from "../../components/Header2"
import ManagerHeader from "../../components/Header3";
import '../../style/Detail.css';
import * as Common from "../../components/CommonFunc"
import getCookie from "../../components/GetCookie";
import DetailModal from "./components/DetailModal";
import MsgStartModal from "./components/MsgStartModal";
import InfoModal from "./components/InfoModal";
import EvaluateModal from "../Evaluate/EvaluateModal";

export default function BUYDETAIL(){
    const cookie = getCookie("is_login");
    var IsLogin = false;
    var IsManager = false;
    let userid = '';
    
    //로그인 정보
    if(cookie === "true"){
      userid = localStorage.getItem("user_id");
      const managerid = localStorage.getItem("manager_id");
      if(userid !== null)
        IsLogin = true;
      if(managerid !== null)
        IsManager = true;
    }

    const navigate = useNavigate();
    let Location = useLocation();

    // 물건 정보
    const [BuyerId, SetBuyerId] = useState('');
    const [ProductTitle, SetProductTitle] = useState('');
    const [ProductCategory, SetProductCategory] = useState('');
    const [ProductPrice, SetProductPrice] = useState(0);
    const [ProductLike, SetProductLike] = useState(0);
    const [ProductDate, SetProductDate] = useState('');
    const [ProductImg, SetProductImg] = useState('');
    const [ProductDetail, SetProductDetail] = useState('');
    const [DealMethod, SetDealMethod] = useState('');
    const [DealFlag, SetDealFlag] = useState(0);
    const [BuyerNick, SetBuyerNick] = useState('');

    const [ReportInfo, SetReportInfo] = useState(null);
    const [ProductInfo, SetProductInfo] = useState(null);

    // 거래 상대
    const [DealWith, SetDealWith] = useState();

    // production_id 얻기
    const ProdId = Location.pathname.split('/').slice(-1)[0];

    // 모달창 열기
    const [IsDealModalOpen, SetIsDealModalOpen] = useState(false);
    const [IsMsgModalOpen, SetIsMsgModalOpen] = useState(false);
    const [IsInfoModalOpen, SetIsInfoModalOpen] = useState(false);
    const [IsEvalModalOpen, SetIsEvalModalOpen] = useState(false);

    // 물건 세부정보 불러오기
    useEffect(() => {
        axios.get('http://localhost:8080/buy/detail/'+ProdId)
        .then((res) => {
            SetBuyerId(res.data[0].buyer_id);
            SetProductTitle(res.data[0].product_title);
            SetProductCategory(res.data[0].product_category);
            SetProductPrice(res.data[0].product_price);
            SetProductLike(res.data[0].product_like);
            SetProductDate(res.data[0].product_date);
            SetProductImg(res.data[0].product_img);
            SetProductDetail(res.data[0].product_detail);
            SetDealMethod(res.data[0].deal_method);
            if(res.data[0].deal_flag === 0)  SetDealFlag('거래중');
            else                            SetDealFlag('거래완료');
            SetBuyerNick(res.data[0].buyer_nickname);
            SetReportInfo({
                reportedid: res.data[0].buyer_id,
                cid: null,
                pid: ProdId,
                type: "게시글 신고"
            });
            SetProductInfo({
                dealtype: '0',
                title: res.data[0].product_title,
                category: res.data[0].product_category,
                price: parseInt(res.data[0].product_price),
                detail: res.data[0].product_detail,
                dealmethod: res.data[0].deal_method,
                productid: ProdId,
            });
        });
    }, [ProdId]);

    function ILikeIt() {
        axios.post('http://localhost:8080/ilikeit', { UserId: userid, ProdId: parseInt(ProdId) })
        .then((res) => {
            console.log("ilikeit 등록: ", res);
            if(res.data === false) {
                alert("즐겨찾기 등록에 실패했습니다.");
            } else if(res.data === "이미") {
                alert("이미 즐겨찾는 상품입니다.");
            } else {
                alert("즐겨찾기 등록에 성공했습니다.");
                window.location.reload();
            }
        });
    }

    function DeleteProduct() {
        if(window.confirm("게시글을 삭제할까요?")) {
            axios.post('http://localhost:8080/deleteproduct', { ProdId: parseInt(ProdId) })
            .then((res) => {
                alert("게시글이 삭제되었습니다.");
                navigate(-1);
            })
        }
    }

    const ReportNavigate = () => {
        navigate('/report/write', {state:{info: ReportInfo}});
    }

    const UpdateNavigate = () => {
        navigate('/product/update', {state:{info: ProductInfo}});
    }

    const DealModalClose = () => {
        SetIsDealModalOpen(!IsDealModalOpen);
    };

    const MsgModalClose = () => {
        SetIsMsgModalOpen(!IsMsgModalOpen);
    }

    const InfoModalClose = () => {
        SetIsInfoModalOpen(!IsInfoModalOpen);
    }

    const EvalModalClose = () => {
      SetIsEvalModalOpen(!IsEvalModalOpen);
  }

    return (
        <div>
            {IsDealModalOpen && (
                <DetailModal ModalClose={DealModalClose} EvalModalClose={EvalModalClose} Id={userid} ProductId={ProdId} DealType={0} SetDealWith={SetDealWith} DealWith={DealWith}/>
            )}
            {IsMsgModalOpen && (
                <MsgStartModal ModalClose={MsgModalClose} Id={userid} DealName={BuyerNick} DealId={BuyerId} ProductId={ProdId} DealType={1}/>
            )}
            {IsInfoModalOpen && (
                <InfoModal ModalClose={InfoModalClose} UserNickname={BuyerNick}/>
            )}
            {IsEvalModalOpen && (
                <EvaluateModal ModalClose={EvalModalClose} Id={userid} YourId={DealWith} MsgBox={null}></EvaluateModal>
            )}
            <div className='Head'>
            {IsManager ?
              <ManagerHeader keyword="구매"/> :
              <Header/>}
            </div>
            <div className="DetailMain">
                <div>
                    <div id="Category">카테고리&nbsp; &gt; &nbsp;{ProductCategory}</div>
                    <div id="ImageDiv">
                        <img id='DetailItemImage' src={ProductImg == null ? '/images/products/prod00.png' : ProductImg} alt='상품 이미지'></img>
                    </div>
                    <div id="DetailDescription">
                        <div id="DetailItemTitle">{ProductTitle}</div>
                        <div>
                            <div id="DetailItemPrice">{Common.MoneyComma(ProductPrice)} 원</div>
                            <div id={DealFlag==="거래완료"?"DealFlagDone":"DealFlag"}>{DealFlag}</div>
                        </div>
                        <div>
                            <div id="DealTypeDiv">거래방식</div>
                            <div id="DealType">{DealMethod}</div>
                        </div>
                        <div id="MoreInfo">
                            <div id="LikeDate">💕{ProductLike} | ⏰{moment(ProductDate).format("YY.MM.DD HH:mm")}</div>
                            {(userid !== BuyerId) && (IsLogin !== false) ? <div id="ReportButton" onClick={ReportNavigate}>📢신고하기</div> : <></>}
                        </div>
                        <div hidden={(userid === BuyerId) || (IsLogin === false) ? true : false}>
                            <button id="LikeButton" onClick={() => {ILikeIt();}}>찜하기</button>
                            <button id="MessageButton" onClick={MsgModalClose}>쪽지하기</button>
                        </div>
                        <div hidden={userid !== BuyerId}>
                            <button id="DeleteButton" onClick={DeleteProduct}>삭제</button>
                            <button id="EditButton" onClick={UpdateNavigate}>수정</button>
                            {DealFlag === "거래완료" ? <></> : <button id="CompleteButton" onClick={DealModalClose}>거래완료</button>}
                        </div>
                        <div hidden={!IsManager}>
                            <button id="LikeButton" onClick={DeleteProduct}>삭제</button>
                            <button id="MessageButton" onClick={() => navigate(-1)}>목록</button>
                        </div>
                    </div>
                </div>
                
                <div id="Infos">
                    <div id="InfoTitle">게시자 정보</div>
                    <div id="Info" onClick={InfoModalClose}>{BuyerNick}</div><br></br>
                    <div id="InfoTitle">상품 설명</div>
                    <pre id="Info2">{ProductDetail}</pre>
                </div>
            </div>
        </div>
    )
}