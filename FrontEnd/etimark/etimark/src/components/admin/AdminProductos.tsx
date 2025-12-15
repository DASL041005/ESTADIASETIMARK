/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "./adminProductos.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { api } from "../../services/api";

interface Producto {
  id_producto: number;
  nombre: string;
  precio_base: number;
  stock: number;
  tipo?: {
    nombre_tipo: string;
  };
}

const AdminProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [modalVer, setModalVer] = useState<Producto | null>(null);
  const [modalEditar, setModalEditar] = useState<Producto | null>(null);

  // ======================
  // 🔹 Obtener productos
  // ======================
  const fetchProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data.products);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // ======================
  // 🔹 Eliminar producto
  // ======================
  const eliminarProducto = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      await api.delete(`/productos/${id}`);
      setProductos((prev) => prev.filter((p) => p.id_producto !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el producto.");
    }
  };

  // ======================
  // 🔹 Guardar edición
  // ======================
  const guardarEdicion = async () => {
    if (!modalEditar) return;

    try {
      await api.put(`/productos/${modalEditar.id_producto}`, modalEditar);

      setProductos((prev) =>
        prev.map((p) =>
          p.id_producto === modalEditar.id_producto ? modalEditar : p
        )
      );

      setModalEditar(null);
      alert("Producto actualizado.");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("No se pudo actualizar el producto.");
    }
  };

  return (
    <div className="pedidos-container">
      <h1 className="pedidos-title">Productos</h1>

      <div className="pedidos-table-wrapper">
        <table className="pedidos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio base</th>
              <th>Stock</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr key={p.id_producto}>
                <td>{p.nombre}</td>
                <td>${p.precio_base.toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>{p.tipo?.nombre_tipo ?? "Sin tipo"}</td>

                <td className="acciones">
                  {/* VER */}
                  <button className="btn-ver" onClick={() => setModalVer(p)}>
                    <FaEye />
                  </button>

                  {/* EDITAR */}
                  <button
                    className="btn-editar"
                    onClick={() => setModalEditar({ ...p })}
                  >
                    <FaEdit />
                  </button>

                  {/* ELIMINAR */}
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProducto(p.id_producto)}
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
      {/* 🔹 MODAL VER PRODUCTO */}
      {/* ============================= */}
      {modalVer && (
        <div className="modal">
          <div className="modal-content">
            <h2>Información del Producto</h2>

            <p><strong>Nombre:</strong> {modalVer.nombre}</p>
            <p><strong>Precio base:</strong> ${modalVer.precio_base.toFixed(2)}</p>
            <p><strong>Stock:</strong> {modalVer.stock}</p>
            <p><strong>Tipo:</strong> {modalVer.tipo?.nombre_tipo ?? "Sin tipo"}</p>

            <button className="modal-close" onClick={() => setModalVer(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ============================= */}
      {/* 🔹 MODAL EDITAR PRODUCTO */}
      {/* ============================= */}
      {modalEditar && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Producto</h2>

            <label>Nombre</label>
            <input
              type="text"
              value={modalEditar.nombre}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, nombre: e.target.value })
              }
            />

            <label>Precio Base</label>
            <input
              type="number"
              value={modalEditar.precio_base}
              onChange={(e) =>
                setModalEditar({
                  ...modalEditar,
                  precio_base: parseFloat(e.target.value),
                })
              }
            />

            <label>Stock</label>
            <input
              type="number"
              value={modalEditar.stock}
              onChange={(e) =>
                setModalEditar({
                  ...modalEditar,
                  stock: parseInt(e.target.value),
                })
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

export default AdminProductos;
