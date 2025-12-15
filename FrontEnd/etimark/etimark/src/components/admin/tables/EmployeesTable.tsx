import React from "react";

const mockEmployees = [
  { id: 1, nombre: "Juan Pérez", estado: "Activo" },
  { id: 2, nombre: "Luis Ramírez", estado: "En pausa" },
  { id: 3, nombre: "Ana Torres", estado: "Desconectado" },
];

const EmployeesTable: React.FC = () => {
  return (
    <table className="employees-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Empleado</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {mockEmployees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.nombre}</td>
            <td>{emp.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeesTable;
