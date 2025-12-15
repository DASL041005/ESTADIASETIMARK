/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "./employeeClientes.css";
import { api } from "../../services/api"; // 🔥 Igual que AdminClientes.tsx
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface Cliente {
  id_cliente: number;
  nombre: string;
  telefono?: string;
  direccion?: string;
  correo: string;
  tipo_cliente?: string;
}

const EmployeeClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // 🔹 Obtener clientes reales
  // ==========================
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/clientes"); // 🔥 MISMA RUTA QUE AdminClientes
      setClientes(res.data.clientes);         // 🔥 MISMA ESTRUCTURA
    } catch (err) {
      console.error("Error obteniendo clientes:", err);
      setError("Error al cargar clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  if (loading) return <h2 className="clientes-title">Cargando clientes...</h2>;
  if (error) return <h2 className="clientes-title error">{error}</h2>;

  return (
    <div className="clientes-container">
      <h1 className="clientes-title">Clientes</h1>

      <div className="clientes-table-wrapper">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((c) => (
              <tr key={c.id_cliente}>
                <td>{c.nombre}</td>
                <td>{c.correo}</td>
                <td>{c.telefono ?? "—"}</td>
                <td>{c.direccion ?? "—"}</td>

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

export default EmployeeClientes;
