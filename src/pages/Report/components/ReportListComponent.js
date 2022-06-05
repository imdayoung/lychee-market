import { Link } from "react-router-dom";

export default function ReportListComponent(props){
  return (
    <tr className="r_list_row">
      <td className="reportIndex">{props.report_id}</td>
      <td className="reportType">{props.report_type}</td>
      {/* <td className="reportTitle"><Link to={{pathname:'/notice/read/'+props.notice_id}}>{props.report_title}</Link></td> */}
      <td className="reportTitle">{props.report_title}</td>
      <td className="reportDate">{props.report_date}</td>
      <td className="isSolved">{props.is_solved}</td>
    </tr>
  );
}