export default MsgModal = ({_handleModal, children, ...rest}) => {
  return (
    <div id="ModalContainer">
      <div onClick={_handleModal}></div>
      <div {...rest}>
        <div onClick={_handleModal}>x</div>
        <div>하이</div>
        <button/>
      </div>
    </div>
  )
}