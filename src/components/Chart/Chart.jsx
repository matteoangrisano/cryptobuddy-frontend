import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./chart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "BTC",
    },
  },
};

const Chart = () => {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const fetchData = async () => {
        const res = await axios.get(`http://34.245.66.188:5000/get/btc`);
        setCrypto(res.data.reverse());
      };
      fetchData();
    }, 1000);
  }, [crypto]);

  const labels = crypto.map((crypto) => crypto.createdAt.slice(11, 19));

  const data = {
    labels,
    datasets: [
      {
        label: "lastPrice",
        data: crypto.map((obj) => obj.lastPrice),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "highPrice",
        data: crypto.map((obj) => obj.highPrice),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "triggerBuyPrice",
        data: crypto.map((obj) => obj.triggerBuyPrice),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "triggerSellPrice",
        data: crypto.map((obj) => obj.triggerSellPrice),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <>
      <Line className="chart" options={options} data={data} />
    </>
  );
};

export default Chart;
