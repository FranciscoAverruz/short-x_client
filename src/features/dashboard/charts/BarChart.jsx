/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = ({ data, isMobile, isDarkMode }) => {
  return (
    <div className="">
      <Bar
        data={data}
        options={{
          responsive: true,
          indexAxis: isMobile ? "y" : "x",
          plugins: {
            legend: { position: "bottom" },
            tooltip: { enabled: true },
          },
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
          },
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default BarChart;
