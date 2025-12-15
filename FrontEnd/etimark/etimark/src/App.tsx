// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Layout tienda
import ShopLayout from "./components/Layout";

// Páginas tienda
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import RollosPage from "./pages/RollosPage";
import SoportePage from "./pages/SoportePage";
import SoftwarePage from "./pages/SoftwarePage";
import ImpresorasPage from "./pages/ImpresorasPage";

// Panel Admin
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProductos from "./components/admin/AdminProductos";
import AdminEmpleados from "./components/admin/AdminEmpleados";
import AdminClientes from "./components/admin/AdminClientes";

// Panel Empleado
import EmployeeLayout from "./components/employee/EmployeeLayout";
import EmployeeProductos from "./components/employee/EmployeeProductos";
import EmployeePedidos from "./components/employee/EmployeePedidos";
import EmployeeClientes from "./components/employee/EmployeeClientes";

// Private route
import PrivateRoute from "./components/auth/PrivateRoute";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Redirect de /admin a /admin/dashboard */}
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            {/* ADMIN (solo ADMIN) */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute allowedRoles={["ADMIN"]}>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/pedidos"
              element={
                <PrivateRoute allowedRoles={["ADMIN"]}>
                  <AdminLayout>
                    <AdminProductos />
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/empleados"
              element={
                <PrivateRoute allowedRoles={["ADMIN"]}>
                  <AdminLayout>
                    <AdminEmpleados />
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/clientes"
              element={
                <PrivateRoute allowedRoles={["ADMIN"]}>
                  <AdminLayout>
                    <AdminClientes />
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            {/* AUTH */}
            <Route path="/iniciar-sesion" element={<LoginPage />} />
            <Route path="/crear-cuenta" element={<RegisterPage />} />

            {/* EMPLEADO (solo EMPLEADO) */}
            <Route
              path="/empleado/productos"
              element={
                <PrivateRoute allowedRoles={["EMPLEADO"]}>
                  <EmployeeLayout>
                    <EmployeeProductos />
                  </EmployeeLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/empleado/pedidos"
              element={
                <PrivateRoute allowedRoles={["EMPLEADO"]}>
                  <EmployeeLayout>
                    <EmployeePedidos />
                  </EmployeeLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/empleado/clientes"
              element={
                <PrivateRoute allowedRoles={["EMPLEADO"]}>
                  <EmployeeLayout>
                    <EmployeeClientes />
                  </EmployeeLayout>
                </PrivateRoute>
              }
            />

            {/* TIENDA PÚBLICA */}
            <Route
              path="/"
              element={
                <ShopLayout>
                  <HomePage />
                </ShopLayout>
              }
            />

            <Route
              path="/productos/:id"
              element={
                <ShopLayout>
                  <ProductDetailPage />
                </ShopLayout>
              }
            />

            <Route
              path="/carrito"
              element={
                <ShopLayout>
                  <CartPage />
                </ShopLayout>
              }
            />

            {/* RUTAS CLIENTE (solo CLIENTE) */}
            <Route
              path="/rollos"
              element={
                <PrivateRoute allowedRoles={["CLIENTE"]}>
                  <ShopLayout>
                    <RollosPage />
                  </ShopLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/soporte"
              element={
                <PrivateRoute allowedRoles={["CLIENTE"]}>
                  <ShopLayout>
                    <SoportePage />
                  </ShopLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/software"
              element={
                <PrivateRoute allowedRoles={["CLIENTE"]}>
                  <ShopLayout>
                    <SoftwarePage />
                  </ShopLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/impresoras"
              element={
                <PrivateRoute allowedRoles={["CLIENTE"]}>
                  <ShopLayout>
                    <ImpresorasPage />
                  </ShopLayout>
                </PrivateRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <ShopLayout>
                  <h1 style={{ padding: "40px", textAlign: "center" }}>
                    404 | Página no encontrada
                  </h1>
                </ShopLayout>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
