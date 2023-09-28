import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import { useCallWeatherHistoryList } from "./weather-history-slice";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

import "chartjs-adapter-date-fns";
import { ChartFilterSelection } from "./ChartFilterSelection";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const WeatherHistoryCard = () => {
  const { fullData, chartData } = useCallWeatherHistoryList();
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      x: {
        type: "time" as "time",
        time: {
          unit: "day" as "day",
        },
        ticks: {
          callback: function (value, index, values) {
            const day = format(new Date(value), "PP");
            return day;
            // Your logic to display only month labels goes here.
            // For example, you can check if the value corresponds to the start of a month.
          },
        },
      },
    },
    radius: 0,
  };
  // const dates = chartData.map((point) => format(new Date(point.time), "PP"));
  const labels = chartData.map((point) => new Date(point.time));

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: chartData.map((point) => point.temperature),

        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="text-[40px] leading-[59px] text-center">
        Weather History
      </div>
      <ChartFilterSelection />

      <div className="w-full h-[400px]">
        <Line className="w-full h-full" options={options} data={data} />
      </div>
    </div>
  );
};
