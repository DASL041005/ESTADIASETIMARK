import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Pendientes", value: 14 },
  { name: "En proceso", value: 9 },
  { name: "Entregados", value: 32 },
];

const colors = ["#00A8E8", "#44E0D0", "#003B73"];

const OrdersPieChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
        {data.map((item, index) => (
          <Cell key={index} fill={colors[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default OrdersPieChart;
