import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import styled from "styled-components";
import { Backend } from "util/Backend";
import { LabeledHistory } from "types";

function LineChart() {
  const [historyOfEachMonth, setHistoryOfEachMonth] = useState<LabeledHistory>(
    {}
  );

  async function fetchHistoryOfEachMonth() {
    const histories = await Backend.getHistoryEachMonth();

    if (histories === null) {
      console.error("fetchHistoryOfEachMonth: failed");
      return;
    }

    setHistoryOfEachMonth(histories);
  }

  useEffect(() => {
    fetchHistoryOfEachMonth();
  }, []);

  const histories = Object.entries(historyOfEachMonth).sort();

  const graphData = {
    labels: histories.map((e) => e[0]),
    datasets: [
      {
        label: "売り上げ",
        data: histories.map((e) => e[1]),
        borderColor: "greenyellow",
        backgroundColor: "rgba(191,253,91,0.2)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
          font: {
            size: 20,
          },
        },
        position: "right" as const,
      },
      title: {
        display: true,
        text: "各月の売り上げグラフ",
        color: "white",
        font: {
          size: 30,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          color: "white",
          font: {
            size: 20,
          },
        },
      },
      x: {
        ticks: {
          color: "white",
          font: {
            size: 20,
          },
        },
      },
    },
  };

  return (
    <LineChartPane>
      <Line data={graphData} options={options} />
    </LineChartPane>
  );
}

const LineChartPane = styled.div`
  position: absolute;
  bottom: 0em;
  top: 6em;
  right: 0em;
  left: 0em;
  background-color: #303030;
`;
export { LineChart };
