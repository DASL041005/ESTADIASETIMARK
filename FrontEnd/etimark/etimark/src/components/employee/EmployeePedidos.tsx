/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "./employeePedidos.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface Pedido {
  id_pedido: number;
  cliente: string;
  fecha: string;
  total: number;
  estado: string;
}

const EmployeePedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakePedidos: Pedido[] = [
      {
        id_pedido: 1,
        cliente: "Carlos Gómez",
        fecha: "2025-01-12",
        total: 1299.99,
        estado: "Pendiente",
      },
      {
        id_pedido: 2,
        cliente: "Ana Martínez",
        fecha: "2025-01-15",
        total: 499.5,
        estado: "Completado",
      },
      {
        id_pedido: 3,
        cliente: "Juan Pérez",
        fecha: "2025-01-18",
        total: 245.0,
        estado: "Cancelado",
      },
    ];

    setTimeout(() => {
      setPedidos(fakePedidos);
      setLoading(false);
    }, 700);
  }, []);

  if (loading) return <h2 className="pedidos-title">Cargando pedidos...</h2>;

  return (
    <div className="pedidos-container">
      <h1 className="pedidos-title">Pedidos</h1>

      <div className="pedidos-table-wrapper">
        <table className="pedidos-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id_pedido}>
                <td>{p.cliente}</td>
                <td>{p.fecha}</td>
                <td>${p.total.toFixed(2)}</td>
                <td>{p.estado}</td>
                <td className="acciones">
                  <button className="btn-ver"><FaEye /></button>
                  <button className="btn-editar"><FaEdit /></button>
                  <button className="btn-eliminar"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default EmployeePedidos;
