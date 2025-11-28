// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout de tienda
import ShopLayout from "./components/Layout";

// Contexto del carrito
import { CartProvider } from "./context/CartContext";

// Páginas de tienda
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import RollosPage from "./pages/RollosPage";
import SoportePage from "./pages/SoportePage";

// 🔹 Panel Admin
import AdminLayout from "./components/admin/Layout";
import AdminDashboard from "./components/admin/AdminDashboard";
import DocumentsTable from "./components/admin/DocumentsTable";
import SalesOverview from "./components/admin/SalesOverview";

import "./App.css";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>

          {/* 🔹 RUTAS DEL PANEL ADMIN */}
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/documentos"
            element={
              <AdminLayout>
                <DocumentsTable />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/ventas"
            element={
              <AdminLayout>
                <SalesOverview />
              </AdminLayout>
            }
          />

          {/* 🔹 PÁGINAS SIN LAYOUT */}
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/crear-cuenta" element={<RegisterPage />} />

          {/* 🔹 TIENDA CON LAYOUT */}
          <Route path="/" element={<ShopLayout><HomePage /></ShopLayout>} />
          <Route path="/productos/:id" element={<ShopLayout><ProductDetailPage /></ShopLayout>} />
          <Route path="/carrito" element={<ShopLayout><CartPage /></ShopLayout>} />
          <Route path="/rollos" element={<ShopLayout><RollosPage /></ShopLayout>} />
          <Route path="/soporte" element={<ShopLayout><SoportePage /></ShopLayout>} />

          {/* 🔹 404 */}
          <Route path="*" element={<ShopLayout><h1>404 | Página no encontrada</h1></ShopLayout>} />

        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
