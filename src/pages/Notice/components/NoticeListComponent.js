import { Link } from "react-router-dom";

export default function NoticeListComponent(props){
    return (
        <tr className="n_list_row">
            <td className="noticeIndex">{props.notice_id}</td>
            <Link to={{pathname: '/notice/read/'+props.notice_id}}><td className="noticeTitle">{props.notice_title}</td></Link>
            <td className="noticeDate">{props.notice_date}</td>
            <td className="managerId">{props.manager_id}</td>
        </tr>
    )
}