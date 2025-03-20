/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);

const DoughnutChart = ({ data }) => {
  const isDataEmpty = !data || data.datasets[0]?.data?.length === 0;
  const isLabelsEmpty = !data || data.labels?.length === 0;

  if (isDataEmpty || isLabelsEmpty) {
    return (
      <div className="flex grlContainer w-full h-full justify-center items-center text-center">
        No hay datos disponibles para mostrar el gráfico
      </div>
    );
  }

  return (
    <Doughnut
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            align: "start",
            labels: {
              boxWidth: 10,
              padding: 10,
              width: 1000,
            },
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
