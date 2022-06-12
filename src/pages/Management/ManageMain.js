import "../../style/MyPage.css";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import * as Common from "../../components/CommonFunc";
import ManagerHeader from "../../components/Header3";
import { useEffect, useState } from "react";
import axios from "axios";

const data = {
  labels: Common.GetWeek(),
  datasets: [
    {
      type: "line",
      label: "신규 가입자 수",
      borderColor: "#ff3d60",
      borderWidth: 2,
      data: [1, 2, 3, 4, 5],
    },
  ],
};

export default function ManageMain() {
  const [NewSignIn, SetNewSignIn] = useState({
    labels: Common.GetWeek(),
    datasets: [],
  });
  const [ReportNum, SetReportNum] = useState();
  const [QNANum, SetQNANum] = useState();
  const [UploadNum, SetUploadNum] = useState();
  const [PointNum, SetPointNum] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:8080/chart/newsignin", {
        Date: Common.GetSixDaysAgo(),
      })
      .then((res) => {
        var resultData = [0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < res.data.length; i++) {
          resultData[
            Common.GetDateGap(res.data[i].join_date, Common.GetSixDaysAgo())
          ] = res.data[i].cnt;
        }
        SetNewSignIn({
          labels: Common.GetWeek(),
          datasets: [
            {
              type: "line",
              label: "신규 가입자 수",
              borderColor: "#ff3d60",
              borderWidth: 2,
              data: resultData,
            },
          ],
        });
      })
      .catch((err) => {
        console.log("신규 가입자 차트 에러");
      });
    
    axios.post("http://localhost:8080/chart/report", {
      Date: Common.GetSixDaysAgo(),
    })
    .then((res)=>{
      var resultData = [0, 0, 0, 0, 0, 0, 0];
      for (var i = 0; i < res.data.length; i++) {
        resultData[
          Common.GetDateGap(res.data[i].report_date, Common.GetSixDaysAgo())
        ] = res.data[i].cnt;
      }
      SetReportNum({
        labels: Common.GetWeek(),
        datasets: [
          {
            type: "bar",
            label: "이번 주 신고 현황",
            borderColor: "#ff3d60",
            backgroundColor: "#ff3d60",
            borderWidth: 2,
            data: resultData,
          },
        ],
      });
    })
    .catch((err) => {
      console.log("신고 수 차트 에러");
    });

    // axios.post("http://localhost:8080/chart/qna", {

    // })
    // .then((res)=>{})
    // .catch((err)=>{})

  }, []);

  return (
    <div>
      <ManagerHeader />
      <main>
        <div className="ManageMainTop">대쉬보드</div>
        <div className="HalfChart">
          <Chart data={NewSignIn} type="line" />
        </div>
        <div className="HalfChart">
          <Chart data={ReportNum} type="bar" />
          {/* <Chart data={QNANum} type="bar" /> */}
        </div>
      </main>
    </div>
  );
}
