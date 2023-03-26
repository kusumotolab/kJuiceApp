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
import { Item } from "types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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

function SellingBarGraph() {
  const [orderedItemList, setOrderedItemList] = useState<Item[]>([]);

  async function fetchItemList() {
    const itemList = await Backend.getItemList();
    if (itemList !== null) {
      return itemList;
    } else {
      console.error("fetchItemList: failed");
      return [];
    }
  }

  // 並べ方を変える場合はここを変える
  function sortItemList(itemList: Item[]) {
    itemList.sort((a, b) => b.salesFigure - a.salesFigure);
  }

  useEffect(() => {
    async () => {
      const tempList = await fetchItemList();
      sortItemList(tempList);
      setOrderedItemList(tempList);
    };
  }, []);

  const data = {
    labels: orderedItemList.map((item) => item.name),
    datasets: [
      {
        label: "売れた個数",
        data: orderedItemList.map((item) => item.salesFigure),
        borderColor: "rgb(191, 253, 91)",
        backgroundColor: "rgba(191,253,91,0.2)",
      },
    ],
  };

  return (
    <SellingBarGraphPane>
      <Bar options={options} data={data} />
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

export { SellingBarGraph };
