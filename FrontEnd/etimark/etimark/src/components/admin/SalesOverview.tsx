import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, BarElement, type ChartData } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "./SalesOverview.css";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);


const SalesOverview: React.FC = () => {
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];


const lineData: ChartData<'line', number[], string> = {
labels,
datasets: [
{
label: "Ventas",
data: [12000, 15000, 10000, 18000, 20000, 22000, 21000],
tension: 0.4,
fill: false,
},
],
};


const barData: ChartData<'bar', number[], string> = {
labels,
datasets: [
{
label: "Órdenes",
data: [30, 45, 28, 60, 72, 80, 75],
},
],
};


return (
<div className="sales-overview">
<div className="chart-block">
<h3>Ventas (últimos meses)</h3>
<Line data={lineData} />
</div>


<div className="chart-block">
<h3>Órdenes</h3>
<Bar data={barData} />
</div>
</div>
);
};


export default SalesOverview;