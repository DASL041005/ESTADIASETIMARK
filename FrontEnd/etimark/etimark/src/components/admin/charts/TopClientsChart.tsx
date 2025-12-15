import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { cliente: "Juan", compras: 32 },
  { cliente: "Luis", compras: 25 },
  { cliente: "Ana", compras: 21 },
  { cliente: "María", compras: 18 },
];

const TopClientsChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="cliente" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="compras" fill="#003B73" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopClientsChart;
