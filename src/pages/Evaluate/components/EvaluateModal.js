// import axios from "axios";
// import { useState } from "react";
// import '../../../style/Evaluate.css';
// import React from 'react';
// import Score from "../components/Score";

// const EvaluateModal = (props) => {
//   // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
//   const { open, close, header } = props;

//   return (

//     // 모달이 열릴때 openModal 클래스가 생성된다.
//      <div className={open ? 'openEvaluateModal EvaluateModal' : 'EvaluateModal'}>
//       {open ? (
//         <section>
//           <main><div>
//             jaejae님, kiki님과의 거래가 완료되었습니다! 거래는 어떠셨나요?
//         </div>
//         <div>
//             <Score icon={'/images/evaluate/best.png'} title={'최고예요'}></Score>
//             <Score icon={'/images/evaluate/good.png'} title={'좋아요'}></Score>
//             <Score icon={'/images/evaluate/soso.png'} title={'보통이예요'}></Score>
//             <Score icon={'/images/evaluate/bad.png'} title={'별로예요'}></Score>
//             <Score icon={'/images/evaluate/worst.png'} title={'최악이예요'}></Score>
//         </div></main>
//           <footer>
//             <button className="close" onClick={close}>close</button>
//           </footer>
//         </section>
//       ) : null}
//     </div> 
//   );
// };

// export default EvaluateModal;