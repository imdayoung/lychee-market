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
  const [ReportNum, SetReportNum] = useState({});
  const [QNANum, SetQNANum] = useState({});
  const [ReportQNANum, SetReportQNANum] = useState({
    labels: Common.GetWeek(),
    datasets: [],
  });
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
              backgroundColor: "#ff3d60",
              borderWidth: 2,
              data: resultData,
            },
          ],
        });
      })
      .catch((err) => {
        console.log("신규 가입자 차트 에러");
      });

    axios
      .post("http://localhost:8080/chart/report", {
        Date: Common.GetSixDaysAgo(),
      })
      .then((res) => {
        var resultData = [0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < res.data.length; i++) {
          resultData[
            Common.GetDateGap(res.data[i].report_date, Common.GetSixDaysAgo())
          ] = res.data[i].cnt;
        }
        SetReportNum({
          type: "bar",
          label: "신고 현황",
          borderColor: "#ff3d60",
          backgroundColor: "#ff3d60",
          borderWidth: 2,
          data: resultData,
        });
      })
      .catch((err) => {
        console.log("신고 수 차트 에러");
      });

    axios
      .post("http://localhost:8080/chart/qna", {
        Date: Common.GetSixDaysAgo(),
      })
      .then((res) => {
        var resultData = [0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < res.data.length; i++) {
          resultData[
            Common.GetDateGap(res.data[i].q_date, Common.GetSixDaysAgo())
          ] = res.data[i].cnt;
        }
        SetQNANum({
          type: "bar",
          label: "문의 현황",
          borderColor: "#cdcdcd",
          backgroundColor: "#cdcdcd",
          borderWidth: 2,
          data: resultData,
        });
      })
      .catch((err) => {
        console.log("문의사항 수 차트 에러");
      });

    // axios
    //   .post("http://localhost:8080/chart/qna", {})
    //   .then((res) => {})
    //   .catch((err) => {
    //     console.log("문의사항 수 차트 에러");
    //   });
  }, []);

  useEffect(() => {
    SetReportQNANum({
      labels: Common.GetWeek(),
      datasets: [ReportNum, QNANum],
    });
  }, [ReportNum, QNANum]);

  return (
    <div>
      <ManagerHeader />
      <main>
        <div className="ManageMainTop">대쉬보드</div>
        <div className="HalfChart">
          <div className="ChartDiv">
          <Chart data={NewSignIn} type="line" />
          </div>
          <div className="ChartDiv">
            <div>이번 주 신고 & 문의 사항</div>
            <Chart data={ReportQNANum} type="bar" />
          </div>
        </div>
      </main>
    </div>
  );
}
