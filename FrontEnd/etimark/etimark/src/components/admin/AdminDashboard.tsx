import React from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import "./Layout.css";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="admin-container">
      <SideBar />

      <div className="admin-main-content">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;























//import Layout from "./Layout";
//import SalesOverview from "./SalesOverview";
//import DocumentsTable from "./DocumentsTable";
//import "./AdminDashboard.css";

//import Layout from "./Layout";


//const AdminDashboard = () => {
//return (
//<Layout>
//<h1 className="title">Sales Dashboard</h1>


//<div className="dashboard-grid">
//<div className="card chart"><SalesOverview /></div>
//<div className="card chart">Funnel Chart</div>
//<div className="card big">$128,100 Average Value</div>
//<div className="card">Pipeline Chart</div>
//<div className="card">Monthly Goal</div>
//</div>


//<div className="documents-section">
//<h2>Documents</h2>
//<DocumentsTable />
//</div>
//</Layout>
//);
//};


//export default AdminDashboard;