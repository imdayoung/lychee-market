import axios from "axios";
import React, { useState } from "react";
import '../../../style/Evaluate.css';
import Score from "../components/Score";

const EvaluateModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, id, yourid } = props;

  const [Select, SetSelect] = useState();
  const [SelectScore, SetSelectScore] = useState(0);
  
  const RadioHandler = (e) => {
    console.log(e.target.value);
    SetSelect(e.target.value);
    if(e.target.value === "best")   SetSelectScore(2);
    else if(e.target.value === "good")  SetSelectScore(1);
    else if(e.target.value === "soso")  SetSelectScore(0);
    else if(e.target.value === "bad")  SetSelectScore(-1);
    else    SetSelectScore(-2);
  };

  const SendBtnHandler = (e) => {
    console.log(SelectScore);
    axios.post('http://localhost:8080/evaluate', {
        id: yourid,
        score: SelectScore,
    })
    .then((res) => {
        console.log(res.data);
    });
  }

  return (
     <div className={open ? 'openEvaluateModal EvaluateModal' : 'EvaluateModal'}>
      {open ? (
        <section id="EvaluateModalSection">
          <main id="EvaluateModalMain">
            <div id="EvaluateModalText"><span id="EvaluateModalTextStrong">{id}</span>님, <span id="EvaluateModalTextStrong">{yourid}</span>님과의 거래가 완료되었습니다!</div>
            <div id="EvaluateModalText">거래는 어떠셨나요?</div>
            <div id="ScoreSelect">
                <label><input type="radio" className="Invisible" name="evaluate" value="best" onChange={RadioHandler}></input><Score icon={'/images/evaluate/best.png'} title={'최고예요'}></Score></label>
                <label><input type="radio" className="Invisible" name="evaluate" value="good" onChange={RadioHandler}></input><Score icon={'/images/evaluate/good.png'} title={'좋아요'}></Score></label>
                <label><input type="radio" className="Invisible" name="evaluate" value="soso" onChange={RadioHandler}></input><Score icon={'/images/evaluate/soso.png'} title={'보통이예요'}></Score></label>
                <label><input type="radio" className="Invisible" name="evaluate" value="bad" onChange={RadioHandler}></input><Score icon={'/images/evaluate/bad.png'} title={'별로예요'}></Score></label>
                <label><input type="radio" className="Invisible" name="evaluate" value="worst" onChange={RadioHandler}></input><Score icon={'/images/evaluate/worst.png'} title={'최악이예요'}></Score></label>
            </div>
        </main>
          <footer>
            <button className="close" onClick={() => {close(); SendBtnHandler();}}>후기 남기기</button>
          </footer>
        </section>
      ) : null}
    </div> 
  );
};

export default EvaluateModal;