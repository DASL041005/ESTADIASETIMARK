import React from "react";
import SideBar from "../admin/SideBar";
import NavBar from "../admin/NavBar";
import "./Layout.css";


const Layout = ({ children }: { children: React.ReactNode }) => {
return (
<div className="layout">
<SideBar />
<div className="main-content">
<NavBar />
<div className="page-content">{children}</div>
</div>
</div>
);
};


export default Layout;