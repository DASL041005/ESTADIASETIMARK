import React from "react";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import "./../styles/admin/adminLayout.css";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
