import * as common from "../../../components/CommonFunc"
export default function PointContent(props) {
  return (
    <tr className="PointContent">
      <td colSpan={1}>
        {props.Date.split(" ")[0]}
        <br />
        {props.Date.split(" ")[1]}
      </td>
      <td
        colSpan={1}
        className={
          props.Type === "수입"
            ? "PinkBold"
            : props.Type === "충전"
            ? "BlackBold"
            : "GrayBold"
        }
      >
        {props.Type}
      </td>
      <td colSpan={2}>
        {props.WithNickname}
        <br />({props.WithId})
      </td>
      <td colSpan={3}>{props.Product}</td>
      <td colSpan={2} className={props.DealAmount > 0 ? "PinkBold" : "GrayBold"}>
        {props.DealAmount > 0 ? "+" : ""}
        {common.MoneyComma(props.DealAmount)}
      </td>
      {/* <td colSpan={2}>{common.MoneyComma(props.Point)}</td> */}
    </tr>
  );
}
