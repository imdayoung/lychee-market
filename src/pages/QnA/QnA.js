import { useState, useEffect } from "react";
import Axios from 'axios';
import Header from "../../components/Header"
import '../../style/QnA.css'

function QnA() {
  
  const IsManager = true;
  const [QnA, setQnA] = useState([{
    qna_id: '',
    view: '',
    q_category: '',
    q_title: '',
    q_date: '',
    q_id: '',
    private_flag: '',
    a_id: '',
  }]);

  useEffect(() => {
    Axios.get('http://localhost:8080/qna')
    .then((res) => {
      setQnA(res.data);
    });
  }, []);

  let QnAList = [];
  if(QnA.length === 0){
    alert("없음");
    QnAList.push(<tr key={0} className="n_list_row"><td colSpan='4'>문의사항이 존재하지 않습니다.</td></tr>)
  }

  return (
    <div className="main">
      <Header keyword="문의사항"/>
      <main className="qnaMain">
        <table className="qnaList">
          <thead className="qnaHead">
            <tr>
              <td className="qnaIndex">번호</td>
              <td className="qnaView">조회수</td>
              <td className="qnaCategory">카테고리</td>
              <td className="qnaTitle">제목</td>
              <td className="qnaDate">작성 날짜</td>
              <td className="qnaPflag">공개 여부</td>
              <td className="qnaAnswered">답변 여부</td>
            </tr>
          </thead>
          <tbody>
            {QnAList}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default QnA;