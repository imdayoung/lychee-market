import '../style/SubmitBtn.css'

function SubmitBtn(props){
  return (
    <button
      type="button"
      className={props.disabled ? 'NSubmitBtn' : 'SubmitBtn'}
      onClick={props.onClick}
      disabled={props.disabled === true ? 'disabled' : ''}
    >
    <span className="text">{props.text}</span>
    </button>
  )
}

export default SubmitBtn;