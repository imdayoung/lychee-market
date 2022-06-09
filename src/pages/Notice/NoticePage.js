import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import Header from "../../components/Header"
import NoticeListComponent from "./components/NoticeListComponent";

export default function Notice(){
    // 관리자인지 확인 필요
    const IsManager = true;

    // 검색 단어
    const [SearchWord, SetSearchWord] = useState('');

    // 공지사항 정보
    const [Notice, SetNotice] = useState([{ 
        notice_id: '',
        manager_id: '',
        notice_date: '',
        notice_title: '',
    }]);

    // 전체 공지사항 정보 불러오기
    useEffect(()=>{
        Axios.get('http://localhost:8080/notice')
        .then((res)=>{
            console.log(res.data);
            SetNotice(res.data);
        });
    },[]);

    let NoticeList = [];
    if(Notice.length === 0){
        NoticeList.push(<tr key={0} className="n_list_row"><td colSpan='4'>공지사항이 존재하지 않습니다.</td></tr>)
    }
    else{
        for(let i=Notice.length-1; i>=0; i--){
            NoticeList.push(
                <NoticeListComponent key={i} notice_id={Notice[i].notice_id} notice_title={Notice[i].notice_title}
                notice_date={Notice[i].notice_date.toString().split('T')[0]} manager_id={Notice[i].manager_id}/>
            );
        }
    }

    return (
        <div className='main'>
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
                        <input type='text' onChange={(event) => SetSearchWord(event.target.value)}/>
                        <Link to={{pathname: '/notice/search/'}} searchword={SearchWord}>
                            <button type='button'>검색</button>                       
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