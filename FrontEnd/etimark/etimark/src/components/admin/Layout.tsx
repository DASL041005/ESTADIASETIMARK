import React from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminLayout.css";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />   {/* ❌ Quitamos adminName */}
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
