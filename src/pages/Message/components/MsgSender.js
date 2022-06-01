export default function MsgSender(props) {
  return (
    <div className="MsgSender">
      <div className="RowBetween">
        <span id="MsgName">{props.Name}</span>
        <span id="MsgDate">{props.Date}</span>
      </div>
      <div className="Space"></div>
      <div id="MsgContent">{props.Content}</div>
    </div>
  );
}