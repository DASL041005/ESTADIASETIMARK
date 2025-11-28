import "./SideBar.css";


const SideBar = () => {
return (
<aside className="sidebar">
<div className="logo">ETIMARK</div>
<ul>
<li>Dashboard</li>
<li>Usuarios</li>
<li>Productos</li>
<li>Órdenes</li>
<li>Documentos</li>
<li>Configuración</li>
</ul>
</aside>
);
};


export default SideBar;