import React from "react";
import EmployeeSidebar from "./EmployeeSidebar";
import "./EmployeeLayout.css";

const EmployeeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="admin-layout">
      <EmployeeSidebar />
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default EmployeeLayout;
