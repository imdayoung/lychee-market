import { useNavigate } from "react-router-dom";

export default function ReportListComponent(props){
  let Navigate = useNavigate();

  const ToReportDetail = ()=>{
    Navigate("/report/detail/"+props.report_id);
  };

  return (
    <tr className="ReportListRow">
      <td className="ReportIndex">{props.report_id}</td>
      <td className="ReportType">{props.report_type}</td>
      <td className="ReportTitleToDetail" onClick={ToReportDetail}>{props.report_title}</td>
      <td className="ReportDate">{props.report_date}</td>
      <td className="EsSolved">{props.is_solved}</td>
    </tr>
  );
}