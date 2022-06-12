import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Common from "../../../components/CommonFunc";

const data = {
  labels: ["Red", "Blue", "Yellow", "purple"],
  datasets: [
    {
      label: "My First Dataset",
      data: [0, 300, 50, 100],
      backgroundColor: [
        "#ffddff",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(255, 100, 0)",
      ],
      hoverOffset: 4,
    },
  ],
};

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
        if(res.data.length === 0){
          SetBuy(null);
        } else {
          SetSell({
            labels: resultLabel,
            datasets: [
              {
                type: "doughnut",
                label: "판매 카테고리",
                borderColor: "#ff3d60",
                backgroundColor: "#ff3d60",
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
        
        if(res.data.length === 0){
          SetBuy(null);
        } else {
          SetBuy({
            labels: resultLabel,
            datasets: [
              {
                type: "doughnut",
                label: "구매카테고리",
                borderColor: "#cdcdcd",
                backgroundColor: "#cdcdcd",
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
  }, []);

  return (
    <div>
      <div className="HalfChart">
        <div className="ChartDiv">
          <div>{new Date().getMonth()+1}월 판매 카테고리</div>
          {Sell === null ? <div className="ChartNull">판매 항목이 없습니다!</div> : <Chart data={Sell} type="doughnut" />} 
        </div>

        <div className="ChartDiv">
          <div>{new Date().getMonth()+1}월 구매 카테고리</div>
          {Buy === null ? <div className="ChartNull">구매 항목이 없습니다!</div> : <Chart data={Buy} type="doughnut" />} 
        </div>
      </div>
    </div>
  );
}
