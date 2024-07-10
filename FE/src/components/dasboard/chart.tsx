import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChartBalanceFluctuations: React.FC = () => {
  const generateData = () => {
    const data = [];
    for (let i = 1; i <= 30; i++) {
      const date = `2022-01-${i < 10 ? "0" + i : i}`;
      const usdBalance = Math.random() * 1000; // Số dư USD
      const mcBalance = Math.random() * 800; // Số dư MC (Money Count)
      data.push({ date, usdBalance, mcBalance });
    }
    return data;
  };

  const data = generateData();

  return (
    <LineChart
      width={1450}
      height={600}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="usdBalance"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        name="USD"
      />
      <Line
        type="monotone"
        dataKey="mcBalance"
        stroke="#82ca9d"
        activeDot={{ r: 8 }}
        name="MC"
      />
    </LineChart>
  );
};

export default LineChartBalanceFluctuations;
