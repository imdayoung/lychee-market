export default function RegInput(props){
  const changeValue = (e) => {
    props.setValue(e.target.value);
  };

  return (
    <input
      className={props.distinct === "Short" ? "r_inputshort" : "r_input"}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={changeValue}
    />
  )
}