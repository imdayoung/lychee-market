import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import Header from "../../components/Header"

export default function NoticeWrite(){
    let Navigate = useNavigate();

    // manager_id 받아와야함
    var ManagerId = "admin1"
    // const [ManagerId, SetManagerId] = useState('admin1');

    // 공지사항 작성 날짜 받아오기
    var Now = moment();
    var NoticeDate = Now.format('YYYY-MM-DD');
    
    // 공지사항 제목, 내용, 이미지
    const [NoticeTitle, SetNoticeTitle] = useState('');
    const [NoticeContent, SetNoticeContent] = useState('');
    const [NoticeImg, SetNoticeImg] = useState('');

    // 공지사항 작성
    const SubmitClick = ()=>{
        Axios.post("http://localhost:8080/notice/write", {
            manager_id: ManagerId,
            notice_date: NoticeDate,
            notice_title: NoticeTitle,
            notice_content: NoticeContent,
            notice_img: NoticeImg,
        }).then((res)=>{
            console.log(res);
            if(res.data === true)
                Navigate(-1);
            else{
                alert("공지사항 업로드 실패");
                Navigate(-1);
            }
        });
    };

    // 목록으로 돌아가기
    const ListClick = ()=>{
        Navigate(-1);
    }

    return (
        <div>
            <Header detail='공지사항'/>
            <main className="noticeMain">
                <table className="noticeWrite">
                    <tr className="n_row">
                        <th className="n_th">제목</th>
                        <td><input className="n_td" type='text' onChange={(event) => SetNoticeTitle(event.target.value)}/></td>
                    </tr>
                    <tr className="n_row">
                        <th className="n_th">작성 날짜</th>
                        <td><input className="n_td" type='text' value={NoticeDate} readOnly/></td>
                    </tr>
                    <tr className="n_row">
                        <th className="n_th">작성자</th>
                        <td><input className="n_td" type='text' value={ManagerId} readOnly/></td>
                    </tr>
                    <tr className="n_row">
                        <th className="n_th">내용</th>
                        <td>
                            <textarea className="n_td_content" onChange={(event) => SetNoticeContent(event.target.value)}>
                            </textarea>
                        </td>
                    </tr>
                    <tr className="n_row">
                        <th className="n_th">이미지</th>
                        <td><input className="n_td_image" type="file" name="image" onChange={(event) => SetNoticeImg(event.target.value)}/></td>
                    </tr>
                </table>
                <div className="buttons">
                    <button className="list" type="button" onClick={ListClick}>목록</button>
                    <button className="submit" type="button" onClick={SubmitClick}>작성하기</button>
                </div>
            </main>
        </div>
    )
}