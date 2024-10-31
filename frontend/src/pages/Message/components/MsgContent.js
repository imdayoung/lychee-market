export default function MsgContent(props) {
  return (
    <div className="MsgContent">
      <div className="RowBetween">
        <span
          id={
            props.Name === "나"
              ? "MsgMyName"
              : props.Name === "안내"
              ? "MsgIntroName"
              : "MsgName"
          }
        >
          {props.Name}
        </span>
        <span id="MsgDate">{props.Date}</span>
      </div>
      <div className="Space"></div>
      <div id="MsgDetail">{props.Content}</div>
    </div>
  );
}
