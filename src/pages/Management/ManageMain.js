import { useEffect, useState } from "react";
import "../../style/MyPage.css";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import Header from "../../components/Header3";

const todayDate = new Date();

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      data: [1, 2, 3, 4, 5],
    },
  ]
}

export default function ManageMain() {
  return (
    <div>
      <Header />
      <main>
        <div className="ManageMainTop">
          <div>문의사항</div>
          <div>5건</div>
          <div>문의사항</div>
          <div>5건</div>
        </div>
        <div>
          <Chart data={data} type="line" width={"50"} height="100"/>
        </div>
      </main>
    </div>
  );
}
