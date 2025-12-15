import React from "react";
import "./adminEmpleados.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

// ======================
// 📌 Datos simulados de empleados
// ======================
const empleadosData = [
  {
    id: 1,
    nombre: "Carlos Herrera",
    telefono: "618-987-6543",
    correo: "carlos@empresa.com",
    pedidosAtendidos: 45,
  },
  {
    id: 2,
    nombre: "Lucía Martínez",
    telefono: "618-112-3344",
    correo: "lucia@empresa.com",
    pedidosAtendidos: 28,
  },
  {
    id: 3,
    nombre: "Roberto Sandoval",
    telefono: "618-998-1122",
    correo: "roberto@empresa.com",
    pedidosAtendidos: 12,
  },
];

const AdminEmpleados: React.FC = () => {
  return (
    <div className="empleados-container">
      <h1 className="empleados-title">Empleados</h1>

      <div className="empleados-table-wrapper">
        <table className="empleados-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Pedidos atendidos</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {empleadosData.map((e) => (
              <tr key={e.id}>
                <td>{e.nombre}</td>
                <td>{e.telefono}</td>
                <td>{e.correo}</td>
                <td>{e.pedidosAtendidos}</td>

                <td className="acciones">
                  <button className="btn-ver">
                    <FaEye />
                  </button>
                  <button className="btn-editar">
                    <FaEdit />
                  </button>
                  <button className="btn-eliminar">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEmpleados;
