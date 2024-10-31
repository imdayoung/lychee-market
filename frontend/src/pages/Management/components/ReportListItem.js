import { useNavigate } from "react-router-dom";

export default function ReportListItem(props){
  let Navigate = useNavigate();
  const ToReport = ()=>{
    Navigate('/report/detail/'+props.reportid);
  }
  
  return (
    <tr className="ListRow">
      <td className="ReportId">{props.reportid}</td>
      <td className="ReportType">{props.type}</td>
      <td className="ReportTitleToDetail" onClick={ToReport}>{props.title}</td>
      <td className="ReporterId">{props.reporterid}</td>
      <td className="ReportDate">{props.date}</td>
      <td className="IsSolved"><div className={props.issolved}>{props.issolved==='Complete' ? '완료' : '미완료'}</div></td>
    </tr>
  );
};
