import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Common from "../../../components/CommonFunc";

export default function Statistics(props) {
  const [Sell, SetSell] = useState({
    labels: [],
    datasets: [],
  });
  const [Buy, SetBuy] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios
      .post("http://localhost:8080/chart/sellproduct", {
        Id: props.Id,
        Date: Common.GetMonth(),
      })
      .then((res) => {
        var resultLabel = [];
        var resultData = [];

        for (var i = 0; i < res.data.length; i++) {
          resultLabel.push(res.data[i].product_category);
          resultData.push(res.data[i].cnt);
        }
        if (res.data.length === 0) {
          SetSell(null);
        } else {
          SetSell({
            labels: resultLabel,
            datasets: [
              {
                type: "doughnut",
                label: "판매 카테고리",
                borderColor: "#FFFFFF",
                backgroundColor: [
                  "#FF3D60",
                  "#FF597A",
                  "#FF7E94",
                  "#FFA2AF",
                  "#FDC7CF",
                  "#FDE1E1",
                  "#FFFFFF",
                ],
                borderWidth: 2,
                data: resultData,
              },
            ],
          });
        }
      })
      .catch((err) => {
        console.log("판매 카테고리 차트 에러");
      });

    axios
      .post("http://localhost:8080/chart/buyproduct", {
        Id: props.Id,
        Date: Common.GetMonth(),
      })
      .then((res) => {
        var resultLabel = [];
        var resultData = [];

        for (var i = 0; i < res.data.length; i++) {
          resultLabel.push(res.data[i].product_category);
          resultData.push(res.data[i].cnt);
        }

        if (res.data.length === 0) {
          SetBuy(null);
        } else {
          SetBuy({
            labels: resultLabel,
            datasets: [
              {
                type: "doughnut",
                label: "구매카테고리",
                borderColor: "#FFFFFF",
                backgroundColor: [
                  "#4D4D4D",
                  "#666666",
                  "#808080",
                  "#999999",
                  "#B3B3B3",
                  "#CCCCCC",
                  "#E6E6E6",
                ],
                borderWidth: 2,
                data: resultData,
              },
            ],
          });
        }
      })
      .catch((err) => {
        console.log("구매 카테고리 차트 에러");
      });
  }, [props]);

  return (
    <div>
      <div className="HalfChart">
        <div className="ChartDiv">
          <div>{new Date().getMonth() + 1}월 판매 카테고리</div>
          {Sell === null ? (
            <div className="ChartNull">판매 항목이 없습니다!</div>
          ) : (
            <Chart data={Sell} type="doughnut" />
          )}
        </div>

        <div className="ChartDiv">
          <div>{new Date().getMonth() + 1}월 구매 카테고리</div>
          {Buy === null ? (
            <div className="ChartNull">구매 항목이 없습니다!</div>
          ) : (
            <Chart data={Buy} type="doughnut" />
          )}
        </div>
      </div>
    </div>
  );
}
