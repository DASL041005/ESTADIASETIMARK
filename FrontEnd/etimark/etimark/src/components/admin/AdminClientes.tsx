// src/pages/AdminClientes.tsx
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import "./adminClientes.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface Cliente {
  id_cliente: number;
  nombre: string;
  telefono?: string;
  direccion?: string;
  correo: string;
  tipo_cliente: string;
}

const AdminClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Estados de modales ---
  const [modalVer, setModalVer] = useState<Cliente | null>(null);
  const [modalEditar, setModalEditar] = useState<Cliente | null>(null);

  const [error, setError] = useState("");

  // Obtener clientes
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/clientes");
      setClientes(res.data.clientes);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Error al cargar clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Eliminar cliente
  const eliminarCliente = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;

    try {
      await api.delete(`/clientes/${id}`);
      setClientes((prev) => prev.filter((c) => c.id_cliente !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar cliente.");
    }
  };

  // Guardar edición
  const guardarEdicion = async () => {
    if (!modalEditar) return;

    try {
      await api.put(`/clientes/${modalEditar.id_cliente}`, modalEditar);
      setClientes((prev) =>
        prev.map((c) =>
          c.id_cliente === modalEditar.id_cliente ? modalEditar : c
        )
      );
      setModalEditar(null);
      alert("Cliente actualizado");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar cliente");
    }
  };

  if (loading) return <h2>Cargando clientes...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className="clientes-container">
      <h1 className="clientes-title">Clientes</h1>

      <div className="clientes-table-wrapper">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((c) => (
              <tr key={c.id_cliente}>
                <td>{c.nombre}</td>
                <td>{c.telefono ?? "—"}</td>
                <td>{c.direccion ?? "—"}</td>
                <td>{c.correo}</td>

                <td className="acciones">
                  {/* VER */}
                  <button onClick={() => setModalVer(c)} className="btn-ver">
                    <FaEye />
                  </button>

                  {/* EDITAR */}
                  <button
                    onClick={() => setModalEditar({ ...c })}
                    className="btn-editar"
                  >
                    <FaEdit />
                  </button>

                  {/* ELIMINAR */}
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarCliente(c.id_cliente)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ============================= */}
      {/* 🔹 MODAL VER INFORMACIÓN */}
      {/* ============================= */}
      {modalVer && (
        <div className="modal">
          <div className="modal-content">
            <h2>Información del Cliente</h2>

            <p><strong>Nombre:</strong> {modalVer.nombre}</p>
            <p><strong>Teléfono:</strong> {modalVer.telefono || "—"}</p>
            <p><strong>Dirección:</strong> {modalVer.direccion || "—"}</p>
            <p><strong>Correo:</strong> {modalVer.correo}</p>
            <p><strong>Tipo:</strong> {modalVer.tipo_cliente}</p>

            <button className="modal-close" onClick={() => setModalVer(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ============================= */}
      {/* 🔹 MODAL EDITAR CLIENTE */}
      {/* ============================= */}
      {modalEditar && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Cliente</h2>

            <label>Nombre</label>
            <input
              type="text"
              value={modalEditar.nombre}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, nombre: e.target.value })
              }
            />

            <label>Teléfono</label>
            <input
              type="text"
              value={modalEditar.telefono || ""}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, telefono: e.target.value })
              }
            />

            <label>Dirección</label>
            <input
              type="text"
              value={modalEditar.direccion || ""}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, direccion: e.target.value })
              }
            />

            <label>Correo</label>
            <input
              type="email"
              value={modalEditar.correo}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, correo: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button className="btn-editar" onClick={guardarEdicion}>
                Guardar
              </button>
              <button className="modal-close" onClick={() => setModalEditar(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClientes;
