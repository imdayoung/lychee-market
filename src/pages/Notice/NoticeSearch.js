import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import Header from "../../components/Header";
import ManagerHeader from "../../components/Header3";
import NoticeListComponent from "./components/NoticeListComponent";
import Pagination from "../../components/Pagination";
import getCookie from "../../components/GetCookie";
import "../../style/Notice.css";

export default function NoticeSearch(){
	let location = useLocation();

	const Cookie = getCookie("is_login");
	var IsManager = false;
	
	if(Cookie === "true"){
		const managerid = localStorage.getItem("manager_id");
		if(managerid !== null)
			IsManager = true;
	}

	// 검색 단어
	const [Word, SetWord] = useState();
	const [SearchWord, SetSearchWord] = useState();

	useEffect(()=>{
		const TempWord = location.state.searchword;
		SetSearchWord(TempWord);
	},[location]);

	// 공지사항 정보
	const [Notice, SetNotice] = useState([{ 
		notice_id: '',
		manager_id: '',
		notice_date: '',
		notice_title: '',
	}]);

	// 페이지네이션
	const limit = 10;
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;

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
		NoticeList.push(<tr key={0} className="n_list_row"><td colSpan='4'>"{SearchWord}"에 대한 검색결과가 없습니다.</td></tr>)
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
			{IsManager ?
      <ManagerHeader keyword='공지사항'/> :
      <Header keyword='공지사항'/>}
			<div className="noticeMain">
				<div className="SearchResult"><span>{SearchWord}</span>에 대한 검색결과입니다.</div>
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
						{NoticeList.slice(offset, offset + limit)}
					</tbody>
				</table>
				<Pagination
					total={NoticeList.length}
					limit={limit}
					page={page}
					setPage={setPage}
				/>
				<div className="noticeBottom">
					<div className="searchNotice">
						<input type='text' onChange={(event) => SetWord(event.target.value)}/>
						<Link to={{pathname: '/notice/search/'+Word}} state={{searchword: Word}}>
							<button type='button' onClick={()=>{SetSearchWord(Word)}}>검색</button>                
						</Link>
					</div>
					<div>
						<Link to='/notice'>
							<button className="allNotice" type="button">전체 목록</button>
						</Link>
						<Link to='/notice/write'>
							<button className="writeNotice" type='button' hidden={!IsManager}>공지 작성</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
