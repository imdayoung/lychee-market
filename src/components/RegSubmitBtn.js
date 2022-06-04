export default function RegSubmitBtn(props){
  return (
    <button
      type="button"
      className={props.disabled ? 'r_NSubmitBtn' : 'r_SubmitBtn'}
      onClick={props.onClick}
      disabled={props.disabled === true ? 'disabled' : ''}
    >
    <span className="text">{props.text}</span>
    </button>
  )
}

