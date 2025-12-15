// src/components/admin/AdminDashboard.tsx
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import "./adminDashboard.css";

// =========================
// 📌 DATOS DE PRUEBA (TEMPORAL)
// =========================

// Ventas por semana
const ventasMensuales = [
  { semana: "Semana 1", ventas: 12000 },
  { semana: "Semana 2", ventas: 18500 },
  { semana: "Semana 3", ventas: 14300 },
  { semana: "Semana 4", ventas: 21000 }
];

// Clientes que más compran
const mejoresClientes = [
  { cliente: "Empresa A", compras: 32 },
  { cliente: "Distribuidora B", compras: 28 },
  { cliente: "Industria C", compras: 20 }
];

// Pedidos por estado
const pedidosEstados = [
  { name: "Pendientes", value: 15 },
  { name: "En Proceso", value: 8 },
  { name: "Entregados", value: 42 }
];

// Empleados activos
const empleados = [
  { nombre: "Carlos Pérez", estado: "Activo" },
  { nombre: "Laura Sánchez", estado: "Activo" },
  { nombre: "Mónica Herrera", estado: "Inactivo" },
  { nombre: "José Martínez", estado: "Activo" }
];

const COLORS = ["#FFBB28", "#00C49F", "#0088FE"];

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard-container">

      {/* =======================
          TÍTULO PRINCIPAL
      ======================== */}
      <h1 className="dashboard-title">Dashboard Administrativo</h1>

      {/* =======================
          FILA 1: VENTAS / CLIENTES
      ======================== */}
      <div className="dashboard-row">

        {/* 📊 Gráfica de Ventas Mensuales */}
        <div className="dashboard-card">
          <h3>Ventas del Mes</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ventasMensuales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill="#003B73" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 📊 Mejores Clientes */}
        <div className="dashboard-card">
          <h3>Clientes con más compras</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mejoresClientes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cliente" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="compras" fill="#00A8E8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* =======================
          FILA 2: PEDIDOS
      ======================== */}
      <div className="dashboard-row">
        {/* 📊 Pie Chart */}
        <div className="dashboard-card">
          <h3>Estado de Pedidos</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pedidosEstados}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {pedidosEstados.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🧑‍💼 TABLA DE EMPLEADOS */}
        <div className="dashboard-card employees-table">
          <h3>Actividad de Empleados</h3>
          <table>
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp, i) => (
                <tr key={i}>
                  <td>{emp.nombre}</td>
                  <td className={emp.estado === "Activo" ? "activo" : "inactivo"}>
                    {emp.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
