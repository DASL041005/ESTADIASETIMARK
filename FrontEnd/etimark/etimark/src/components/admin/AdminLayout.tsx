import React, { type ReactNode } from "react";
import SidebarAdmin from "./SidebarAdmin";
import "./adminLayout.css";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
