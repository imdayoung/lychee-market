import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Header from "../../components/Header";
import ManagerHeader from "../../components/Header3";
import NoticeListComponent from "./components/NoticeListComponent";
import Pagination from "../../components/Pagination";
import getCookie from "../../components/GetCookie";
import "../../style/Notice.css";

export default function Notice(){
  const Cookie = getCookie("is_login");
  var IsManager = false;
  const [SearchWord, SetSearchWord] = useState();
  
  if(Cookie === "true"){
    const managerid = localStorage.getItem("manager_id");
    if(managerid !== null)
      IsManager = true;
  }

  // 공지사항 정보
  const [Notice, SetNotice] = useState([
    {
      notice_id: "",
      manager_id: "",
      notice_date: "",
      notice_title: "",
    },
  ]);

  // 페이지네이션
  const limit = 10;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 전체 공지사항 정보 불러오기
  useEffect(() => {
    Axios.get("http://localhost:8080/notice").then((res) => {
      console.log(res.data);
      SetNotice(res.data);
    });
  }, []);

  let NoticeList = [];
  if (Notice.length === 0) {
    NoticeList.push(
      <tr key={0} className="n_list_row">
        <td colSpan="4">공지사항이 존재하지 않습니다.</td>
      </tr>
    );
  } else {
    for (let i = Notice.length - 1; i >= 0; i--) {
      NoticeList.push(
        <NoticeListComponent
          key={i}
          notice_id={Notice[i].notice_id}
          notice_title={Notice[i].notice_title}
          notice_date={Notice[i].notice_date.toString().split("T")[0]}
          manager_id={Notice[i].manager_id}
        />
      );
    }
  }

  return (
    <div className='main'>
      {IsManager ?
      <ManagerHeader keyword='공지사항'/> :
      <Header keyword='공지사항'/>}
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
          <tbody>{NoticeList.slice(offset, offset + limit)}</tbody>
        </table>
        <Pagination
          total={NoticeList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <div className="noticeBottom">
          <div className="searchNotice">
            <input
              type="text"
              onChange={(event) => SetSearchWord(event.target.value)}
            />
            <Link
              to={{ pathname: "/notice/search/" + SearchWord }}
              state={{ searchword: SearchWord }}
            >
              <button type="button">검색</button>
            </Link>
          </div>
          <div>
            <Link to="/notice/write">
              <button type="button" className="writeNotice" hidden={!IsManager}>
                공지 작성
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
