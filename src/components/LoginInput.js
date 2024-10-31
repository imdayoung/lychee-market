import '../style/LoginInput.css'

export default function LoginInput(props){
  const changeValue = (e) => {
    props.setValue(e.target.value);
  };

  return (
    <input
      className={props.distinct === "Short" ? "inputshort" : "input"}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={changeValue}
    />
  )
}