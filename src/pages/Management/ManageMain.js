import "../../style/MyPage.css";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import * as Common from "../../components/CommonFunc";
import ManagerHeader from "../../components/Header3";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageMain() {
  const [NewSignIn, SetNewSignIn] = useState({
    labels: Common.GetWeek(),
    datasets: [],
  });
  const [NewPointNum, SetNewPointNum] = useState({
    labels: Common.GetWeek(),
    datasets: [],
  });
  const [ReportNum, SetReportNum] = useState({});
  const [QNANum, SetQNANum] = useState({});
  const [ReportQNANum, SetReportQNANum] = useState({
    labels: Common.GetWeek(),
    datasets: [],
  });
  const [UploadNum, SetUploadNum] = useState({
    labels: Common.GetWeek(),
    datasets: [],
  });

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

    axios
      .post("http://localhost:8080/chart/newpoint", {
        Date: Common.GetSixDaysAgo(),
      })
      .then((res) => {
        var resultData = [0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < res.data.length; i++) {
          resultData[
            Common.GetDateGap(res.data[i].deal_date, Common.GetSixDaysAgo())
          ] = res.data[i].sum;
        }
        SetNewPointNum({
          labels: Common.GetWeek(),
          datasets: [
            {
              type: "line",
              label: "신규 충전 현황",
              borderColor: "#cdcdcd",
              backgroundColor: "#cdcdcd",
              borderWidth: 2,
              data: resultData,
            },
          ],
        });
      })
      .catch((err) => {
        console.log("신규 충전 수 차트 에러");
      });

    axios
      .post("http://localhost:8080/chart/productnum", {
        Date: Common.GetSixDaysAgo(),
      })
      .then((res) => {
        var resultData = [0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < res.data.length; i++) {
          resultData[
            Common.GetDateGap(res.data[i].product_date, Common.GetSixDaysAgo())
          ] = res.data[i].cnt;
        }
        SetUploadNum({
          labels: Common.GetWeek(),
          datasets: [
            {
              type: "bar",
              label: "게시글 수",
              borderColor: "#cdcdcd",
              backgroundColor: "#cdcdcd",
              borderWidth: 2,
              data: resultData,
            },
          ],
        });
      })
      .catch((err) => {
        console.log("게시글 수 차트 에러");
      });
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
        {/* <div>
          관리자님 환영합니다:D
        </div> */}
        <div id="ChartTitle">대시보드(Dashboard)</div>
        <div className="HalfChart">
          <div className="ChartDiv">
            <div>이번 주 신규 가입자 현황</div>
            <Chart data={NewSignIn} type="line" />
          </div>
          <div className="ChartDiv">
            <div>이번 주 신규 포인트 충전 현황</div>
            <Chart data={NewPointNum} type="line" />
          </div>
        </div>

        <div className="HalfChart">
          <div className="ChartDiv">
            <div>이번 주 게시글 현황</div>
            <Chart data={UploadNum} type="bar" />
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
