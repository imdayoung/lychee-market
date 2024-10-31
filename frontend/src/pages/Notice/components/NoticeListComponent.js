import { useNavigate } from "react-router-dom";

export default function NoticeListComponent(props){
  let Navigate = useNavigate();

  const ToNoticeRead = ()=>{
    Navigate("/notice/read/"+props.notice_id);
  };
  return (
    <tr className="n_list_row">
      <td className="noticeIndex">{props.notice_id}</td>
      <td className="noticeTitleToRead"  onClick={ToNoticeRead}>{props.notice_title}</td>
      <td className="noticeDate">{props.notice_date}</td>
      <td className="managerId">{props.manager_id}</td>
    </tr>
  )
}