import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { dia: "Lun", ventas: 4500 },
  { dia: "Mar", ventas: 3200 },
  { dia: "Mié", ventas: 5100 },
  { dia: "Jue", ventas: 2800 },
  { dia: "Vie", ventas: 6500 },
  { dia: "Sáb", ventas: 7200 },
  { dia: "Dom", ventas: 4300 },
];

const SalesChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="ventas" stroke="#00A8E8" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
