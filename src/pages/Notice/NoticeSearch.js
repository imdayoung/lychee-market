import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import Header from "../../components/Header"
import NoticeListComponent from "./components/NoticeListComponent";

export default function NoticeSearch(props){
    // 관리자인지 확인 필요
    const IsManager = true;

    // 검색 단어
    const [Word, SetWord] = useState('');
    const [SearchWord, SetSearchWord] = useState(props.searchword);

    // 공지사항 정보
    const [Notice, SetNotice] = useState([{ 
        notice_id: '',
        manager_id: '',
        notice_date: '',
        notice_title: '',
    }]);   

    // 검색한 공지사항 정보 불러오기
    useEffect(()=>{
        Axios.get('http://localhost:8080/notice/search/'+SearchWord)
        .then((res)=>{
            console.log(res.data);
            SetNotice(res.data);
        });
    },[SearchWord]);

    let NoticeList = [];
    if(Notice.length === 0){
        NoticeList.push(<tr className="n_list_row"><td colSpan='4'>검색된 결과가 없습니다.</td></tr>)
    }
    else{
        for(let i=Notice.length-1; i>=0; i--){    
            NoticeList.push(
                <NoticeListComponent key={i} notice_id={ Notice[i].notice_id} notice_title={Notice[i].notice_title}
                notice_date={moment(Notice[i].notice_date).format('YYYY-MM-DD')} manager_id={Notice[i].manager_id}/>
            );
        }
    }    

    return (
        <div>
            <Header detail='공지사항'/>
            <main className="noticeMain">
                <table className="noticeList">
                    <thead className="noticeHead">
                        <tr>
                            <td className="noticeIndex">공지번호</td>
                            <td className="noticeTitle">제목</td>
                            <td className="noticeDate">작성날짜</td>
                            <td className="managerId">작성자</td>
                        </tr>
                    </thead>
                    <tbody>
                        {NoticeList}
                    </tbody>
                </table>
                <div className="noticeBottom">
                    <div className="searchNotice">
                        <input type='text' onChange={(event) => SetWord(event.target.value)}/>
                        <Link to={{pathname: '/notice/search/'+Word}}>
                            <button type='button' onClick={()=>{SetSearchWord(Word)}}>검색</button>                
                        </Link>
                    </div>
                    <div className="writeNotice">
                        <Link to='/notice/write'>
                            <button type='button' hidden={IsManager?false:true}>공지 작성</button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}