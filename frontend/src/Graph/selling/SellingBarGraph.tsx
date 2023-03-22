import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { Backend } from "util/Backend";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
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
      text: "ジュース売れ筋グラフ",
      color: "white",
      font: {
        size: 30,
      },
    },
  },
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

const fetchItemList = async (setItemList) => {
  const itemList = await Backend.getItemList();
  if (itemList !== null) {
    setItemList(itemList);
  } else {
    console.error("fetchItemList: failed");
  }
};

const setItemNameList = (itemList) => {
  let ret = {};
  itemList.map((item) => {
    ret[item.name] = item.salesFigure;
  });
  return ret;
};

export default function SellingBarGraph(props) {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    fetchItemList(setItemList);
  }, []);

  let dict = setItemNameList(itemList);
  const labels = Object.keys(dict);
  labels.sort((a, b) => {
    return dict[b] - dict[a];
  });

  const data = {
    labels,
    datasets: [
      {
        label: "売れた個数",
        data: labels.map((label) => dict[label]),
        borderColor: "rgb(191, 253, 91)",
        backgroundColor: "rgba(191,253,91,0.2)",
      },
    ],
  };

  return (
    <SellingBarGraphPane>
      <Bar options={options} data={data} height={props.height} />
    </SellingBarGraphPane>
  );
}

const SellingBarGraphPane = styled.div`
  position: absolute;
  bottom: 0em;
  top: 6em;
  width: 100%;
  background-color: #303030;
  color: greenyellow;
`;
